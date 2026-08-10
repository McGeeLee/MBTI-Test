# MBTI Master

一个离线优先、支持五种语言的 MBTI 性格测试项目，包含 React Web 应用和 Flutter 移动应用。

> 本项目是用于学习与自我探索的非官方工具，不属于 MBTI® 官方量表，结果不能代替专业评估。

## 来源与改造

本仓库基于 [mrdee0428-star/MBTI-Test](https://github.com/mrdee0428-star/MBTI-Test) 整理和二次开发，保留原始 Git 提交历史以明确来源。本版本主要完成目录重构、依赖与安全清理、共享题库规范化、响应式布局修复，以及 Web 与 Flutter 测试完善。

## 功能

- 快速版（28 题）、标准版（93 题）和完整版（200 题）
- 简体中文、英语、日语、韩语和越南语
- 本地保存测试进度与历史记录
- E/I、S/N、T/F、J/P 四维结果分析
- Web、Android 和 iOS 共用同一套规范化题库
- 无广告、无需登录、没有服务端数据上传

## 项目结构

```text
apps/
├── web/                 React + TypeScript + Vite
└── mobile/              Flutter（Android + iOS）
shared/data/
├── source/              中文原始题库与人格资料
└── locales/             五语言规范数据
tools/                   数据同步、翻译和品牌资源脚本
docs/                    设计与题库参考资料
```

Flutter 资产目录中的 JSON 是 `shared/data/locales/` 的构建副本。修改规范数据后运行 `npm run sync:data`，`npm run verify` 会检查两份数据是否一致。

## Web 开发

要求 Node.js 26.7.0（仓库中的 `.node-version` 会固定 Cloudflare Pages 和本地版本）。

```bash
npm ci
npm run dev
```

完整验证：

```bash
npm run verify
```

该命令会检查共享数据、TypeScript、ESLint、单元测试和生产构建。

## Cloudflare Pages 部署

Web 应用已按 Cloudflare Pages 的 Git 集成方式配置。Pages 项目使用以下构建参数：

| 设置 | 值 |
| --- | --- |
| 生产分支 | `main` |
| 根目录 | `/`（仓库根目录） |
| 构建命令 | `npm run build` |
| 构建输出目录 | `apps/web/dist` |
| 构建系统 | v3 |

Vite 会将 `apps/web/public/_headers` 复制到构建产物，供 Pages 添加安全响应头并长期缓存带哈希的静态资源。项目没有生成顶层 `404.html`，因此 Pages 会按其 SPA 默认行为把深层路由交给 React Router。

推送到 `main` 后会自动发布生产版本；其他分支和仓库内 Pull Request 会生成独立预览部署。

## Flutter 开发

```bash
cd apps/mobile
flutter pub get
flutter test
flutter run
```

生成 Android 安装包：

```bash
cd apps/mobile
flutter build apk --release
```

签名文件、APK、AAB、日志和其他构建产物不会提交到源码仓库。

## 数据维护

同步规范数据到 Flutter：

```bash
npm run sync:data
```

翻译生成脚本位于 `tools/`。这些脚本只有在开发者主动运行时才会访问 Google Translate；应用本身不会上传题目或用户测试结果。

## 安全说明

- 不包含动态代码执行、远程命令或后台上传逻辑
- Web 数据保存在浏览器 `localStorage`
- 移动端数据保存在应用支持目录
- 生产构建不包含第三方推广徽标或隐藏 Source Map
- 请通过源码构建安装包，不要从源码目录运行来历不明的 EXE/APK

详细的审计范围、外部连接点与依赖例外见 [docs/security.md](docs/security.md)。
