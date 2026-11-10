---
title: Headless Brower
slug: Headless Brower
categories: [DevTools, Chrome]
author: kouler
---

## Headless Brower
`Headless Brower` 直譯為中文是無頭瀏覽器。其中的無頭是指沒有圖形界面的意思。也就是通過代碼來控制與瀏覽器的交互。比如捕獲頁面內容加載完成事件，執行按鈕的點擊事件，執行鍵盤輸入，表單提交等。

## Headless Chrome
從 `Chrome 59` 版本開始，Chrome 瀏覽器加入了 `Headless` 運行模式。除了沒有圖形界面以外，在 Headless 模式下可以實現 Chrome 瀏覽器的所有功能。

此外，Chrome 團隊開發了 Chrome 開發工具協議，簡稱 `CDP(Chrome DevTools Protocol)`。該協議提供了很多有用的功能 API，比如在 DOM，調試器和網絡方面等。Chrome 瀏覽器中的開發者工具正是使用了該協議實現其功能。

Chrome 開發工具協議使得 Headless Chrome 的功能更加強大。

## Headless Chrome 庫
一些第三方代碼庫提供了更加方便的使用 Headless Chrome 功能的方法。

`Chromedp` 是使用 Golang 語言實現的一種更加簡單快速的方式驅動支持 Chrome DevTools 協議瀏覽器的方式，無需外部依賴。

`Selenium` 是用於測試 Web 應用程序用戶界面的常用框架。同時也支持所有基於 Web 的管理任務自動化。支持的語言有 Java，Python，C#，Ruby，Javascript 和 Kotlin。

`puppeteer` 是使用 Node 語言實現的 Web 應用自動化測試工具。是 Google Chrome 團隊官方的 Headless Chrome 工具。

## Headless Chrome 庫應用場景
- 頁面自動化測試    
    可以通過 Headless Chrome 直接測試頁面中的內容和交互。而不僅限於代碼測試。
- 爬蟲    
    對於某些不會直接顯示在 HTML 節點中的內容，例如頁面成功加載後再通過 AJAX 與後端服務器請求的內容或單頁應用，可以使用 Headless Chrome 來獲取。
- 保存頁面副本    
    可以通過代碼自動將需要的頁面保存為圖片或 PDF 文件

總之，Chrome 瀏覽器能夠實現的功能在 Headless 模式中都可以實現。加入程序使得我們可以實現更多更強大的功能。

## 參考
- [Getting Started with Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [chromedp](https://github.com/chromedp/chromedp)
- [selenium](https://github.com/SeleniumHQ/selenium)
- [puppeteer](https://github.com/puppeteer/puppeteer)
