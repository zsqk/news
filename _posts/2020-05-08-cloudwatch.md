## 什麼是CloudWatch
Amazon CloudWatch 實時監控您的 Amazon Web Services (AWS) 資源以及您在 AWS 中運行的應用程序。
可以使用 CloudWatch 收集和跟蹤指標，這些指標是可衡量的相關資源和應用程序的變量。

## CloudWatch的四大功能
- 指標：從AWS的服務中收集數據放到metrics,然後通過available statistics顯示到控制台上
- 警報：通過對指標的判斷，可以發出郵件，或執行auto scaling
- 日誌：會將lambda/RDS等執行的日誌放到log中，方便處理
- 對事件處理的功能：通過EC2實例或其他服務觸發，調用到其他的服務，比如調用lambda

## EC2的監控指標
- 可以查看CPU，磁盤，網絡等指標，但是沒有內存的指標，AWS承諾不會動客戶的任何數據，
    也不會在EC2實例上安裝任何的插件, 客戶可以在市場上找一些流行的性能監控軟件取到EC2的內存，
    然後調用cloudwatch的API然後展示到如下監控的指標列表中。

## EC2創建警報
- 可根據各類指標創建警報

## 創建事件
- 可以設置特定的時間或者時間區間，調用一次lamda函數
