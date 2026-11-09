# Insert into select語句用法提示
## 業務場景
將表A的數據遷移到表B中去做一個備份。本想通過程序先查詢查出來然後批量插入，但覺得這樣有點慢，需要耗費大量的網絡I/O，查資料後決定採取sql insert into select語句實現，這樣就可以避免使用網絡I/O，直接使用SQL依靠數據庫I/O完成。
## 執行解析
在默認的事務隔離級別下：insert into B select * from A 加鎖規則是：B表鎖，A逐步鎖（掃描一個鎖一個）。
通過觀察遷移sql的執行情況你會發現A是全表掃描，也就意味著在執行insert into select from 語句時，mysql會從上到下掃描A內的記錄並且加鎖，這樣一來就和直接鎖表是一樣了。
由於查詢條件會導致A全表掃描，那麼什麼能避免全表掃描呢，給查詢條件字段添加一個索引就可以了，由於走索引查詢，就不會出現掃描全表的情況而鎖表了，只會鎖定符合條件的記錄。
## 總結
使用insert into tableB select * from tableA語句時，一定要確保tableA後面的where，order或者其他條件，都需要有對應的索引，來避免出現tableA全部記錄被鎖定的情況。
