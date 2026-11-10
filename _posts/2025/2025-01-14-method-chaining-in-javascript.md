---
title: JS 中的鏈式調用
categories: [javascript, ecmascript]
author: iugo
date: 2025-01-14
last_modified_at: 2025-01-15 15:48+08:00
---

## 數組中的鏈式調用

```ts
const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(n => n % 2 === 0) // 過濾偶數
  .map(n => n * 2) // 每個數乘以2
  .reduce((sum, n) => sum + n, 0); // 求和
```

但是僅限於數組, 如果想要在其他對象上實現鏈式調用, 就需要自定義方法.

## 多變量鏈式調用

為了可以對任何數據使用自定義方法, 我們可以這樣做:

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

這種做法的缺點是額外增加了許多變量, 為了這些變量要進行許多不必要的命名.

## 多函數嵌套鏈式調用

為了避免不必要的命名, 我們可以直接調用:

```ts
const result = add(multiply(add(0, 5), 2), 3);
console.log(result); // 13
```

可是這樣做後, 代碼的可讀性很差.

## 對象方法鏈式調用

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

但是需要額外新增對象, 並且許多時候函數作為方法並不合適.

## Promise 中的鏈式調用

為瞭解決上述問題, 我們可以使用 Promise 的鏈式調用:

```ts
const result = await Promise.resolve(0)
  .then(x => add(x, 5))
  .then(x => multiply(x, 2))
  .then(x => add(x, 3));
console.log(result); // 13
```

並且這種做法可以僅僅使用匿名函數, 不使用函數, 在一些小變動的時候很方便:

```ts
const result = await Promise.resolve(0)
  .then(x => x + 5)
  .then(x => x * 2)
  .then(x => x + 3);
console.log(result); // 13
```

目前這是我最常用的方法. 但是缺點是強制將代碼轉為了異步.

## JS Pipe Operator (管道操作符) 提案

<https://github.com/tc39/proposal-pipeline-operator>

參考了幾種語言的語法:

1. Hack
2. F#

另外, 許多其他語言也有類似語法, 比如 Elixir.
