---
title: 使用多设备开发时的技巧
categories: [tools, vscode]
author: iugo
---

多设备开发时, 代码如何同步, 常用偏好如何同步, 怎么方便地进行切换. 这是个课题.

我大概有两种思路:

1. 远程开发机.
2. 编辑器同步设置.

使用远程开发机的做法是最彻底的, 但同时也是存在弊端的. 比如前端开发时使用 8080
端口, 但如果多人使用开发机或者多台开发机所在同一网络, 则会出现冲突.

编辑器同步设置则需要再对多个开发目录进行额外同步, 比如 `.ssh/` 和项目 Git 目录.

以下均以 VS Code 为例.

## 远程开发机

使用 VS Code 扩展 [Remote - SSH][1] 可以更加方便地在远程开发机上进行开发.

## 编辑器同步设置

看到[一篇帖子][2]在问如何在多台设备上同步 VS Code 的设置. 我正有此痛点.

在帖子中看到两种做法:

1. [官方自带][3], 但目前仅限 VS Code Insiders 测试版.
2. 使用扩展.

基于对微软的信任, 有官方的自然用官方的.

VS Code Insiders 的图标是青色的, 可以与 VS Code 同时存在.

Settings Sync 功能使用起来非常简单, 登录然后选择同步就好了.

这里说一下登录, 和 Live 功能类似, 但以前只有微软账号, 现在 (可能和收购有关系?)
还可以选 GitHub 账号. 如果同时有两个平台的账号, 建议还是选择 GitHub,
因为在使用中发现如果登录失败, 当使用 GitHub 时, 可以通过 code 再次进行登录尝试,
程序员更友好一些吧.

[1]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh
[2]: https://www.reddit.com/r/vscode/comments/gyt6ul/is_there_a_way_to_sync_settingsjson_between_two/
[3]: https://code.visualstudio.com/docs/editor/settings-sync
