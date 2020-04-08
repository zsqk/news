---
title: Node.js 生态中的流行包 request 正式被弃用
categories: [nodejs]
---

在 2019 年 3 月份, 作者就创建了[相关 issue][0] 讨论逐步让 request 进入历史.

最近, [作者正式宣布弃用该包][1].

关于弃用的原因, 主要是历史比较久远, 核心代码已经跟不上 Node.js 的发展.

我倾向标准库强大的语言. Go 从设计之初就拥有强大的标准库, Node.js 则是随着
ECMAScript 的进步, 逐渐通过语法来完善与丰富自己.

## 替代

关于 request 的替代品可以参考[这个 issue][2].

## 经验

其实我们并没有使用过 request, 在 Node.js 中只是用 node-fetch 和 axios.

在最初进入 Node.js 的时候, 我们关注到了 request, 但语法并没有打动我们,
所以我们转向了 node-fetch.

因为我们同时会写前后端, 在前端标准化的 fetch 让我们能尽快入手.
但正是由于我们前后端同时在写, 我们发现 node-fetch 的语法并不完全等同 fetch.
这让我们更容易因为忽略了差异项而出错.

之后我们再次寻找替代品, 发现了 r2. r2 代码的体积很小, 我们就看看源代码,
发现只是简单调用了 node-fetch.

在最近的项目中, 我们才开始用当时还流行的 axios.

我不太喜欢 axios 的语法, 有些过度了. 但基于流行原则我们还是在继续使用.

现在来看, request 作者的新包 [bent][3] 才是我们在 Node.js 中更应该做的选择.

## bent

bent 是一个同时支持浏览器与 Node.js 的 HTTP client.

在 Node.js 环境中, 进行了 Promise 化和流的支持.

在浏览器端, 对 fetch 进行了简单封装以符合 bent 的 API.

源代码很小, 依赖也不多. API 简洁实用. 是我们理想的选择.

但在浏览器端, bent 的封装对我们帮助不大, 我们还是会选择 fetch 然后自己封装.

[0]: https://github.com/request/request/issues/3142
[1]: https://github.com/request/request/commit/aded7e4f8e57f6f33cf39d65634bfb822bfcb2c8
[2]: https://github.com/request/request/issues/3143
[3]: https://github.com/mikeal/bent
