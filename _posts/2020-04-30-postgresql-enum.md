---
title: 關於使用 PostgreSQL 的 ENUM 類型
categories: [postgresql]
author: iugo
---

數據庫版本 v9.6

## 數據庫中枚舉值的作用

1. 約束數據.
2. 更加語義化.

在數據庫中使用枚舉值只是在數據層面確保數據正確的做法, 不能替代程序中的邏輯.

程序中應該做足夠的判斷, 儘量確保數據庫中不會出現因枚舉值不匹配導致的問題.

## 關於枚舉值的使用

例如:

`CREATE TYPE abc AS ENUM ('a', 'b', 'c');`

雖然在向數據庫中寫數據時, 我們是將 `'a'` 寫入到數據庫中, 但實際數據庫儲存的是
`abc[1]` 這樣的數據.

## 關於枚舉值的查詢

如何查詢目前數據庫中已經有的枚舉值是哪些.

可以參考 [Stack Overflow 上的回答][1], 效率還是比較高的, 基本 10ms 以內.

```sql
SELECT
  n.nspname AS enum_schema,
  t.typname AS enum_name,
  t.oid AS enum_id,
  e.enumlabel AS enum_value
FROM
  pg_type t
  JOIN pg_enum e ON t.oid = e.enumtypid
  JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
ORDER BY
  enum_name,
  e.enumsortorder;
```

[1]: https://stackoverflow.com/questions/9540681/list-postgres-enum-type

## 關於枚舉值的修改

1. 支持添加新值.
2. 支持修改原值.
3. 不支持刪除原值.

雖然文檔說支持向後添加新值, 但實際可以加在任何地方.

雖然文檔寫不支持修改排序, 但可以通過修改 `enumsortorder` 來完成重排序. 並且排序
支持浮點數, 比如當執行 `ALTER TYPE abc ADD VALUE a- BEFORE b` 時,
會將新插入值的排序改為浮點數, 如 `1.5`.

關於如何修改枚舉值, 直接 `UPDATE pg_enum` 就可以了.

能否直接修改原值的排序呢? 實測是沒問題的, 不會影響表中使用到該類型的數據.
