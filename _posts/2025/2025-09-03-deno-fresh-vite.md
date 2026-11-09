---
title: Deno Fresh 2.x 支持 Vite
author: iugo
categories: [deno, vite]
---

Update:

- 目前 Fresh 文檔默認的版本已經是 2.x.

---

在許多前端項目中, 都使用 Vite 處理構建流程.

對於 Deno 團隊來說, Node.js 生態下的項目, 如 ESLint 等一直是受到排斥的.
基於零配置易用性及性能考慮, Deno 會在相關領域重做一套工具, 比如 deno lint, fmt.

不過隨著 Deno 對 Node.js 兼容性的增強, Deno 團隊對 Node.js 生態也越來越包容.

現在, Deno 官方項目 Fresh 會主動集成 Vite (而不是 deno compile 或者剛剛恢復的 deno bundle).

官方 Blog 文章: [Fresh 2.0 Graduates to Beta, Adds Vite Support](https://deno.com/blog/fresh-and-vite)

`deno compile` 一直沒有實現一鍵打包 Deno Fresh 項目. 或許跟 Fresh 特殊的路由策略有關.

但是 Vite 是支持在編譯時處理動態路由並且打包的, 也支持代碼分割.

在官方文章中, 主要介紹了下面幾個功能:

1. 藉助 Vite 的 島內熱加載, 而不是全頁熱加載.
2. 藉助 Vite 的 服務器代碼打包, 加快啟動時間.
3. 藉助 Vite 的 React 別名.
4. 迴歸的 `Head` 組件

Fresh 2.0 正式進入 beta, 不再會有重大變動. 現在就可以嘗試了.
