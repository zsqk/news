---
title: PHP, Go, Node.js 框架性能綜合對比
categories: [programming-language]
---

## 數據來源

<https://www.techempower.com/benchmarks/#section=data-r18&hw=cl&test=query>

## 分析的指標

- JSON serialization 序列化響應
- Plaintext 簡單響應
- Single query 單行查詢
- Multiple queries 多行查詢
- Data updates 數據更新

## 分析的對象

考慮的幾種方案:

- Node.js (函數計算)
- Go (單機部署)

這裡的單機部署並非只有一臺機器, 只是區別於 網關 + 函數計算 的方式.

具體應用:

- echo (Go)
- go-pgx-easyjson
- nodejs-postgres (ORM)
- php (nginx)
- php-pgsql-raw (nginx)
- lumen (nginx, ORM, MySQL)

沒有看到 PHP + PostgreSQL 的組合.

與 Golang 組合的基本都是 PostgreSQL.

## 分析概覽

- Rust 非常快, 甚至超過 C 與 C++.
- Java 也很快, 但我不知道這些框架流行程度.
- 原生 PHP 整體並不慢, 但結合框架就慢了.
- Go 數據請求的處理性能比 Node.js 更快.
- 雖然顯示 Go 的性能是 Node.js 的 3 倍以上, 但慢一部分出在 ORM 上.
- 原生寫 Go 與使用 echo 性能基本一致.

## 分析細節

### JSON serialization 序列化響應

不涉及具體數據庫.

Framework | Performance
--- | ---
echo | 32.8%
go | 31.9%
go-pgx-easyjson | 31.4%
nodejs | 23.6%
php | 12.5%
lumen | 1.1%

### Plaintext 簡單響應

不涉及具體數據庫.

Framework | Performance
--- | ---
fasthttp | 65.3%
nodejs | 7.9%
go | 6.4%
echo | 5.2%
lumen | 0.1%

Go 在這個環節比 Node.js 慢有點出乎意料,
但換用 fasthttp 第三方庫還是一騎絕塵的.

一般來說, 這種簡單響應的應用場景主要是 HTTP OPTIONS method.
但在函數計算中, 可以由網關響應該請求以節省運行開支.

### Single query 單行查詢

Framework | Performance
--- | ---
echo | 46.2%
go-pgx-easyjson | 43.1%
nodejs-postgres | 13.8%
php-pgsql-raw | 13.8%
lumen | 1.5%

### Multiple queries 多行查詢

Framework | Performance
--- | ---
go-pgx-easyjson | 47.8%
echo | 44.3%
php-pgsql-raw  | 30.0%
nodejs-postgres | 14.4%
lumen | 8.1%

### Data updates 數據更新

Framework | Performance
--- | ---
go-pgx-easyjson | 35.4%
echo | 31.8%
php-pgsql-raw | 20.4%
nodejs-postgres | 8.2%
lumen | 6.9%

## 總結

如果單機部署, 使用 echo 作為基礎是一個好的方案, 良好的社區支持, 簡單易用.

如果使用了 echo, 就不考慮 fasthttp 了. 雖然在 v2 中支持過 fasthttp,
但在 <https://github.com/labstack/echo/issues/665> 中,
echo 作者解釋了為什麼放棄, 保持簡單及社區兼容, 也就是儘量使用標準庫.

如果函數計算, 那麼 Node.js 也是不錯的選擇, 可以接受的性能, 與前端通用的語法.

從以上的性能測試來看, PHP 本身的性能問題不大, 但標準庫太過老舊,
必須使用框架才能提高開發效率. 但普通框架導致性能極具下降. 並且因為歷史原因,
PHP 配合 Nginx 才能高效完成網絡任務, 單機部署步驟更多.
