---
title: 空值合并运算符 nullish coalescing operator
categories: [ecmascript]
---

# nullish coalescing operator

最近 [Logical Assignment Operators 提案到了 Stage 3][0].

以前没有关注过[这一提案][2], 今天特意看了一下.

提案中说道, 在 ECMAScript 规范中, [有许多数学的赋值运算符][1],
但却没有逻辑的赋值运算符.

普通的赋值运算符就是 `=`. 数学的赋值运算符比如 `+=` 是加法的赋值运算符,
`-=` 是减法的赋值运算符.

所有的特殊赋值运算符目的都是为了简洁, 只是一种语法糖.

不过既然我们都有了数学的赋值运算符, 那就是认可了这种语法糖, 提案者据此提出了
逻辑的赋值运算符.

当然也是借鉴了其他语言, 如 Ruby.

```js
let opts = { foo: 'foo' };

// 等效
if (opts.foo === null || opts.foo === undefined) {
    opts.foo = 'bar';
}
opts.foo = opts.foo ?? 'bar'

// 等效
opts.baz ?? (opts.baz = 'qux');
opts.baz ??= 'qux';
```

这里说到了以前没见过的运算符, `??`, 被称为 [nullish coalescing operator][3].

在 MDN 的中文文档里被称为 空值合并运算符.

听名字就挺好理解的, 主要为了替代 `||` 的部分功能.

空值合并运算符是 Finished Proposals(Stage 4). 将来大家都可以用到.
在浏览器中的支持情况已经很好了, 主流浏览器的最新版本都支持. 最新的 V8 已经支持,
但目前 Node.js 还不支持.

总之, `??` 对我来说是一个有用的语法糖, 我也会推荐大家使用.

[0]: https://github.com/tc39/proposals/commit/943bf8956b7d25032075e4789c1e351fdf2ae9ec
[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators
[2]: https://github.com/tc39/proposal-logical-assignment
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
