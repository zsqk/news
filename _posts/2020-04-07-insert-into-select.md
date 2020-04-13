# Insert into select语句用法提示
## 业务场景
将表A的数据迁移到表B中去做一个备份。本想通过程序先查询查出来然后批量插入，但觉得这样有点慢，需要耗费大量的网络I/O，查资料后决定采取sql insert into select语句实现，这样就可以避免使用网络I/O，直接使用SQL依靠数据库I/O完成。
## 执行解析
在默认的事务隔离级别下：insert into B select * from A 加锁规则是：B表锁，A逐步锁（扫描一个锁一个）。
通过观察迁移sql的执行情况你会发现A是全表扫描，也就意味着在执行insert into select from 语句时，mysql会从上到下扫描A内的记录并且加锁，这样一来就和直接锁表是一样了。
由于查询条件会导致A全表扫描，那么什么能避免全表扫描呢，给查询条件字段添加一个索引就可以了，由于走索引查询，就不会出现扫描全表的情况而锁表了，只会锁定符合条件的记录。
## 总结
使用insert into tableB select * from tableA语句时，一定要确保tableA后面的where，order或者其他条件，都需要有对应的索引，来避免出现tableA全部记录被锁定的情况。
