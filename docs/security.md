# 安全说明

最后检查：2026-08-04

## 本次检查范围

- Web 与 Flutter 源码中的网络请求、动态执行、系统命令、凭据读取和本地存储逻辑
- Node 与 Flutter 的直接、传递依赖
- npm 安装脚本、构建配置和历史遗留启动脚本
- 仓库中曾提交的 EXE/APK 仅做静态内容检查；静态检查不能等同于沙箱运行或完整恶意软件鉴定

## 结论

没有发现密钥窃取、远程命令执行、挖矿、钱包注入、隐蔽上传或动态下载并执行代码等恶意行为。应用运行时不需要后端：Web 数据只写入浏览器 `localStorage`，Flutter 数据只写入应用支持目录。

本次清理移除了以下不必要的风险面：

- 会绕过 PowerShell 执行策略的 Windows 启动脚本
- 下载 Node.js 压缩包但不验证校验和的运行时安装脚本
- 会在生产页面注入第三方推广链接的 Trae 徽标插件
- 指向占位网址的 Flutter 外部隐私链接及其 `url_launcher` 依赖
- 已生成的 EXE、APK、日志、Source Map 和旧构建目录

## 保留的外部连接

应用本身没有 `fetch`、HTTP 客户端或后台上传逻辑。只有 `tools/generate_locale_assets.py` 和 `tools/translate_to_vietnamese.py` 会在开发者主动运行时访问 Google Translate；它们不会被 Web 或 Flutter 应用自动调用。

## 依赖审计例外

`npm audit` 仍会把 `GHSA-qwww-vcr4-c8h2` 记为两个高危条目（`react-router` 与直接依赖 `react-router-dom`）。该公告针对 React Server Components 模式中的服务端 Action；本项目使用 `BrowserRouter` 的纯客户端路由，不包含 RSC、服务端 Action 或 React Router 服务端运行时，因此当前应用不存在公告描述的可利用入口。

当前注册表没有覆盖该版本范围的升级修复；`npm audit --force` 建议回退版本。项目选择保留最新依赖并记录这一不可达例外，避免通过强制回退引入旧版本已修复的问题。发布前仍应重新运行 `npm audit`，在上游发布修复版后立即升级。

## 安装包原则

只信任从当前源码和锁文件重新构建的安装包。若要鉴定历史二进制文件，应额外使用多引擎病毒扫描、签名校验和隔离环境动态分析；本次源码审计不能为来源不明的历史二进制文件提供安全保证。
