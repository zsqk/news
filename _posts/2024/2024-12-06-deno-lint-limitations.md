---
title: Deno lint 的局限
categories: [deno, software-engineering]
---

ESLint 是行业标准. 但是考虑到简洁及效率, Deno lint 没有与 ESLint 做兼容.

Deno lint 本身也没有插件机制, 虽然可以向 <https://github.com/denoland/deno_lint>
贡献规则, 但是生态远远不够好.

目前比较严重的使用上的不足:

1. [缺乏对 JSDoc `@deprecated` 的支持](https://github.com/denoland/deno_lint/issues/623)
2. 只能做单文件检查, 不能建立多文件关联.
3. 不能将注释与代码进行关联, 只能单独对注释或者代码进行检查.

要解决 Deno lint 的这些问题, 可以选择配合 ESLint 同时使用, 但正如
<https://github.com/denoland/deno_lint/issues/25#issuecomment-1307626597>
所说, 对于 Deno 项目来说, 使用 ESLint 还是会受到一些限制.

即便现在 Deno 实验性支持不写文件后缀名, 但还是有依赖等问题.
