---
title: JS 中的链式调用
categories: [javascript, ecmascript]
author: iugo
date: 2025-01-14
last_modified_at: 2025-01-15 15:48+08:00
---

## 数组中的链式调用

```ts
const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(n => n % 2 === 0) // 过滤偶数
  .map(n => n * 2) // 每个数乘以2
  .reduce((sum, n) => sum + n, 0); // 求和
```

但是仅限于数组, 如果想要在其他对象上实现链式调用, 就需要自定义方法.

## 多变量链式调用

为了可以对任何数据使用自定义方法, 我们可以这样做:

```ts
function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

let num = 0;
let num2 = add(num, 5);
let num3 = multiply(num2, 2);
let num4 = add(num3, 3);
console.log(num4); // 13
```

这种做法的缺点是额外增加了许多变量, 为了这些变量要进行许多不必要的命名.

## 多函数嵌套链式调用

为了避免不必要的命名, 我们可以直接调用:

```ts
const result = add(multiply(add(0, 5), 2), 3);
console.log(result); // 13
```

可是这样做后, 代码的可读性很差.

## 对象方法链式调用

```ts
class Calculator {
  constructor() {
    this.value = 0;
  }
  add(n) {
    this.value += n;
    return this;
  }

  multiply(n) {
    this.value *= n;
    return this;
  }

  getValue() {
    return this.value;
  }
}

const calc = new Calculator();
const result = calc
  .add(5)
  .multiply(2)
  .add(3)
  .getValue(); // 13
```

但是需要额外新增对象, 并且许多时候函数作为方法并不合适.

## Promise 中的链式调用

为了解决上述问题, 我们可以使用 Promise 的链式调用:

```ts
const result = await Promise.resolve(0)
  .then(x => add(x, 5))
  .then(x => multiply(x, 2))
  .then(x => add(x, 3));
console.log(result); // 13
```

并且这种做法可以仅仅使用匿名函数, 不使用函数, 在一些小变动的时候很方便:

```ts
const result = await Promise.resolve(0)
  .then(x => x + 5)
  .then(x => x * 2)
  .then(x => x + 3);
console.log(result); // 13
```

目前这是我最常用的方法. 但是缺点是强制将代码转为了异步.

## JS Pipe Operator (管道操作符) 提案

<https://github.com/tc39/proposal-pipeline-operator>

参考了几种语言的语法:

1. Hack
2. F#

另外, 许多其他语言也有类似语法, 比如 Elixir.
