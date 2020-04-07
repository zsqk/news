# VS Code, Eclipse Theia, Remote Development

## Eclipse Theia

项目: https://github.com/eclipse-theia/theia

说到前后分离可以运行在远端的编辑器甚至工作台, 我第一个想到的就是 VS Code.

如果你在用远程工作台, 不要认为这一定是 VS Code, 即便 UI 看上去很像. 因为这也有可能是: Theia.

Theia 是一个开源项目, 而不是开箱即用的编辑器. 想要试试看可以通过 Gitpod.

## Eclipse Theia 与 VS Code 的区别

Theia 官网说, 自己与 VS Code 最大的不同有三点:

1. 更加模块化与可定制.
2. 专为桌面和远程设计.
3. 独立基金会.

<img width="504" alt="截屏2020-03-29下午9 30 25" src="https://user-images.githubusercontent.com/499364/77850351-82e98880-7204-11ea-9b71-324b7af0e374.png">

不过, 从使用者角度看就一点:

1. VS Code 是开箱即用的工具.
2. Theia 是搭建自有编辑器的基础.

做普通用户, 我们在做远程开发的时候, 还是会选择 VS Code. 但很感谢 Theia 对开源社区的贡献, 我觉得正是有了 Theia 这样的项目, 才鞭策 VS Code 做得更好.

## Remote Development

为什么要用 Remote Development?

经常有远程办公不来办公室的需求(大多数情况不是加班), 如果不是一台笔记本带来带去的,
就会遇到需要在不同机器上安装开发依赖, 拉取项目, 系统配置等一系列问题, 都要做一遍, 很耗时.

如何结合远程服务器来使用 VS Code?

一般来说, 一定会有服务器端与客户端. VS Code 就是我们的客户端了. 那服务器端呢? 怎么安装?

我们无需特别地在服务器端安装什么, 这一些都会在 VS Code 这个客户端中帮我们自动设置好. 当然, SSH 还是需要的.

我们只需要在 VS Code 上安装 https://aka.ms/VSCodeRemoteExtensionPack 插件.

VS Code 这个插件通过 SSH 在服务器上自动安装了服务器端依赖.

前置步骤:

1. 本地安装 VS Code.
2. VS Code 安装 Remote Development 扩展.

步骤如下:

1. 打开 VS Code.
2. 左侧功能导航栏选择 Remote Explorer 图标.  
   <img width="43" alt="截屏2020-03-29下午10 04 26" src="https://user-images.githubusercontent.com/499364/77851062-43716b00-7209-11ea-9253-191b856ac2dd.png">
3. 选择 SSH Targets.  
   <img width="301" alt="截屏2020-03-29下午10 05 28" src="https://user-images.githubusercontent.com/499364/77851097-94815f00-7209-11ea-98ec-f6e32dc7463e.png">
4. 点加号创建一个 SSH.  
   <img width="257" alt="截屏2020-03-29下午10 07 45" src="https://user-images.githubusercontent.com/499364/77851126-d8746400-7209-11ea-9652-78dade3001a7.png">
5. 使用 SSH 登录到服务器, VS Code 会自动安装服务器需要的东西.
6. 结束, 就像本地一样使用远程机器进行开发吧.
