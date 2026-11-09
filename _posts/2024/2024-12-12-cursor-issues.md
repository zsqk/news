---
title: Cursor 使用問題
categories: [tools]
author: iugo
date: 2024-12-12
last_modified_at: 2024-12-13 11:05+08:00
---

<details lang="zh" open>
<summary>中文版本</summary>
<div markdown="1">

對於中國國內開發者來說, Cursor 尤其好用. 因為通過 Cursor 可以使用多種大語言模型,
並且可以避免自己直接訂閱導致封號等風險.

但是作為一個文本編輯器, 雖然集成自 VS Code, 但 Cursor 仍有許多基礎功能沒做好:

1. 同一用戶多設備的配置數據同步.
2. 第三方軟件集成 (如 Fork).
3. macOS 下將 Find 文件或文件夾拖拽到 icon 打開 (系統集成).

許多開發者都有多臺開發設備, 大多數開發者希望在多臺設備上擁有較為一致的開發體驗.
VS Code 在這方面做的就很好. 但是 Cursor 無法在統一用戶的多臺設備上進行配置數據的同步,
擴展也需要分別安裝.

在第三方軟件集成度上, Cursor 也有問題. 以 Fork 為例, 雖然不知道問題是在 Fork 還是在 Cursor 上,
但用戶體驗上的確不夠, 還不如 Zed. 以前 Open in 都不支持 Cursor, 現在 Reveal Line 還是不支持.

在 Mac 上不支持將文件夾拖轉到 icon 上打開. (以前連文件拖拽打開都不支持)

Cursor 還需要把編輯器本身的工作做好啊.

</div>
</details>

<details lang="en">
<summary>English Version</summary>
<div markdown="1">

For developers in China, Cursor is particularly useful because it provides access
to various large language models while avoiding the risks of direct subscription
that might lead to account suspension.

However, as a text editor, despite being based on VS Code, Cursor still lacks
several basic features:

1. Configuration data synchronization across multiple devices for the same user.
2. Third-party software integration (such as Fork).
3. Opening files/folders by dragging them onto the icon on macOS (system integration).

Many developers work with multiple devices, and most prefer to have a consistent
development experience across all their devices. VS Code handles this well.
However, Cursor cannot synchronize configuration data across multiple devices
for the same user, and extensions need to be installed separately on each device.

Regarding third-party software integration, Cursor has issues. Taking Fork as an
example, regardless of whether the problem lies with Fork or Cursor, the user
experience is inadequate and inferior to Zed. Previously, "Open in" didn't support
Cursor, and "Reveal Line" still doesn't work.

On Mac, it doesn't support opening folders by dragging them onto the icon.
(Previously, it didn't even support opening files by dragging)

Cursor needs to improve its core editor functionality.

</div>
</details>
