---
title: VS Code, Eclipse Theia, Remote Development
categories: [tools, vscode]
---

## Eclipse Theia

項目: <https://github.com/eclipse-theia/theia>

說到前後分離可以運行在遠端的編輯器甚至工作臺, 我第一個想到的就是 VS Code.

如果你在用遠程工作臺, 不要認為這一定是 VS Code, 即便 UI 看上去很像. 因為這也有可能是: Theia.

Theia 是一個開源項目, 而不是開箱即用的編輯器. 想要試試看可以通過 Gitpod.

## Eclipse Theia 與 VS Code 的區別

Theia 官網說, 自己與 VS Code 最大的不同有三點:

1. 更加模塊化與可定製.
2. 專為桌面和遠程設計.
3. 獨立基金會.

<img width="504" alt="截屏2020-03-29下午9 30 25" src="https://user-images.githubusercontent.com/499364/77850351-82e98880-7204-11ea-9b71-324b7af0e374.png">

不過, 從使用者角度看就一點:

1. VS Code 是開箱即用的工具.
2. Theia 是搭建自有編輯器的基礎.

做普通用戶, 我們在做遠程開發的時候, 還是會選擇 VS Code. 但很感謝 Theia 對開源社區的貢獻, 我覺得正是有了 Theia 這樣的項目, 才鞭策 VS Code 做得更好.

## Remote Development

為什麼要用 Remote Development?

經常有遠程辦公不來辦公室的需求(大多數情況不是加班), 如果不是一臺筆記本帶來帶去的,
就會遇到需要在不同機器上安裝開發依賴, 拉取項目, 系統配置等一系列問題, 都要做一遍, 很耗時.

如何結合遠程服務器來使用 VS Code?

一般來說, 一定會有服務器端與客戶端. VS Code 就是我們的客戶端了. 那服務器端呢? 怎麼安裝?

我們無需特別地在服務器端安裝什麼, 這一些都會在 VS Code 這個客戶端中幫我們自動設置好. 當然, SSH 還是需要的.

我們只需要在 VS Code 上安裝 <https://aka.ms/VSCodeRemoteExtensionPack> 插件.

VS Code 這個插件通過 SSH 在服務器上自動安裝了服務器端依賴.

前置步驟:

1. 本地安裝 VS Code.
2. VS Code 安裝 Remote Development 擴展.

步驟如下:

1. 打開 VS Code.
2. 左側功能導航欄選擇 Remote Explorer 圖標.  
   <img width="43" alt="截屏2020-03-29下午10 04 26" src="https://user-images.githubusercontent.com/499364/77851062-43716b00-7209-11ea-9253-191b856ac2dd.png">
3. 選擇 SSH Targets.  
   <img width="301" alt="截屏2020-03-29下午10 05 28" src="https://user-images.githubusercontent.com/499364/77851097-94815f00-7209-11ea-98ec-f6e32dc7463e.png">
4. 點加號創建一個 SSH.  
   <img width="257" alt="截屏2020-03-29下午10 07 45" src="https://user-images.githubusercontent.com/499364/77851126-d8746400-7209-11ea-9652-78dade3001a7.png">
5. 使用 SSH 登錄到服務器, VS Code 會自動安裝服務器需要的東西.
6. 結束, 就像本地一樣使用遠程機器進行開發吧.
