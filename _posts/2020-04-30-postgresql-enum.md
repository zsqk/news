# 关于使用 PostgreSQL 的 ENUM 类型

数据库版本 v9.6

## 数据库中枚举值的作用

1. 约束数据.
2. 更加语义化.

在数据库中使用枚举值只是在数据层面确保数据正确的做法, 不能替代程序中的逻辑.

程序中应该做足够的判断, 尽量确保数据库中不会出现因枚举值不匹配导致的问题.

## 关于枚举值的使用

例如:

`CREATE TYPE abc AS ENUM ('a', 'b', 'c');`

虽然在向数据库中写数据时, 我们是将 `'a'` 写入到数据库中, 但实际数据库储存的是
`abc[1]` 这样的数据.

## 关于枚举值的查询

如何查询目前数据库中已经有的枚举值是哪些.

可以参考 [Stack Overflow 上的回答][1], 效率还是比较高的, 基本 10ms 以内.

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

## 关于枚举值的修改

1. 支持添加新值.
2. 支持修改原值.
3. 不支持删除原值.

虽然文档说支持向后添加新值, 但实际可以加在任何地方.

虽然文档写不支持修改排序, 但可以通过修改 `enumsortorder` 来完成重排序. 并且排序
支持浮点数, 比如当执行 `ALTER TYPE abc ADD VALUE a- BEFORE b` 时,
会将新插入值的排序改为浮点数, 如 `1.5`.

关于如何修改枚举值, 直接 `UPDATE pg_enum` 就可以了.

能否直接修改原值的排序呢? 实测是没问题的, 不会影响表中使用到该类型的数据.
