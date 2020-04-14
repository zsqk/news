# 备稿: 常见问题处理 npm fetchPackageMetaData error ... Unexpected end of JSON input ...
之前大多数项目都是使用 yarn, 但现在 yarn 正在切换到 berry, 有一些问题. 所以最近的新项目使用了 npm. 没想到, 这么多年过去, 依旧是坑.

---

npm 的确是有效率问题的. 并且有一些低级问题没有进行处理.

效率问题比如依赖之间关系梳理的复杂, 效率低. 具体不展开了, 但实际使用感受已经足够说明问题.
是 Yarn 存在的意义. 同时也是 deno 想要避免的.

这里说一下在国内都可能遇到的问题:

1. 网络原因导致包下载失败.
2. 再次尝试仍然从缓存中拿失败的数据.
3. 如果不清除缓存, 一直无法跳过失败数据.

```text
http fetch GET 304 https://registry.npmjs.org/cssnano-preset-default 982ms (from cache)
silly fetchPackageMetaData error for cssnano-preset-default@^4.0.7 Unexpected end of JSON input while parsing near '...E1piZamJTcxPxUDG/h3FS'
```

其实这里可以增加一个简单的判断, 如果 JSON 化失败, 则判断为网络问题, 不再从缓存中拿数据.

无法单独清除某缓存, 比如 `npm cache clean https://registry.npmjs.org/cssnano-preset-default`.

缓存一致性检查 `npm cache verify` 奇慢.

无奈只好使用 `npm cache clean --force` 清除所有缓存.

想到清除所有缓存后, 随之而来的所有依赖被重新下载, 想想都头疼.

这真是一个太明显并且太严重的问题了. 网上许多 npm 包的 issues 都是因为 npm 的这一问题.

重新安装依赖中, 太慢了... 不过起码能用, 比代理会快点.

可是 Yarn berry 还是许多问题, 比如 https://github.com/yarnpkg/berry/issues/1149.

使用淘宝镜像吧: https://developer.aliyun.com/mirror/NPM

即便使用镜像, 还是挺慢的.
