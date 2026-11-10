---
title: 在 Deno 中實現 HTTP 返回 body 的 Brotli 壓縮
categories: [deno, web, http, brotli]
author: iugo
---

> :warning: 本文是 2022 年 2 月 23 日寫的, 現在 Deno 已經有了變動,
> 所以本文在部分地方可能已經過時.

在 9 個月之前, 我們在項目中創建了這則 issue, 今天, 伴隨著 Deno 最近標準庫的變動,
我們對此進行更加系統地說明.

Why & What
-------------------

之前, 我們的 Web 項目對 HTTP 返回 body 實現了 deflate 的壓縮算法, 但使用的是 JS,
還是不夠快. 我們考慮支持對此進行優化.

我們知道對於大多數瀏覽器來說, 都會發送這樣的請求頭 `Accept-Encoding: gzip, deflate, br`.

其中 `br` 就是我們暫時不支持的 br 壓縮, 即 Brotli 壓縮算法.

從發展來看, br 是更適合 HTTP 的壓縮算法, 現代瀏覽器也都支持了.

<https://hacks.mozilla.org/2015/11/better-than-gzip-compression-with-brotli/>

在 Deno 項目中實現 br
----------------------------

但目前 Deno 仍未有對此的支持計劃. (有 issue, 但還沒計劃去做)

在 Node.js 中, 有標準庫 zlab 去實現該壓縮算法.
<https://nodejs.org/api/zlib.html#zlib_class_zlib_brotlicompress>

但在 Deno 中, 官方不支持.

在 npm 中有這樣的包 <https://www.npmjs.com/package/brotli> 來實現 br 算法壓縮.
利用了 Emscripten(C++) 去實現.

npm 的包是不能在 Deno 上使用的. 在調用其他方式上, 是通過 WASM.

雖然能看到 WASM 本體 `https://cdn.jsdelivr.net/npm/brotli@1.3.2/build/mem.js`
但是現在還不能直接在 Deno 項目中用, 需要對包引用進行變動.

然後嘗試在 Deno 社區中找相關解決方案, 就是 <https://github.com/denosaurs/deno_brotli>.

正如所有 Deno 項目一樣, deno_brotli 的使用非常簡單,
只需要 `import { compress } from 'https://deno.land/x/brotli@v0.1.4/mod.ts';` 即可.

在 Deno Web 項目中實施返回 body 的壓縮
------------------------------------------------

假設我們已經有了要返回的 body 和 headers, 並且知道了請求方支持的壓縮方式 acceptEncoding,
那麼我們可以簡單進行如下操作:

```typescript
if (body !== null && body.length > 200) {
  if (acceptEncoding.includes('br')) {
    body = compress(new TextEncoder().encode(body));
    headers.set('content-encoding', 'br');
    headers.set('content-length', body.length.toString());
  }
}
```

deno_brotli 是什麼
---------------------------

其實 deno_brotli 就做了一件事情: [src/lib.rs](https://github.com/denosaurs/deno_brotli/blob/master/src/lib.rs)

然後就是通過命令編譯為 [wasm.js](https://github.com/denosaurs/deno_brotli/blob/master/wasm.js)

其中, 使用的 <https://github.com/rustwasm/wasm-bindgen> 項目還是挺值得我們學習一下的, 可以大幅擴展 JS 的能力,
就像本次利用了 <https://github.com/dropbox/rust-brotli> 這個庫一樣.
