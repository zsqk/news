---
title: 空值合併運算符 nullish coalescing operator
author: iugo
date: 2020-04-08
last_modified_at: 2024-12-10
categories: [ecmascript]
---

> :bulb: 目前 `??` 和 `??=` 已經是 ECMAScript 正式標準了.

## `??`

`??` 是空值合併運算符 [nullish coalescing operator][3], 現在已經是正式標準了.

聽名字就挺好理解的, 主要為了替代 `||` 的部分功能.

`??` 與 `||` 的區別在於, `||` 判斷真值, 而 `??` 只會判斷非空值, 比如:

1. `null || 1` 結果為 `1`, `0 || 1` 結果也為 `1`.
2. `null ?? 1` 結果為 `1`, `0 ?? 1` 結果為 `0`.

~~空值合併運算符是 Finished Proposals(Stage 4). 將來大家都可以用到.~~
~~在瀏覽器中的支持情況已經很好了, 主流瀏覽器的最新版本都支持. 最新的 V8 已經支持,~~
~~但目前 Node.js 還不支持.~~

`??` 是一個有用的語法糖, 推薦大家使用.

## `??=`

`??=` 是邏輯空值賦值運算符, 也是 Finished Proposals(Stage 4).

~~最近 [Logical Assignment Operators 提案到了 Stage 3][0].~~

以前沒有關注過[這一提案][2], 今天特意看了一下.

提案中說道, 在 ECMAScript 規範中, [有許多數學的賦值運算符][1],
但卻沒有邏輯的賦值運算符.

普通的賦值運算符就是 `=`. 數學的賦值運算符比如 `+=` 是加法的賦值運算符,
`-=` 是減法的賦值運算符.

所有的特殊賦值運算符目的都是為了簡潔, 只是一種語法糖.

不過既然我們都有了數學的賦值運算符, 那就是認可了這種語法糖, 提案者據此提出了
邏輯的賦值運算符.

當然也是借鑑了其他語言, 如 Ruby.

```js
let opts = { foo: 'foo' };

// 傳統寫法
if (opts.foo === null || opts.foo === undefined) {
    opts.foo = 'bar';
}

// 使用空值合併運算符的簡寫方式
// 注意：這種寫法會總是觸發賦值操作
opts.foo = opts.foo ?? 'bar';

// 使用括號來避免不必要的賦值
// 只有在 opts.foo 為 null 或 undefined 時才會執行賦值
opts.foo ?? (opts.foo = 'bar');

// 使用邏輯空值賦值運算符的最簡寫法
// 效果同上，更加簡潔直觀
opts.foo ??= 'bar';
```

[0]: https://github.com/tc39/proposals/commit/943bf8956b7d25032075e4789c1e351fdf2ae9ec
[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators
[2]: https://github.com/tc39/proposal-logical-assignment
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
