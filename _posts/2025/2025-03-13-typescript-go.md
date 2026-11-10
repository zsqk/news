---
title: TypeScript 使用 Go 進行了重構
author: iugo
categories: [typescript, go, programming-language, microsoft]
---

我在 GitHub 上看到了 @ahejlsberg 為 <https://github.com/microsoft/typescript-go>
project 點了 star.

在 11 日, TypeScript 官方博客發佈了一篇名為 [A 10x Faster TypeScript][faster-ts]
的文章, 介紹了微軟正在使用 Go 語言重寫 TypeScript 編譯器, 並取得了顯著的性能提升.

Anders Hejlsberg 是 TypeScript 的主要設計者, 也是 C# 和 Delphi 的最初設計者.
為瞭解決性能問題, 他帶領的團隊沒有使用 C# 或者 Rust 等語言, 而是使用了 Go,
在社區中引起了一些質疑的聲音.

我認為最重要的原因就是新項目是 "port", 而不是 "rewrite". 在一眾備選項中,
Go 的語法是最容易從 TypeScript 遷移過去的.

我理解微軟開發團隊這樣的做法, 比如 VS Code 在宣傳的時候也會使用 create-react-app
這樣的 Facebook 項目來宣傳. 可見, 微軟想要與技術社區進行融合的意願很強.

## 為什麼選擇 Go?

根據 TypeScript 官方博客 [A 10x Faster TypeScript][faster-ts] 的介紹, 微軟選擇
Go 語言進行編譯器移植的原因主要包括:

1. **可維護性**: Go 語言擁有高效且易於理解的垃圾收集器, 簡單易學的語法以及良好的
   開發者生態系統, 使得維護大型代碼庫更加容易
2. **性能優勢**: Go 編譯器的多方面優化使其非常適合構建編譯器這類程序, 並且與
   JavaScript 版本相比, 能夠顯著提高編譯速度
3. **跨平臺能力**: Go 的原生編譯特性讓 TypeScript 編譯器能夠輕鬆構建為適用於
   各種操作系統的單一二進制文件
4. **開發效率**: Go 語言的錯誤處理模式, 簡單的語法和快速的編譯時間,
   讓開發團隊能夠快速迭代和實現功能

C/C++ 的跨平臺能力較差, 比如不支持簡單編譯為各個平臺的單一二進制文件.
而 Rust 的內存安全模型過於複雜, 不適合作為 port 項目.
C# 應該更多是語言特性上與 TypeScript 有區別, 嚴格的 OOP 風格不適合作為 port.

## 當前進展與兼容性

[repo] 的 init commit 是 2024-10-01 <https://github.com/microsoft/typescript-go/commit/cdcc0cb808d8ad0c91d9520edac3d815bff92514>,
僅用大概半年的時間, 就取得了顯著的進展, 據說完成了 80% 的代碼遷移.

根據 GitHub 倉庫的 README 文檔, TypeScript 的 Go 原生移植版(稱為"TypeScript 7")
目前仍處於積極開發階段. 當前已完成的功能包括:

- 程序創建(讀取 `lib`, `target`, `reference` 等配置)
- 解析/掃描(讀取源文本並確定語法結構)
- 命令行和 `tsconfig.json` 解析
- 類型解析和類型檢查

為了實現遷移, 微軟會在 TypeScript 6 (仍然是 TypeScript) 的時候, 做一些功能調整,
以保證將來發布 TypeScript 7 (Go 版本) 時大家可以無縫遷移.

TypeScript 6 和 TypeScript 7 的 API 是完全兼容的, 所以開發者可以隨時升級或降級.
在 TypeScript 7 被完全接受前, TypeScript 6 會繼續開發, 以作為備選.

## 社區反應

這一項目在公佈後引起了開發社區的廣泛關注, 截至目前 GitHub 倉庫已獲得超過 11.9k
的星標. 許多開發者對於提升 TypeScript 性能的前景表示期待, 特別是那些處理大型
代碼庫的團隊.

社區討論主要集中在性能提升, 工具鏈兼容性以及 [為什麼選擇 Go][why-go]
而非其他語言 (如 Rust) 上.

## 相關鏈接

- [A 10x Faster TypeScript][faster-ts]
- [GitHub 倉庫: typescript-go][repo]

[faster-ts]: https://devblogs.microsoft.com/typescript/typescript-native-port/
[repo]: https://github.com/microsoft/typescript-go
[why-go]: https://github.com/microsoft/typescript-go/discussions/411
