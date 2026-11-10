---
title: Node.js 生態中的流行包 request 正式被棄用
categories: [nodejs]
---

在 2019 年 3 月份, 作者就創建了[相關 issue][0] 討論逐步讓 request 進入歷史.

最近, [作者正式宣佈棄用該包][1].

關於棄用的原因, 主要是歷史比較久遠, 核心代碼已經跟不上 Node.js 的發展.

我傾向標準庫強大的語言. Go 從設計之初就擁有強大的標準庫, Node.js 則是隨著
ECMAScript 的進步, 逐漸通過語法來完善與豐富自己.

## 替代

關於 request 的替代品可以參考[這個 issue][2].

## 經驗

其實我們並沒有使用過 request, 在 Node.js 中只是用 node-fetch 和 axios.

在最初進入 Node.js 的時候, 我們關注到了 request, 但語法並沒有打動我們,
所以我們轉向了 node-fetch.

因為我們同時會寫前後端, 在前端標準化的 fetch 讓我們能儘快入手.
但正是由於我們前後端同時在寫, 我們發現 node-fetch 的語法並不完全等同 fetch.
這讓我們更容易因為忽略了差異項而出錯.

之後我們再次尋找替代品, 發現了 r2. r2 代碼的體積很小, 我們就看看源代碼,
發現只是簡單調用了 node-fetch.

在最近的項目中, 我們才開始用當時還流行的 axios.

我不太喜歡 axios 的語法, 有些過度了. 但基於流行原則我們還是在繼續使用.

現在來看, request 作者的新包 [bent][3] 才是我們在 Node.js 中更應該做的選擇.

## bent

bent 是一個同時支持瀏覽器與 Node.js 的 HTTP client.

在 Node.js 環境中, 進行了 Promise 化和流的支持.

在瀏覽器端, 對 fetch 進行了簡單封裝以符合 bent 的 API.

源代碼很小, 依賴也不多. API 簡潔實用. 是我們理想的選擇.

但在瀏覽器端, bent 的封裝對我們幫助不大, 我們還是會選擇 fetch 然後自己封裝.

[0]: https://github.com/request/request/issues/3142
[1]: https://github.com/request/request/commit/aded7e4f8e57f6f33cf39d65634bfb822bfcb2c8
[2]: https://github.com/request/request/issues/3143
[3]: https://github.com/mikeal/bent
