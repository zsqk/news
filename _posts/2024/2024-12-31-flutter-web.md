---
title: Flutter Web 開發注意事項
author: iugo
date: 2024-12-31
last_modified_at: 2025-01-02 09:54+08:00
---

## 注意事項

1. 為了更好支持 web WebAssembly, 建議 Flutter 版本 >= 3.24.
2. 可以使用 <https://flutterweb-wasm.web.app/> 測試 Flutter Web 的性能.
3. 目前默認使用 canvaskit 渲染, 性能較差. 如果使用 wasm 構建, 則使用 Skwasm 渲染.
4. Safari 17.5, Firefox 133 目前渲染目前會回退到 canvaskit, 性能較差.

## 編譯參數

`flutter run` 和 `flutter build web` 命令的參數:

- `--wasm` 使用 wasm 的方式構建
  - 如 `flutter run -d chrome --wasm`
  - 如 `flutter build web --wasm`

## 包

參考 Flutter 文檔: <https://docs.flutter.dev/platform-integration/web/renderers>,
開發時不建議使用的包有:

1. `dart:html`, 建議使用 `package:web` 替代. 以使用 WebAssembly 方式構建.
2. `dart:js`, 建議使用 `dart:js_interop` 替代. 以使用 WebAssembly 方式構建.
3. `dart:js_util`, 建議使用 `dart:js_interop` 替代. 以使用 WebAssembly 方式構建.
4. `package:js`, 建議使用 `dart:js_interop` 替代. 以使用 WebAssembly 方式構建.
