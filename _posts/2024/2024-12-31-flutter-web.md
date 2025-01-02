---
title: Flutter Web 开发注意事项
author: iugo
date: 2024-12-31
last_modified_at: 2025-01-02 09:54+08:00
---

## 注意事项

1. 为了更好支持 web WebAssembly, 建议 Flutter 版本 >= 3.24.
2. 可以使用 <https://flutterweb-wasm.web.app/> 测试 Flutter Web 的性能.
3. 目前默认使用 canvaskit 渲染, 性能较差. 如果使用 wasm 构建, 则使用 Skwasm 渲染.
4. Safari 17.5, Firefox 133 目前渲染目前会回退到 canvaskit, 性能较差.

## 编译参数

`flutter run` 和 `flutter build web` 命令的参数:

- `--wasm` 使用 wasm 的方式构建
  - 如 `flutter run -d chrome --wasm`
  - 如 `flutter build web --wasm`

## 包

参考 Flutter 文档: <https://docs.flutter.dev/platform-integration/web/renderers>,
开发时不建议使用的包有:

1. `dart:html`, 建议使用 `package:web` 替代. 以使用 WebAssembly 方式构建.
2. `dart:js`, 建议使用 `dart:js_interop` 替代. 以使用 WebAssembly 方式构建.
3. `dart:js_util`, 建议使用 `dart:js_interop` 替代. 以使用 WebAssembly 方式构建.
4. `package:js`, 建议使用 `dart:js_interop` 替代. 以使用 WebAssembly 方式构建.
