---
title: Ionic 颜色
author: iugo
date: 2024-12-10 12:00:00+08:00
last_modified_at: 2024-12-10 12:00:00+08:00
categories: [web, design, color, ionic]
---

Ionic 颜色的文档为: [Ionic Colors](https://ionicframework.com/docs/theming/colors).

本文大部分内容都来自文档.

## 颜色概述

Ionic 共有 9 种颜色:

1. primary (主色, 默认为蓝色)
2. secondary (次色, 默认为一种比较近似蓝色的颜色)
3. tertiary (三色, 默认为另一种有点近似蓝色的颜色)
4. success (成功色, 默认为绿色)
5. warning (警告色, 默认为黄色)
6. danger (危险色, 默认为红色)
7. light (浅色, 默认为白色)
8. medium (中色, 默认为灰色)
9. dark (深色, 默认为黑色)

每一种颜色都包含四个属性:

1. base (基础色)
2. contrast (对比色, 与基础色形成鲜明对比的颜色, 一般为黑或者白)
3. shade (阴影色, 比基础色更深一些的颜色)
4. tint (高亮色, 比基础色更浅一些的颜色)

## 修改自带的颜色

Ionic 自带的颜色可以通过修改 CSS 变量来修改.

比如修改 primary 的颜色, 可以修改 `ion-color-primary` 的 CSS 变量.

```css
:root {
  --ion-color-primary: #ff0000;
}
```

## 创建新的自定义颜色

首先名曲新的自定颜色的基础色, 然后使用[自定义工具]来创建颜色组.

[自定义工具]: https://ionicframework.com/docs/theming/colors#new-color-creator

> :bulb: 如果不想要使用自定义工具, 也可以直接自己自定义颜色.

然后以 `.ion-color-{COLOR}` 为类名, 来使用新的颜色组. 如:

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
