# OSI七层模型下四层的数据封装和解封装
osi七层模型的下四层数据封装是了解各个传输协议以及数据传输方式的基础

## OSI七层模型下四层模型
### 传输层
传输层的数据格式为数据报文，主要做的处理是将数据进行分段，然后每个报文的头部会添加报文头信息，包含数据完整性的信息。报文大小由主机的吞吐量，带宽以及一次处理的字节数等限制的。传输层的主要协议有TCP,UDP等。其中TCP的三次握手建立起逻辑通路以后就开始将分好的数据报文，在收到报文以后根据报文头来检查数据的完整性。
### 网络层
网络层的数据格式为数据包，对传输层分装好的数据报文再进行封装。这一步是在报文的头部添加包头，包含一些ip的寻址的信息。在网络层专属的过程中，路由器只对数据包头进行检查，然后进行分组转发。
### 数据链路层
数据链路层的数据格式为数据帧，对路由层的封装好的数据包进行再封装。这一步是在数据包头部添加数据帧的头部信息，主要包含硬件地址寻址等信息。
### 物理层
物理层主要是根据各种协议将数据转换成物理信号进行传输。802协议族，其中802.3是以太网，802.11n是无线局域网（WIFI）。

## OSI数据封装和解封装
### 封装
发送数据, 按照 传输层->网络层->数据链路层 的顺序为数据封装。一般发生在发送发
### 解封装
接受数据, 按照 数据链路层->网络层->传输层 的数据为解封装。一般发生在接收方。中间经过的路由器和交换机一般只会对数据进行检查不会改变数据。
