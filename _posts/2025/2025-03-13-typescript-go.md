---
title: TypeScript 使用 Go 进行了重构
author: iugo
categories: [typescript, go, programming-language, microsoft]
---

我在 GitHub 上看到了 @ahejlsberg 为 <https://github.com/microsoft/typescript-go>
project 点了 star.

在 11 日, TypeScript 官方博客发布了一篇名为 [A 10x Faster TypeScript][faster-ts]
的文章, 介绍了微软正在使用 Go 语言重写 TypeScript 编译器, 并取得了显著的性能提升.

Anders Hejlsberg 是 TypeScript 的主要设计者, 也是 C# 和 Delphi 的最初设计者.
为了解决性能问题, 他带领的团队没有使用 C# 或者 Rust 等语言, 而是使用了 Go,
在社区中引起了一些质疑的声音.

我认为最重要的原因就是新项目是 "port", 而不是 "rewrite". 在一众备选项中,
Go 的语法是最容易从 TypeScript 迁移过去的.

我理解微软开发团队这样的做法, 比如 VS Code 在宣传的时候也会使用 create-react-app
这样的 Facebook 项目来宣传. 可见, 微软想要与技术社区进行融合的意愿很强.

## 为什么选择 Go?

根据 TypeScript 官方博客 [A 10x Faster TypeScript][faster-ts] 的介绍, 微软选择
Go 语言进行编译器移植的原因主要包括:

1. **可维护性**: Go 语言拥有高效且易于理解的垃圾收集器, 简单易学的语法以及良好的
   开发者生态系统, 使得维护大型代码库更加容易
2. **性能优势**: Go 编译器的多方面优化使其非常适合构建编译器这类程序, 并且与
   JavaScript 版本相比, 能够显著提高编译速度
3. **跨平台能力**: Go 的原生编译特性让 TypeScript 编译器能够轻松构建为适用于
   各种操作系统的单一二进制文件
4. **开发效率**: Go 语言的错误处理模式, 简单的语法和快速的编译时间,
   让开发团队能够快速迭代和实现功能

C/C++ 的跨平台能力较差, 比如不支持简单编译为各个平台的二进制文件.
而 Rust 的内存安全模型过于复杂, 不适合作为 port 项目.
C# 应该更多是语言特性上与 TypeScript 有区别, 严格的 OOP 风格不适合作为 port.

## 当前进展与兼容性

[repo] 的 init commit 是 2024-10-01 <https://github.com/microsoft/typescript-go/commit/cdcc0cb808d8ad0c91d9520edac3d815bff92514>,
仅用大概半年的时间, 就取得了显著的进展, 据说完成了 80% 的代码迁移.

根据 GitHub 仓库的 README 文档, TypeScript 的 Go 原生移植版(称为"TypeScript 7")
目前仍处于积极开发阶段. 当前已完成的功能包括:

- 程序创建(读取 `lib`, `target`, `reference` 等配置)
- 解析/扫描(读取源文本并确定语法结构)
- 命令行和 `tsconfig.json` 解析
- 类型解析和类型检查

为了实现迁移, 微软会在 TypeScript 6 (仍然是 TypeScript) 的时候, 做一些功能调整,
以保证将来发布 TypeScript 7 (Go 版本) 时大家可以无缝迁移.

TypeScript 6 和 TypeScript 7 的 API 是完全兼容的, 所以开发者可以随时升级或降级.
在 TypeScript 7 被完全接受前, TypeScript 6 会继续开发, 以作为备选.

## 社区反应

这一项目在公布后引起了开发社区的广泛关注, 截至目前 GitHub 仓库已获得超过 11.9k
的星标. 许多开发者对于提升 TypeScript 性能的前景表示期待, 特别是那些处理大型
代码库的团队.

社区讨论主要集中在性能提升, 工具链兼容性以及为什么选择 Go 而非其他语言 (如 Rust) 上.

## 相关链接

- [A 10x Faster TypeScript][faster-ts]
- [GitHub 仓库: typescript-go][repo]

[faster-ts]: https://devblogs.microsoft.com/typescript/typescript-native-port/
[repo]: https://github.com/microsoft/typescript-go
