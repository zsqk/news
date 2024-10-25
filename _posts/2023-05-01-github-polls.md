---
title: GitHub 投票设计
categories: [GitHub, design]
---

## GitHub 投票

GitHub 的投票功能位于 Discussions 中, 有一个分类叫作 Polls.

Polls 有基础的投票功能, 但不是表单那种复杂设计.

如果想要自定义分类也可以, 只需要将分类的 Discussion Format 设置为 Poll 即可.
但有两个限制:

1. 已经设置为 Poll 的分类不能修改.
2. 其他分类不能改为 Poll 分类.

所以基本只能在创建分类的时候就选好 Poll 格式.

## GitHub 的投票相比钉钉/飞书群投票功能区别

1. GitHub 仅支持不投票即可查看结果功能.
2. GitHub 不支持不投票则不可查看结果功能.
3. GitHub 仅支持匿名投票.
4. GitHub 不支持查看投票者名单功能.
5. GitHub 不支持设置可投票者名单功能.

## 扩展

2022 年 4 月发布投票功能.
<https://github.blog/changelog/2022-04-12-discussions-polls/>

也有其他人有上文说到的 "支持查看投票者名单功能" 的需求.
<https://github.com/orgs/community/discussions/5650>
