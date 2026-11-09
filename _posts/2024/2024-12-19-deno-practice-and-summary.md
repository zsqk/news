---
title: Deno 使用實踐與總結
categories: [web, deno]
date: 2024-12-19
author: iugo
last_modified_at: 2024-12-19 09:48+08:00
---

<details lang="zh" open>
<summary>中文版本</summary>
<div markdown="1">

## Deno 中的依賴管理

1. 直接使用 import 進行相對路徑的文件引用.
2. 直接使用 import 進行 HTTPS 絕對路徑的文件引用.
   2.1. 比如使用 deno.land 的包 (僅限公共包).
   2.2. 比如使用 GitHub 的包 (raw.githubusercontent.com).
   2.3. 如 <https://esm.sh/>
   2.4. 如 <https://jspm.org/>
   2.5. 如 <https://www.skypack.dev/>
   2.6. 如 <https://www.jsdelivr.com/esm>
3. 引用 npm 包.
4. 引用 jsr 包. (僅限公共包).

### jsr.io 包倉庫

jsr.io 是 Deno 官方團隊開發維護的一個包倉庫, 可以同時發佈為 Deno 和 Node.js 的包.

如果沒有 jsr.io, 如果一個包想要同時支持 Deno 和 Node.js, 那麼需要維護兩套代碼.

如果不想維護兩套代碼, 則可以構建時魔改代碼, 但會受到許多約束:

1. 轉為 Node.js 包的時候移除 `.ts` 後綴名.
2. 無法添加 deno 依賴.
3. 無法添加 Node.js 依賴.

jsr.io 的包可以同時支持 Deno 和 Node.js, 解決了上述痛點.
但是 jsr.io 有兩大問題:

1. jsr.io 不支持 HTTP 絕對路徑的文件引用.
2. jsr.io (暫時) 不支持私有包. <https://github.com/jsr-io/jsr/issues/203>

## Deno 運行時特點

### Deno 中的浮點誤差

雖然 Deno 的一大核心是 V8 引擎, 但 Deno 的運行時針對浮點計算進行了特殊處理.

比如我們要做下面的浮點運算: `1.1 * 100`

- Deno 2.1.4 (since 1.9.2) -> `110`
- Chrome 131 (since 90) -> `110.00000000000001`
- Node.js v20.11.0 -> `110.00000000000001`

Deno 的運行時似乎在刻意避免浮點誤差.

## Node.js 兼容性

Node.js 的生態非常龐大, Deno 想要擴大運行時市場份額,
需要為在 Node.js 環境下開發的軟件提供兼容性.

在 Deno 2.x 版本中, Deno 已經儘量支持了許多 Node.js 的包.

但是這種支持仍然有限:

1. localAddress 參數沒有效果. <https://github.com/denoland/deno/issues/24153>
2. [更多兼容問題見 issue 列表](https://github.com/denoland/deno/labels/node%20compat)
3. [Deno 支持不完善的 Node.js 功能](https://docs.deno.com/runtime/reference/node_apis/#partially-supported-modules)
4. [Deno 暫不支持的 Node.js 功能](https://docs.deno.com/runtime/reference/node_apis/#unsupported-modules)

## 原生 Deno API

目前 Deno 提供的 API 仍有限, 比如有下面的問題:

1. 網絡請求時不支持選擇網卡. <https://github.com/denoland/deno/issues/27376>
2. 不支持 brotli 壓縮. (但通過 Node.js 兼容包可實現)

</div>
</details>

<details lang="en">
<summary>English Version</summary>
<div markdown="1">

## Dependency Management in Deno

1. Direct file imports using relative paths.
2. Direct file imports using HTTPS absolute paths.
   2.1. Using packages from deno.land (public packages only).
   2.2. Using packages from GitHub (raw.githubusercontent.com).
   2.3. From <https://esm.sh/>
   2.4. From <https://jspm.org/>
   2.5. From <https://www.skypack.dev/>
   2.6. From <https://www.jsdelivr.com/esm>
3. Importing npm packages.
4. Importing jsr packages (public packages only).

### jsr.io

jsr.io is a package registry developed and maintained by the Deno official team,
allowing packages to be published for both Deno and Node.js.

Without jsr.io, supporting both Deno and Node.js would require maintaining two
separate codebases.

To avoid maintaining dual codebases, code could be transformed during build time,
but with several constraints:

1. Removing `.ts` extensions when converting to Node.js packages.
2. Cannot add Deno dependencies.
3. Cannot add Node.js dependencies.

jsr.io packages can support both Deno and Node.js, solving these pain points.
However, jsr.io has two major issues:

1. jsr.io doesn't support HTTP absolute path imports.
2. jsr.io (temporarily) doesn't support private packages. <https://github.com/jsr-io/jsr/issues/203>

## Deno Runtime Characteristics

### Floating Point Precision in Deno

Although V8 engine is a core component of Deno, the runtime handles floating-point
calculations differently.

For example, let's consider this floating-point calculation: `1.1 * 100`

- Deno 2.1.4 (since 1.9.2) -> `110`
- Chrome 131 (since 90) -> `110.00000000000001`
- Node.js v20.11.0 -> `110.00000000000001`

Deno's runtime appears to deliberately avoid floating-point errors.

## Node.js Compatibility

With Node.js's vast ecosystem, Deno needs to provide compatibility for software
developed in Node.js environment to expand its runtime market share.

In Deno 2.x, many Node.js packages are supported.

However, this support is still limited:

1. localAddress parameter has no effect. <https://github.com/denoland/deno/issues/24153>
2. [More compatibility issues in the issue list](https://github.com/denoland/deno/labels/node%20compat)
3. [Partially supported Node.js features in Deno](https://docs.deno.com/runtime/reference/node_apis/#partially-supported-modules)
4. [Currently unsupported Node.js features in Deno](https://docs.deno.com/runtime/reference/node_apis/#unsupported-modules)

## Deno API

Currently, Deno's API offerings are still limited, with issues such as:

1. No support for network interface selection in network requests. <https://github.com/denoland/deno/issues/27376>
2. No support for brotli compression. (though achievable through Node.js
   compatibility packages)

</div>
</details>
