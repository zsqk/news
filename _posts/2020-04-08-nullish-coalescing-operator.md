---
title: 空值合并运算符 nullish coalescing operator
author: iugo
date: 2020-04-08
last_modified_at: 2024-12-10
categories: [ecmascript]
---

> :bulb: 目前 `??` 和 `??=` 已经是 ECMAScript 正式标准了.

## `??`

`??` 是空值合并运算符 [nullish coalescing operator][3], 现在已经是正式标准了.

听名字就挺好理解的, 主要为了替代 `||` 的部分功能.

`??` 与 `||` 的区别在于, `||` 判断真值, 而 `??` 只会判断非空值, 比如:

1. `null || 1` 结果为 `1`, `0 || 1` 结果也为 `1`.
2. `null ?? 1` 结果为 `1`, `0 ?? 1` 结果为 `0`.

~~空值合并运算符是 Finished Proposals(Stage 4). 将来大家都可以用到.~~
~~在浏览器中的支持情况已经很好了, 主流浏览器的最新版本都支持. 最新的 V8 已经支持,~~
~~但目前 Node.js 还不支持.~~

`??` 是一个有用的语法糖, 推荐大家使用.

## `??=`

`??=` 是逻辑空值赋值运算符, 也是 Finished Proposals(Stage 4).

~~最近 [Logical Assignment Operators 提案到了 Stage 3][0].~~

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

// 传统写法
if (opts.foo === null || opts.foo === undefined) {
    opts.foo = 'bar';
}

// 使用空值合并运算符的简写方式
// 注意：这种写法会总是触发赋值操作
opts.foo = opts.foo ?? 'bar';

// 使用括号来避免不必要的赋值
// 只有在 opts.foo 为 null 或 undefined 时才会执行赋值
opts.foo ?? (opts.foo = 'bar');

// 使用逻辑空值赋值运算符的最简写法
// 效果同上，更加简洁直观
opts.foo ??= 'bar';
```

[0]: https://github.com/tc39/proposals/commit/943bf8956b7d25032075e4789c1e351fdf2ae9ec
[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators
[2]: https://github.com/tc39/proposal-logical-assignment
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
