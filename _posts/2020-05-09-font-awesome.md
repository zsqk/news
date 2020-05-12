---
title: 如何用 CSS 自定义使用 Font Awesome 图标
slug: font-awesome-in-css
categories: [css, font-awesome]
author: iugo
---

最近想在 CSS `::after` 中直接使用 Font Awesome 图标.

我们可以直接看代码了解如何去使用, 也可以通过 [Font Awesome 官方的文章][0].

具体实现就是:

```css
.need-after::after {
  font-family: "Font Awesome 5 Free";
  content: "\f007";
}
```

其中 content 的值可以直接在 [gallery][1] 中找到.

## 附: CSS 的编码

这里顺便说一下 CSS 的编码.

对于一些编程语言来说, 比如 `a` 会使用 `\u0061` 这样编码, 其中 u 代表 Unicode.

但 CSS 没有, 虽然编码方式也是 UTF, 但储存方式是固定的 6 个 hex, 比 UTF-32
少了两个储存位置. 比如 `a` 在 CSS 中可以写为 `\000061`.

[0]: https://fontawesome.com/how-to-use/on-the-web/advanced/css-pseudo-elements
[1]: https://fontawesome.com/icons?d=gallery&m=free
