# JavaScript ES6 简单数组去重

Set对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会出现一次，即 Set 中的元素是唯一的。
Set 本身是一个构造函数，用来生成 Set 数据结构。

```js
const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5];
console.log([...new Set(numbers)])
```

另外，NaN和undefined都可以被存储在Set 中， NaN之间被视为相同的值（NaN被认为是相同的，尽管 NaN !== NaN）。

## Set 简单扩展应用

用Set实现并集，交集， 差集

```js
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// 并集
const union = [...new Set([...a, ...b])];
// ==> [1, 2, 3, 4];

// 交集
const intersect = [...new Set([...a].filter(v => b.has(v)))];
// ==> [2, 3];

// 差集
const difference = [...new Set([...a].filter(v => !b.has(v)))];
// ==> [1];
```

扩展阅读: <https://stackoverflow.com/a/9229821/4124389>
