# MBTI Master Mobile

Flutter 移动应用，仅维护 Android 与 iOS 平台。

## 目录

```text
lib/
├── main.dart            应用入口
└── src/
    ├── app.dart         主题、语言与应用状态
    ├── screens/         页面
    ├── repository.dart  题库读取
    ├── test_engine.dart 计分逻辑
    ├── storage.dart     本地持久化
    └── models.dart      数据模型
assets/
├── data/                从 shared/data/locales 同步的 JSON
├── fonts/               应用字体
└── branding/            图标与启动图
android/                 Android 原生工程
ios/                     iOS 原生工程
test/                    Flutter 测试
```

## 验证

从仓库根目录先检查共享数据：

```bash
npm run check:data
```

再运行 Flutter 检查：

```bash
cd apps/mobile
flutter analyze
flutter test
```

本应用离线运行，不展示广告，也不需要登录。
