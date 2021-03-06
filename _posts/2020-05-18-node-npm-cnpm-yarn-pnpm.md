## node依赖管理
- Node的依赖管理工具
- 1. npm 
- 2. cnpm 
- 3. yarn
- 4. pnpm

## npm
- 1. 使用一个名为package.json的文件，用户可以通过npm install --save命令把项目里所有的依赖项保存在这个文件里
- 2. npm安装插件是从国外服务器下载，受网络影响大，可能出现异常

## cnpm
- 1. cnpm跟npm用法完全一致, 服务器在国内, 访问速度很快

## yarn
- 1. yarn是经过重新设计的崭新的npm客户端，它能让开发人员并行处理所有必须的操作，并添加了一些其他改进
- 2. 运行速度得到了显著的提升，整个安装时间也变得更少
- 3. 像npm一样，yarn使用本地缓存。与npm不同的是，yarn无需互联网连接就能安装本地缓存的依赖项，它提供了离线模式。
- 4. 允许合并项目中使用到的所有的包的许可证

## pnpm
- 1. pnpm运行起来非常的快，超过了npm和yarn
- 2. pnpm采用了一种巧妙的方法，利用硬链接和符号链接来避免复制所有本地缓存源文件，这是yarn的最大的性能弱点之一
- 3. pnpm继承了yarn的所有优点，包括离线模式和确定性安装

 引用地址:  https://blog.csdn.net/qq_32614411/article/details/80894605
