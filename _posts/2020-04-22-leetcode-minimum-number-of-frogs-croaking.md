---
title: 编程题 聒噪的青蛙
categories: [leetcode, javascript]
author: iugo
---

写业务代码, 可能会碰到一些架构上的问题, 但性能不是重点, 很少接触真正的算法.

最近[听播客][1], 道长介绍在硅谷面试时, 一般初级软件工程师就是算法题, 资深之后
才会有架构题, 越资深算法就越不重要.

但代码与性能是一方面, 另一方面, 能否理解问题, 解决问题, 这是任何人都需要的.

我们的前端笔试题已经很久没更新了, 后端则没有正式的笔试题. 春季招聘正需要,
就打算去 LeetCode 上抄那么几道题应对招聘.

最近的一道中等难度的题是: [Minimum Number of Frogs Croaking][0]

根据 Hints, 用 JavaScript 写了答案, 思路应该是清晰的, 效率也可以接受.
参考 Hints 写的答案都是基础方法, 但软件工程应该就是使用最简单的思路去解决问题.

以下是具体答案:

> Runtime: 76 ms, faster than 85.98% of JavaScript online submissions.
> Memory Usage: 37.1 MB, less than 100.00% of JavaScript online submissions.
> (2020-04-22 17:22:18 +8)

```js
/**
 * @param {string} croakOfFrogs
 * @return {number}
 */
var minNumberOfFrogs = function (croakOfFrogs) {
  let max = 0;
  const m = { c: 0, r: 0, o: 0, a: 0, k: 0 };
  for (const v of croakOfFrogs) {
    if (!"croak".includes(v)) {
      return -1;
    }
    if (v === "k") {
      m.c -= 1;
      m.r -= 1;
      m.o -= 1;
      m.a -= 1;
      if (m.c >= max) {
        max = m.c + 1;
      }
    } else {
      m[v] += 1;
      if (m.c < m.r || m.r < m.o || m.o < m.a || m.a < m.k) {
        return -1;
      }
    }
  }
  if (m.c !== 0) {
    return -1;
  }
  return max;
};
```

## 附

这里给出一些我用过的测试:

```js
const test = [
  ["cccroacrkroakroakcroakoak", 4],
  ["cccroacrkroakroakcroakaok", -1],
  ["croakcrook", -1],
  ["croakcroak", 1],
  ["croakcroa", -1],
  ["croakcroac", -1],
];

for (const [v, r] of test) {
  const it = minNumberOfFrogs(v);
  if (it !== r) {
    throw new Error(`${v} 的结果应该为 ${r}, 却是 ${it}`);
  }
}
```

我最初的答案是这样的:

```js
/**
 * @param {string} croakOfFrogs
 * @return {number}
 */
var minNumberOfFrogs0 = function (croakOfFrogs) {
  return croakOfFrogs
    .split("k")
    .map((v) => cDisplayTime(v))
    .reduce((acc, v) => {
      if (v > acc) {
        return v;
      }
      return acc;
    }, 0);
};

function cDisplayTime(str) {
  let count = 0;
  for (const v of str) {
    if (v === "c") {
      count += 1;
    }
  }
  return count;
}
```

这个答案性能不是重点, 看起来也更简单. 但不能找出错误参数. 然后我才意识到,
这道题麻烦的是校验错误.

然后老老实实依照 Hints 写了最终的答案.

Hints:

> 1. keep the frequency of all characters from "croak" using a hashmap.
> 2. For each character in the given string, greedily match it to a possible "croak".

[0]: https://leetcode.com/problems/minimum-number-of-frogs-croaking/
[1]: _posts/2020-04-08-working-experience-in-silicon-valley.md
[2]: https://leetcode.com/problems/minimum-number-of-frogs-croaking/discuss/591884/JavaScript-Solution-faster-than-85.98-memory-less-than-100.00>
