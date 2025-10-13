---
title: Deno Fresh 2.x 支持 Vite
author: iugo
categories: [deno, vite]
---

Update:

- 目前 Fresh 文档默认的版本已经是 2.x.

---

在许多前端项目中, 都使用 Vite 处理构建流程.

对于 Deno 团队来说, Node.js 生态下的项目, 如 ESLint 等一直是受到排斥的.
基于零配置易用性及性能考虑, Deno 会在相关领域重做一套工具, 比如 deno lint, fmt.

不过随着 Deno 对 Node.js 兼容性的增强, Deno 团队对 Node.js 生态也越来越包容.

现在, Deno 官方项目 Fresh 会主动集成 Vite (而不是 deno compile 或者刚刚恢复的 deno bundle).

官方 Blog 文章: [Fresh 2.0 Graduates to Beta, Adds Vite Support](https://deno.com/blog/fresh-and-vite)

`deno compile` 一直没有实现一键打包 Deno Fresh 项目. 或许跟 Fresh 特殊的路由策略有关.

但是 Vite 是支持在编译时处理动态路由并且打包的, 也支持代码分割.

在官方文章中, 主要介绍了下面几个功能:

1. 借助 Vite 的 岛内热加载, 而不是全页热加载.
2. 借助 Vite 的 服务器代码打包, 加快启动时间.
3. 借助 Vite 的 React 别名.
4. 回归的 `Head` 组件

Fresh 2.0 正式进入 beta, 不再会有重大变动. 现在就可以尝试了.
