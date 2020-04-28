---
title: ECMAScript 中的相等
categories: [ecmascript, javascript]
author: iugo
---

## 相等

- Strict Equality Comparison `===` 严格相等
- Abstract Equality Comparison `==` 大概相等
- [SameValueZero][1]
- SameValue

### `===` 与 `==` 的区别

如果两值类型相等, 则两种对比没有区别. `==` 的主要功能是隐性地类型转换.

如果一个为 `Number` 另一个为 `String`, 则将 `String` 转为 Number 类型进行对比.

如果任意一个为 `Boolean`, 则将 `Boolean` 转为 Number 类型进行对比.

如果任意一个为 `Object`, 则调用 `.toString()` 转类型.

转为 Number 类型时, 需要注意: `true => 1, false => +0, null => +0`.

总结如下:

| 类型      | 转换        |
| --------- | ----------- |
| null      | 不转换      |
| undefined | 不转换      |
| Number    | 不转换      |
| String    | 转为 Number |
| Object    | 转为 String |
| `true`    | `1`         |
| `false`   | `+0`        |

依据上面的规则, 我们可以得到以下结果.

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

有些是我们想要的, 但有些不是. 因为这种类型转换的复杂性, 不建议使用 `==`.

### SameValueZero 与 SameValue 的区别

主要区别在于是否区分 `-0` 与 `+0`. SameValue 区分, SameValueZero 则不区分.

这是历史遗留问题, 我们一般不会直接遇到该问题.

### `===` 与 SameValueZero 的区别

主要区别在于是否区分两个 `NaN`, `===` 区分, SameValueZero 则不区分.

## 赋值

整个 [Assignment Operators][2] 比较复杂, 简单说运算符右侧使用的 [GetValue][3].

如果不是引用类型, 则只是返回该值就好.

如果是引用类型, 则将该值复制. 如果右侧为对象, 则创建该值的引用.

## 深度对比与不可变值

概念:

- deep copy
- deep equal
- memoization
- immutable object

应用:

- `JSON.stringify`
- lodash/isEqual
- memoize-one
- [immutability-helper][5]

## 结论

一般来说, 我们避免使用 `==`, 要使用 `===`.

在处理复杂对象同时为了优化性能时, 我们会使用 memo 的方法, 但如何更好判断依赖项
是否发生了变化, 我们只要在每次变化时, 把这个复杂对象当作 immutable object 就好.

当我们使用了 immutable object, 就不再那么需要 deep copy 和 deep equal 了.

[1]: https://ecma-international.org/ecma-262/#sec-samevaluezero
[2]: https://tc39.es/ecma262/#sec-assignment-operators
[3]: https://tc39.es/ecma262/#sec-getvalue
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
[5]: https://runkit.com/iugo/immutability-helper-test
