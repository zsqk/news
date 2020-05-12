---
title: Headless Brower
slug: Headless Brower
categories: [DevTools, Chrome]
author: kouler
---

## Headless Brower
`Headless Brower` 直译为中文是无头浏览器。其中的无头是指没有图形界面的意思。也就是通过代码来控制与浏览器的交互。比如捕获页面内容加载完成事件，执行按钮的点击事件，执行键盘输入，表单提交等。

## Headless Chrome
从 `Chrome 59` 版本开始，Chrome 浏览器加入了 `Headless` 运行模式。除了没有图形界面以外，在 Headless 模式下可以实现 Chrome 浏览器的所有功能。

此外，Chrome 团队开发了 Chrome 开发工具协议，简称 `CDP(Chrome DevTools Protocol)`。该协议提供了很多有用的功能 API，比如在 DOM，调试器和网络方面等。Chrome 浏览器中的开发者工具正是使用了该协议实现其功能。

Chrome 开发工具协议使得 Headless Chrome 的功能更加强大。

## Headless Chrome 库
一些第三方代码库提供了更加方便的使用 Headless Chrome 功能的方法。

`Chromedp` 是使用 Golang 语言实现的一种更加简单快速的方式驱动支持 Chrome DevTools 协议浏览器的方式，无需外部依赖。

`Selenium` 是用于测试 Web 应用程序用户界面的常用框架。同时也支持所有基于 Web 的管理任务自动化。支持的语言有 Java，Python，C#，Ruby，Javascript 和 Kotlin。

`puppeteer` 是使用 Node 语言实现的 Web 应用自动化测试工具。是 Google Chrome 团队官方的 Headless Chrome 工具。

## Headless Chrome 库应用场景
- 页面自动化测试    
    可以通过 Headless Chrome 直接测试页面中的内容和交互。而不仅限于代码测试。
- 爬虫    
    对于某些不会直接显示在 HTML 节点中的内容，例如页面成功加载后再通过 AJAX 与后端服务器请求的内容或单页应用，可以使用 Headless Chrome 来获取。
- 保存页面副本    
    可以通过代码自动将需要的页面保存为图片或 PDF 文件

总之，Chrome 浏览器能够实现的功能在 Headless 模式中都可以实现。加入程序使得我们可以实现更多更强大的功能。

## 参考
- [Getting Started with Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [chromedp](https://github.com/chromedp/chromedp)
- [selenium](https://github.com/SeleniumHQ/selenium)
- [puppeteer](https://github.com/puppeteer/puppeteer)
