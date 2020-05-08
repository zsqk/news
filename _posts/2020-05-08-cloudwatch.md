## 什么是CloudWatch
Amazon CloudWatch 实时监控您的 Amazon Web Services (AWS) 资源以及您在 AWS 中运行的应用程序。
可以使用 CloudWatch 收集和跟踪指标，这些指标是可衡量的相关资源和应用程序的变量。

## CloudWatch的四大功能
- 指标：从AWS的服务中收集数据放到metrics,然后通过available statistics显示到控制台上
- 警报：通过对指标的判断，可以发出邮件，或执行auto scaling
- 日志：会将lambda/RDS等执行的日志放到log中，方便处理
- 对事件处理的功能：通过EC2实例或其他服务触发，调用到其他的服务，比如调用lambda

## EC2的监控指标
- 可以查看CPU，磁盘，网络等指标，但是没有内存的指标，AWS承诺不会动客户的任何数据，
    也不会在EC2实例上安装任何的插件, 客户可以在市场上找一些流行的性能监控软件取到EC2的内存，
    然后调用cloudwatch的API然后展示到如下监控的指标列表中。

## EC2创建警报
- 可根据各类指标创建警报

## 创建事件
- 可以设置特定的时间或者时间区间，调用一次lamda函数
