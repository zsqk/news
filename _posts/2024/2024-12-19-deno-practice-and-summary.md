---
title: Deno 使用实践与总结
categories: [web, deno]
date: 2024-12-19
author: iugo
last_modified_at: 2024-12-19 09:48+08:00
---

## Deno 中的依赖管理

1. 直接使用 import 进行相对路径的文件引用.
2. 直接使用 import 进行 HTTPS 绝对路径的文件引用.
   2.1. 比如使用 deno.land 的包 (仅限公共包).
   2.2. 比如使用 GitHub 的包.
3. 引用 npm 包.
4. 引用 jsr 包. (仅限公共包).

### jsr.io

jsr.io 是 Deno 官方团队开发维护的一个包仓库, 可以同时发布为 Deno 和 Node.js 的包.

如果没有 jsr.io, 如果一个包想要同时支持 Deno 和 Node.js, 那么需要维护两套代码.

如果不想维护两套代码, 则可以构建时魔改代码, 但会受到许多约束:

1. 转为 Node.js 包的时候移除 `.ts` 后缀名.
2. 无法添加 deno 依赖.
3. 无法添加 Node.js 依赖.

jsr.io 的包可以同时支持 Deno 和 Node.js, 解决了上述痛点.
但是 jsr.io 有两大问题:

1. jsr.io 不支持 HTTP 绝对路径的文件引用.
2. jsr.io (暂时) 不支持私有包. <https://github.com/jsr-io/jsr/issues/203>

## Deno 运行时特点

### Deno 中的浮点误差

虽然 Deno 的一大核心是 V8 引擎, 但 Deno 的运行时针对浮点计算进行了特殊处理.

比如我们要做下面的浮点运算: `1.1 * 100`

- Deno 2.1.4 (since 1.9.2) -> `110`
- Chrome 131 (since 90) -> `110.00000000000001`
- Node.js v20.11.0 -> `110.00000000000001`

Deno 的运行时似乎在刻意避免浮点误差.

## Node.js 兼容性

Node.js 的生态非常庞大, Deno 想要扩大运行时市场份额,
需要为在 Node.js 环境下开发的软件提供兼容性.

在 Deno 2.x 版本中, Deno 已经尽量支持了许多 Node.js 的包.

但是这种支持仍然有限:

1. localAddress 参数没有效果. <https://github.com/denoland/deno/issues/24153>
2. [更多兼容问题见 issue 列表](https://github.com/denoland/deno/labels/node%20compat)
3. [Deno 支持不完善的 Node.js 功能](https://docs.deno.com/runtime/reference/node_apis/#partially-supported-modules)
4. [Deno 暂不支持的 Node.js 功能](https://docs.deno.com/runtime/reference/node_apis/#unsupported-modules)

## Deno API

目前 Deno 提供的 API 仍有限, 比如有下面的问题:

1. 网络请求时不支持选择网卡. <https://github.com/denoland/deno/issues/27376>
2. 不支持 brotli 压缩. (但通过 Node.js 兼容包可实现)
