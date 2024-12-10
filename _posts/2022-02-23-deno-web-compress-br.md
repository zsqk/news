---
title: 在 Deno 中实现 HTTP 返回 body 的 Brotli 压缩
categories: [deno, web, http, brotli]
author: iugo
---

> :warning: 本文是 2022 年 2 月 23 日写的, 现在 Deno 已经有了变动,
> 所以本文在部分地方可能已经过时.

在 9 个月之前, 我们在项目中创建了这则 issue, 今天, 伴随着 Deno 最近标准库的变动,
我们对此进行更加系统地说明.

Why & What
-------------------

之前, 我们的 Web 项目对 HTTP 返回 body 实现了 deflate 的压缩算法, 但使用的是 JS,
还是不够快. 我们考虑支持对此进行优化.

我们知道对于大多数浏览器来说, 都会发送这样的请求头 `Accept-Encoding: gzip, deflate, br`.

其中 `br` 就是我们暂时不支持的 br 压缩, 即 Brotli 压缩算法.

从发展来看, br 是更适合 HTTP 的压缩算法, 现代浏览器也都支持了.

<https://hacks.mozilla.org/2015/11/better-than-gzip-compression-with-brotli/>

在 Deno 项目中实现 br
----------------------------

但目前 Deno 仍未有对此的支持计划. (有 issue, 但还没计划去做)

在 Node.js 中, 有标准库 zlab 去实现该压缩算法.
<https://nodejs.org/api/zlib.html#zlib_class_zlib_brotlicompress>

但在 Deno 中, 官方不支持.

在 npm 中有这样的包 <https://www.npmjs.com/package/brotli> 来实现 br 算法压缩.
利用了 Emscripten(C++) 去实现.

npm 的包是不能在 Deno 上使用的. 在调用其他方式上, 是通过 WASM.

虽然能看到 WASM 本体 `https://cdn.jsdelivr.net/npm/brotli@1.3.2/build/mem.js`
但是现在还不能直接在 Deno 项目中用, 需要对包引用进行变动.

然后尝试在 Deno 社区中找相关解决方案, 就是 <https://github.com/denosaurs/deno_brotli>.

正如所有 Deno 项目一样, deno_brotli 的使用非常简单,
只需要 `import { compress } from 'https://deno.land/x/brotli@v0.1.4/mod.ts';` 即可.

在 Deno Web 项目中实施返回 body 的压缩
------------------------------------------------

假设我们已经有了要返回的 body 和 headers, 并且知道了请求方支持的压缩方式 acceptEncoding,
那么我们可以简单进行如下操作:

```typescript
if (body !== null && body.length > 200) {
  if (acceptEncoding.includes('br')) {
    body = compress(new TextEncoder().encode(body));
    headers.set('content-encoding', 'br');
    headers.set('content-length', body.length.toString());
  }
}
```

deno_brotli 是什么
---------------------------

其实 deno_brotli 就做了一件事情: [src/lib.rs](https://github.com/denosaurs/deno_brotli/blob/master/src/lib.rs)

然后就是通过命令编译为 [wasm.js](https://github.com/denosaurs/deno_brotli/blob/master/wasm.js)

其中, 使用的 <https://github.com/rustwasm/wasm-bindgen> 项目还是挺值得我们学习一下的, 可以大幅扩展 JS 的能力,
就像本次利用了 <https://github.com/dropbox/rust-brotli> 这个库一样.
