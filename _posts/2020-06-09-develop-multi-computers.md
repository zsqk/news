---
title: 使用多設備開發時的技巧
categories: [tools, vscode]
author: iugo
---

多設備開發時, 代碼如何同步, 常用偏好如何同步, 怎麼方便地進行切換. 這是個課題.

我大概有兩種思路:

1. 遠程開發機.
2. 編輯器同步設置.

使用遠程開發機的做法是最徹底的, 但同時也是存在弊端的. 比如前端開發時使用 8080
端口, 但如果多人使用開發機或者多臺開發機所在同一網絡, 則會出現衝突.

編輯器同步設置則需要再對多個開發目錄進行額外同步, 比如 `.ssh/` 和項目 Git 目錄.

以下均以 VS Code 為例.

## 遠程開發機

使用 VS Code 擴展 [Remote - SSH][1] 可以更加方便地在遠程開發機上進行開發.

## 編輯器同步設置

看到[一篇帖子][2]在問如何在多臺設備上同步 VS Code 的設置. 我正有此痛點.

在帖子中看到兩種做法:

1. [官方自帶][3], 但目前僅限 VS Code Insiders 測試版.
2. 使用擴展.

基於對微軟的信任, 有官方的自然用官方的.

VS Code Insiders 的圖標是青色的, 可以與 VS Code 同時存在.

Settings Sync 功能使用起來非常簡單, 登錄然後選擇同步就好了.

這裡說一下登錄, 和 Live 功能類似, 但以前只有微軟賬號, 現在 (可能和收購有關係?)
還可以選 GitHub 賬號. 如果同時有兩個平臺的賬號, 建議還是選擇 GitHub,
因為在使用中發現如果登錄失敗, 當使用 GitHub 時, 可以通過 code 再次進行登錄嘗試,
程序員更友好一些吧.

[1]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh
[2]: https://www.reddit.com/r/vscode/comments/gyt6ul/is_there_a_way_to_sync_settingsjson_between_two/
[3]: https://code.visualstudio.com/docs/editor/settings-sync
