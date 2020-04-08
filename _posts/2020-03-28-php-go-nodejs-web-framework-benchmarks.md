---
title: PHP, Go, Node.js 框架性能综合对比
categories: [programming-language]
---

## 数据来源

<https://www.techempower.com/benchmarks/#section=data-r18&hw=cl&test=query>

## 分析的指标

- JSON serialization 序列化响应
- Plaintext 简单响应
- Single query 单行查询
- Multiple queries 多行查询
- Data updates 数据更新

## 分析的对象

考虑的几种方案:

- Node.js (函数计算)
- Go (单机部署)

这里的单机部署并非只有一台机器, 只是区别于 网关 + 函数计算 的方式.

具体应用:

- echo (Go)
- go-pgx-easyjson
- nodejs-postgres (ORM)
- php (nginx)
- php-pgsql-raw (nginx)
- lumen (nginx, ORM, MySQL)

没有看到 PHP + PostgreSQL 的组合.

与 Golang 组合的基本都是 PostgreSQL.

## 分析概览

- Rust 非常快, 甚至超过 C 与 C++.
- Java 也很快, 但我不知道这些框架流行程度.
- 原生 PHP 整体并不慢, 但结合框架就慢了.
- Go 数据请求的处理性能比 Node.js 更快.
- 虽然显示 Go 的性能是 Node.js 的 3 倍以上, 但慢一部分出在 ORM 上.
- 原生写 Go 与使用 echo 性能基本一致.

## 分析细节

### JSON serialization 序列化响应

不涉及具体数据库.

Framework | Performance
--- | ---
echo | 32.8%
go | 31.9%
go-pgx-easyjson | 31.4%
nodejs | 23.6%
php | 12.5%
lumen | 1.1%

### Plaintext 简单响应

不涉及具体数据库.

Framework | Performance
--- | ---
fasthttp | 65.3%
nodejs | 7.9%
go | 6.4%
echo | 5.2%
lumen | 0.1%

Go 在这个环节比 Node.js 慢有点出乎意料,
但换用 fasthttp 第三方库还是一骑绝尘的.

一般来说, 这种简单响应的应用场景主要是 HTTP OPTIONS method.
但在函数计算中, 可以由网关响应该请求以节省运行开支.

### Single query 单行查询

Framework | Performance
--- | ---
echo | 46.2%
go-pgx-easyjson | 43.1%
nodejs-postgres | 13.8%
php-pgsql-raw | 13.8%
lumen | 1.5%

### Multiple queries 多行查询

Framework | Performance
--- | ---
go-pgx-easyjson | 47.8%
echo | 44.3%
php-pgsql-raw  | 30.0%
nodejs-postgres | 14.4%
lumen | 8.1%

### Data updates 数据更新

Framework | Performance
--- | ---
go-pgx-easyjson | 35.4%
echo | 31.8%
php-pgsql-raw | 20.4%
nodejs-postgres | 8.2%
lumen | 6.9%

## 总结

如果单机部署, 使用 echo 作为基础是一个好的方案, 良好的社区支持, 简单易用.

如果使用了 echo, 就不考虑 fasthttp 了. 虽然在 v2 中支持过 fasthttp,
但在 <https://github.com/labstack/echo/issues/665> 中,
echo 作者解释了为什么放弃, 保持简单及社区兼容, 也就是尽量使用标准库.

如果函数计算, 那么 Node.js 也是不错的选择, 可以接受的性能, 与前端通用的语法.

从以上的性能测试来看, PHP 本身的性能问题不大, 但标准库太过老旧,
必须使用框架才能提高开发效率. 但普通框架导致性能极具下降. 并且因为历史原因,
PHP 配合 Nginx 才能高效完成网络任务, 单机部署步骤更多.
