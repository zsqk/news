---
title: Ionic 顏色
author: iugo
date: 2024-12-10 12:00:00+08:00
last_modified_at: 2024-12-10 12:00:00+08:00
categories: [web, design, color, ionic]
---

Ionic 顏色的文檔為: [Ionic Colors](https://ionicframework.com/docs/theming/colors).

本文大部分內容都來自文檔.

## 顏色概述

Ionic 共有 9 種顏色:

1. primary (主色, 默認為藍色)
2. secondary (次色, 默認為一種比較近似藍色的顏色)
3. tertiary (三色, 默認為另一種有點近似藍色的顏色)
4. success (成功色, 默認為綠色)
5. warning (警告色, 默認為黃色)
6. danger (危險色, 默認為紅色)
7. light (淺色, 默認為白色)
8. medium (中色, 默認為灰色)
9. dark (深色, 默認為黑色)

每一種顏色都包含四個屬性:

1. base (基礎色)
2. contrast (對比色, 與基礎色形成鮮明對比的顏色, 一般為黑或者白)
3. shade (陰影色, 比基礎色更深一些的顏色)
4. tint (高亮色, 比基礎色更淺一些的顏色)

## 修改自帶的顏色

Ionic 自帶的顏色可以通過修改 CSS 變量來修改.

比如修改 primary 的顏色, 可以修改 `ion-color-primary` 的 CSS 變量.

```css
:root {
  --ion-color-primary: #ff0000;
}
```

## 創建新的自定義顏色

首先名曲新的自定顏色的基礎色, 然後使用[自定義工具]來創建顏色組.

[自定義工具]: https://ionicframework.com/docs/theming/colors#new-color-creator

> :bulb: 如果不想要使用自定義工具, 也可以直接自己自定義顏色.

然後以 `.ion-color-{COLOR}` 為類名, 來使用新的顏色組. 如:

```css
:root {
  --ion-color-brand-main: #69987b;
  --ion-color-brand-main-rgb: 105, 152, 123;
  --ion-color-brand-main-contrast: #000000;
  --ion-color-brand-main-contrast-rgb: 0, 0, 0;
  --ion-color-brand-main-shade: #5c866c;
  --ion-color-brand-main-tint: #78a288;
}

.ion-color-brand-main {
  --ion-color-base: var(--ion-color-brand-main);
  --ion-color-base-rgb: var(--ion-color-brand-main-rgb);
  --ion-color-contrast: var(--ion-color-brand-main-contrast);
  --ion-color-contrast-rgb: var(--ion-color-brand-main-contrast-rgb);
  --ion-color-shade: var(--ion-color-brand-main-shade);
  --ion-color-tint: var(--ion-color-brand-main-tint);
}
```
