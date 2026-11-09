---
title: JavaScript ES6 簡單數組去重
categories: [javascript]
---

Set對象是值的集合，你可以按照插入的順序迭代它的元素。 Set中的元素只會出現一次，即 Set 中的元素是唯一的。
Set 本身是一個構造函數，用來生成 Set 數據結構。

```js
const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5];
console.log([...new Set(numbers)])
```

另外，NaN和undefined都可以被存儲在Set 中， NaN之間被視為相同的值（NaN被認為是相同的，儘管 NaN !== NaN）。

## Set 簡單擴展應用

用Set實現並集，交集， 差集

```js
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// 並集
const union = [...new Set([...a, ...b])];
// ==> [1, 2, 3, 4];

// 交集
const intersect = [...new Set([...a].filter(v => b.has(v)))];
// ==> [2, 3];

// 差集
const difference = [...new Set([...a].filter(v => !b.has(v)))];
// ==> [1];
```

擴展閱讀: <https://stackoverflow.com/a/9229821/4124389>
