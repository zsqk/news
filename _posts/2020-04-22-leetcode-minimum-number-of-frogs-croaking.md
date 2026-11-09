---
title: 編程題 聒噪的青蛙
categories: [leetcode, javascript]
author: iugo
---

寫業務代碼, 可能會碰到一些架構上的問題, 但性能不是重點, 很少接觸真正的算法.

最近[聽播客][1], 道長介紹在硅谷面試時, 一般初級軟件工程師就是算法題, 資深之後
才會有架構題, 越資深算法就越不重要.

但代碼與性能是一方面, 另一方面, 能否理解問題, 解決問題, 這是任何人都需要的.

我們的前端筆試題已經很久沒更新了, 後端則沒有正式的筆試題. 春季招聘正需要,
就打算去 LeetCode 上抄那麼幾道題應對招聘.

最近的一道中等難度的題是: [Minimum Number of Frogs Croaking][0]

根據 Hints, 用 JavaScript 寫了答案, 思路應該是清晰的, 效率也可以接受.
參考 Hints 寫的答案都是基礎方法, 但軟件工程應該就是使用最簡單的思路去解決問題.

以下是具體答案:

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

這裡給出一些我用過的測試:

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
    throw new Error(`${v} 的結果應該為 ${r}, 卻是 ${it}`);
  }
}
```

我最初的答案是這樣的:

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

這個答案性能不是重點, 看起來也更簡單. 但不能找出錯誤參數. 然後我才意識到,
這道題麻煩的是校驗錯誤.

然後老老實實依照 Hints 寫了最終的答案.

Hints:

> 1. keep the frequency of all characters from "croak" using a hashmap.
> 2. For each character in the given string, greedily match it to a possible "croak".

## 更新

第二天早上又花了一點時間寫了兩個版本:

通用版: <https://leetcode.com/submissions/detail/328828305/>

性能版: <https://leetcode.com/submissions/detail/328832285/>

再翻看大家的討論, 看到其他語言基本與我的性能版思路一致, 但通用版大家都沒怎麼寫.

在我目前的實際工作中, 性能要求並不高, 我們更期望可讀性強的代碼.

這道題前前後後, 寫代碼, 整理思路, 發帖, 花了兩三個小時, 我想
改動一下是可以作為筆試題了.

通用版代碼就不寫了, 以下是性能版源代碼:

```js
/**
 * @param {string} croakOfFrogs
 * @return {number}
 */
var minNumberOfFrogs = function (croakOfFrogs) {
  // 多出的數量
  let max = 0;

  // 儲存鳴叫數量
  let c = 0;
  let r = 0;
  let o = 0;
  let a = 0;
  let k = 0;

  for (let i = 0; i < croakOfFrogs.length; i++) {
    const v = croakOfFrogs[i];
    switch (v) {
      case "c":
        c += 1;
        break;
      case "r":
        r += 1;
        if (r > c) {
          return -1;
        }
        break;
      case "o":
        o += 1;
        if (o > r) {
          return -1;
        }
        break;
      case "a":
        a += 1;
        if (a > o) {
          return -1;
        }
        break;
      case "k":
        k += 1;
        if (k > a) {
          return -1;
        }
        if (c - k > max) {
          max = c - k;
        }
        break;
      default:
        return -1;
    }
  }
  if (c !== k) {
    return -1;
  }
  return max + 1;
};
```

[0]: https://leetcode.com/problems/minimum-number-of-frogs-croaking/
[1]: 2020-04-08-working-experience-in-silicon-valley
[2]: https://leetcode.com/problems/minimum-number-of-frogs-croaking/discuss/591884/JavaScript-Solution-faster-than-85.98-memory-less-than-100.00>
