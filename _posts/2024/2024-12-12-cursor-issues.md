---
title: Cursor 使用问题
categories: [tools]
author: iugo
date: 2024-12-12
last_modified_at: 2024-12-13 11:05+08:00
---

<details lang="zh" open>
<summary>中文版本</summary>

对于中国国内开发者来说, Cursor 尤其好用. 因为通过 Cursor 可以使用多种大语言模型,
并且可以避免自己直接订阅导致封号等风险.

但是作为一个文本编辑器, 虽然集成自 VS Code, 但 Cursor 仍有许多基础功能没做好:

1. 同一用户多设备的配置数据同步.
2. 第三方软件集成 (如 Fork).
3. macOS 下将 Find 文件或文件夹拖拽到 icon 打开 (系统集成).

许多开发者都有多台开发设备, 大多数开发者希望在多台设备上拥有较为一致的开发体验.
VS Code 在这方面做的就很好. 但是 Cursor 无法在统一用户的多台设备上进行配置数据的同步,
扩展也需要分别安装.

在第三方软件集成度上, Cursor 也有问题. 以 Fork 为例, 虽然不知道问题是在 Fork 还是在 Cursor 上,
但用户体验上的确不够, 还不如 Zed. 以前 Open in 都不支持 Cursor, 现在 Reveal Line 还是不支持.

在 Mac 上不支持将文件夹拖转到 icon 上打开. (以前连文件拖拽打开都不支持)

Cursor 还需要把编辑器本身的工作做好啊.

</details>

<details lang="en">
<summary>English Version</summary>

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

</details>
