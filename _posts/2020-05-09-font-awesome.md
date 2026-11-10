---
title: 如何用 CSS 自定義使用 Font Awesome 圖標
slug: font-awesome-in-css
categories: [css, font-awesome]
author: iugo
---

最近想在 CSS `::after` 中直接使用 Font Awesome 圖標.

我們可以直接看代碼瞭解如何去使用, 也可以通過 [Font Awesome 官方的文章][0].

具體實現就是:

```css
.need-after::after {
  font-family: "Font Awesome 5 Free";
  content: "\f007";
}
```

其中 content 的值可以直接在 [gallery][1] 中找到.

## 附: CSS 的編碼

這裡順便說一下 CSS 的編碼.

對於一些編程語言來說, 比如 `a` 會使用 `\u0061` 這樣編碼, 其中 u 代表 Unicode.

但 CSS 沒有, 雖然編碼方式也是 UTF, 但儲存方式是固定的 6 個 hex, 比 UTF-32
少了兩個儲存位置. 比如 `a` 在 CSS 中可以寫為 `\000061`.

[0]: https://fontawesome.com/how-to-use/on-the-web/advanced/css-pseudo-elements
[1]: https://fontawesome.com/icons?d=gallery&m=free
