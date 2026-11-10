---
title: Deno lint 的侷限
categories: [deno, software-engineering]
---

ESLint 是行業標準. 但是考慮到簡潔及效率, Deno lint 沒有與 ESLint 做兼容.

Deno lint 本身也沒有插件機制, 雖然可以向 <https://github.com/denoland/deno_lint>
貢獻規則, 但是生態遠遠不夠好.

目前比較嚴重的使用上的不足:

1. [缺乏對 JSDoc `@deprecated` 的支持](https://github.com/denoland/deno_lint/issues/623)
2. 只能做單文件檢查, 不能建立多文件關聯.
3. 不能將註釋與代碼進行關聯, 只能單獨對註釋或者代碼進行檢查.

要解決 Deno lint 的這些問題, 可以選擇配合 ESLint 同時使用, 但正如
<https://github.com/denoland/deno_lint/issues/25#issuecomment-1307626597>
所說, 對於 Deno 項目來說, 使用 ESLint 還是會受到一些限制.

即便現在 Deno 實驗性支持不寫文件後綴名, 但還是有依賴等問題.
