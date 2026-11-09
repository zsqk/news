# 常見問題處理 npm fetchPackageMetaData error ... Unexpected end of JSON input ...
之前大多數項目都是使用 yarn, 但現在 yarn 正在切換到 berry, 有一些問題. 所以最近的新項目使用了 npm. 沒想到, 這麼多年過去, 依舊是坑.

---

npm 的確是有效率問題的. 並且有一些低級問題沒有進行處理.

效率問題比如依賴之間關係梳理的複雜, 效率低. 具體不展開了, 但實際使用感受已經足夠說明問題.
是 Yarn 存在的意義. 同時也是 deno 想要避免的.

這裡說一下在國內都可能遇到的問題:

1. 網絡原因導致包下載失敗.
2. 再次嘗試仍然從緩存中拿失敗的數據.
3. 如果不清除緩存, 一直無法跳過失敗數據.

```text
http fetch GET 304 https://registry.npmjs.org/cssnano-preset-default 982ms (from cache)
silly fetchPackageMetaData error for cssnano-preset-default@^4.0.7 Unexpected end of JSON input while parsing near '...E1piZamJTcxPxUDG/h3FS'
```

其實這裡可以增加一個簡單的判斷, 如果 JSON 化失敗, 則判斷為網絡問題, 不再從緩存中拿數據.

無法單獨清除某緩存, 比如 `npm cache clean https://registry.npmjs.org/cssnano-preset-default`.

緩存一致性檢查 `npm cache verify` 奇慢.

無奈只好使用 `npm cache clean --force` 清除所有緩存.

想到清除所有緩存後, 隨之而來的所有依賴被重新下載, 想想都頭疼.

這真是一個太明顯並且太嚴重的問題了. 網上許多 npm 包的 issues 都是因為 npm 的這一問題.

重新安裝依賴中, 太慢了... 不過起碼能用, 比代理會快點.

可是 Yarn berry 還是許多問題, 比如 https://github.com/yarnpkg/berry/issues/1149.

使用淘寶鏡像吧: https://developer.aliyun.com/mirror/NPM

即便使用鏡像, 還是挺慢的.
