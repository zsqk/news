---
title: ECMAScript 中的相等
categories: [ecmascript, javascript]
author: iugo
---

## 相等

- Strict Equality Comparison `===` 嚴格相等
- Abstract Equality Comparison `==` 大概相等
- [SameValueZero][1]
- SameValue

### `===` 與 `==` 的區別

如果兩值類型相等, 則兩種對比沒有區別. `==` 的主要功能是隱性地類型轉換.

如果一個為 `Number` 另一個為 `String`, 則將 `String` 轉為 Number 類型進行對比.

如果任意一個為 `Boolean`, 則將 `Boolean` 轉為 Number 類型進行對比.

如果任意一個為 `Object`, 則調用 `.toString()` 轉類型.

轉為 Number 類型時, 需要注意: `true => 1, false => +0, null => +0`.

總結如下:

| 類型      | 轉換        |
| --------- | ----------- |
| null      | 不轉換      |
| undefined | 不轉換      |
| Number    | 不轉換      |
| String    | 轉為 Number |
| Object    | 轉為 String |
| `true`    | `1`         |
| `false`   | `+0`        |

依據上面的規則, 我們可以得到以下結果.

```js
null == undefined;
"[object Object]" == {};
1 == true;
2 !== true;
0 == false;
-1 !== false;
NaN == "NaN";
!({} == true);
!({} == false);
```

有些是我們想要的, 但有些不是. 因為這種類型轉換的複雜性, 不建議使用 `==`.

### SameValueZero 與 SameValue 的區別

主要區別在於是否區分 `-0` 與 `+0`. SameValue 區分, SameValueZero 則不區分.

這是歷史遺留問題, 我們一般不會直接遇到該問題.

### `===` 與 SameValueZero 的區別

主要區別在於是否區分兩個 `NaN`, `===` 區分, SameValueZero 則不區分.

## 賦值

整個 [Assignment Operators][2] 比較複雜, 簡單說運算符右側使用的 [GetValue][3].

如果不是引用類型, 則只是返回該值就好.

如果是引用類型, 則將該值複製. 如果右側為對象, 則創建該值的引用.

## 深度對比與不可變值

概念:

- deep copy
- deep equal
- memoization
- immutable object

應用:

- `JSON.stringify`
- lodash/isEqual
- memoize-one
- [immutability-helper][5]

## 結論

一般來說, 我們避免使用 `==`, 要使用 `===`.

在處理複雜對象同時為了優化性能時, 我們會使用 memo 的方法, 但如何更好判斷依賴項
是否發生了變化, 我們只要在每次變化時, 把這個複雜對象當作 immutable object 就好.

當我們使用了 immutable object, 就不再那麼需要 deep copy 和 deep equal 了.

[1]: https://ecma-international.org/ecma-262/#sec-samevaluezero
[2]: https://tc39.es/ecma262/#sec-assignment-operators
[3]: https://tc39.es/ecma262/#sec-getvalue
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
[5]: https://runkit.com/iugo/immutability-helper-test
