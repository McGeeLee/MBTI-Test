# Kế hoạch Review Source Code — Mobile App (Android & iOS)

> Mục tiêu: đưa app Flutter MBTI đạt mức **product-ready** và **qua kiểm duyệt** Google Play + Apple App Store, chạy ổn định trên cả Android và iOS.

- **Dự án:** `mobile_app/` (Flutter, Dart SDK `^3.11.3`)
- **Loại app:** Trắc nghiệm tính cách MBTI, đa ngôn ngữ (vi/en/ko/ja/zh), kiếm tiền bằng rewarded ads (AdMob)
- **Ngày lập:** 2026-05-31
- **Flutter SDK máy dev:** `C:\Users\mrdee\tools\flutter`

---

## 1. Phương pháp review (6 tầng)

| # | Tầng | Trọng tâm |
|---|------|-----------|
| 1 | Build & Dependency | pubspec, gradle, xcode, biên dịch release 2 OS |
| 2 | Cấu hình nền tảng & store | manifest, Info.plist, app id, tên, icon, splash, signing |
| 3 | Privacy & tuân thủ chính sách | ATT, SKAdNetwork, AdMob, Data Safety, Privacy Policy |
| 4 | Kiến trúc & chất lượng code | state, async, lỗi, lint |
| 5 | UX/UI & a11y & localization | responsive 2 OS, safe area, tương phản, đa ngôn ngữ |
| 6 | Kiểm thử & ổn định | test logic cốt lõi, crash, offline/no-ad-fill |

---

## 2. Phát hiện sơ bộ (đã có bằng chứng từ codebase + `flutter analyze`)

### 🔴 Blocker — chặn build hoặc chắc chắn bị từ chối

| ID | Vấn đề | Bằng chứng | Hành động | Trạng thái |
|----|--------|-----------|-----------|------------|
| B1 | `pubspec.yaml` thiếu các dependency đang được import: `google_mobile_ads`, `path_provider`, `webview_flutter` | `flutter analyze`: `Target of URI doesn't exist: 'package:google_mobile_ads/...'`, `path_provider isn't a dependency`. `pub get` tự gỡ các package này khỏi lock | Thêm lại vào `dependencies` với version pin (`google_mobile_ads`, `path_provider`) và chạy `flutter pub get` | ✅ **Done** — thêm `google_mobile_ads: ^6.0.0`, `path_provider: ^2.1.5`; `webview_flutter` quay lại như transitive |
| B2 | 5 lỗi biên dịch `Undefined name 'strings'` trong `home_screen.dart` (hàm `_openTest`) | `flutter analyze`: `home_screen.dart:108/113/122/136/143 - undefined_identifier` | `strings` được khai báo trong `build()` nhưng dùng ở `_openTest`; cần lấy lại từ `AppScope.of(context).strings` trong `_openTest` | ✅ **Done** — thêm `final strings = AppScope.of(context).strings;` đầu `_openTest` |
| B3 | Android release ký bằng **debug key** | `android/app/build.gradle.kts`: `release { signingConfig = signingConfigs.getByName("debug") }` | Tạo keystore production + `key.properties`, cấu hình `signingConfigs.release` | ✅ **Done (cấu hình)** — `build.gradle.kts` đọc `key.properties`, dùng keystore production khi có, fallback debug khi chưa có. Đã thêm `key.properties.example`. ⚠️ *Cần bạn tạo keystore thật* |
| B4 | Dùng **AdMob ID mẫu** của Google ở production | `AndroidManifest.xml`: `ca-app-pub-3940256099942544~3347511713`; `ad_service.dart` default `_sampleRewarded*` | Thay bằng App ID + Ad Unit ID production thật cho cả Android & iOS | ✅ **Done (cấu hình)** — test ID chỉ dùng ở debug/profile; release lấy prod ID qua `--dart-define` (ad unit) và `-Padmob.appId` (app id). Nếu thiếu prod ID ở release → không hiển thị test ad. ⚠️ *Cần bạn cấp ID thật* |
| B5 | iOS chưa cấu hình AdMob → khả năng **crash khi khởi tạo** `MobileAds` | `ios/Runner/Info.plist` không có `GADApplicationIdentifier` | Thêm `GADApplicationIdentifier` (App ID iOS) vào Info.plist | ✅ **Done** — thêm `GADApplicationIdentifier` (test id mặc định, kèm chú thích thay prod) |

### 🟠 Quan trọng — rủi ro bị từ chối / thiếu chuyên nghiệp

| ID | Vấn đề | Bằng chứng | Hành động |
|----|--------|-----------|-----------|
| H1 | Tên app **không nhất quán** giữa các nơi | Android label `Personality Type`; iOS `CFBundleDisplayName=Mobile App`, `CFBundleName=mobile_app`; pubspec mô tả "Multilingual MBTI" | Thống nhất 1 tên thương mại cho cả 2 OS | ✅ Done — Android label + iOS `CFBundleDisplayName` = **"MBTI Personality"** |
| H2 | iOS thiếu khai báo bắt buộc cho quảng cáo | Info.plist thiếu `SKAdNetworkItems`, `NSUserTrackingUsageDescription` (ATT) | Bổ sung theo yêu cầu của Apple + Google Mobile Ads SDK | ✅ Done — thêm `NSUserTrackingUsageDescription` + 25 `SKAdNetworkItems` |
| H3 | Icon/Splash **chỉ cấu hình cho Android** | `pubspec.yaml`: `flutter_launcher_icons.ios:false`, `flutter_native_splash.ios:false`; nhưng 2 package này cũng không có trong dependencies | Bổ sung cấu hình iOS + thêm `flutter_launcher_icons`, `flutter_native_splash` vào dev_dependencies | ✅ Done — thêm 2 package vào dev_dependencies, bật `ios:true`, chạy generator tạo icon+splash cho cả 2 OS |
| H4 | **Chưa có Privacy Policy** trong app | `about_screen.dart` chỉ có ngôn ngữ + giải thích trục MBTI; không có liên kết chính sách | Thêm màn hình/liên kết Privacy Policy (bắt buộc khi thu thập dữ liệu qua ads) | ✅ Done — thêm card "Quyền riêng tư" (5 ngôn ngữ) + nút mở Privacy Policy qua `url_launcher`; URL cấu hình bằng `--dart-define=PRIVACY_POLICY_URL=...`. ⚠️ Cần URL chính sách thật |
| H5 | Android `targetSdk`/`minSdk` phụ thuộc mặc định Flutter, cần xác nhận đạt mức store | `build.gradle.kts`: `minSdk = flutter.minSdkVersion`, `targetSdk = flutter.targetSdkVersion` | Xác nhận targetSdk ≥ 35 (yêu cầu Play 2025) và minSdk tương thích `google_mobile_ads 6.x` (>=23) | ✅ Done (minSdk) — đặt `minSdk = maxOf(flutter.minSdkVersion, 23)`. ⚠️ targetSdk vẫn theo Flutter default — xác nhận ≥ 35 khi build release cuối |
| H6 | Chưa khai báo permission ads cho Android | Manifest main không có `com.google.android.gms.permission.AD_ID` | Thêm khai báo + hoàn tất Data Safety form | ✅ Done (manifest) — thêm `INTERNET` + `AD_ID`. ⚠️ Data Safety form làm trên Play Console |

### 🟡 Cần xác minh / cải thiện

| ID | Vấn đề | Bằng chứng | Hành động | Trạng thái |
|----|--------|-----------|-----------|------------|
| V1 | Splash chờ **cứng 3 giây** | `app.dart` `SplashGate`: `Future.delayed(Duration(seconds: 3))` | Gắn splash với thời gian load thật, bỏ delay cố định | ✅ Done — data đã load trong `main()` trước `runApp`; giảm còn 1.5s làm intro thương hiệu, đồng bộ thanh tiến trình |
| V2 | Cảnh báo `use_build_context_synchronously` | `home_screen.dart:164` | Kiểm tra `mounted` trước khi dùng context sau await | ✅ Done — thêm `if (!context.mounted) return;` |
| V3 | `unnecessary_underscores` | `ad_service.dart:104` | Dọn theo lint | ✅ Done — dùng wildcard `(_, _)` |
| V4 | Chưa có cấu hình R8/shrink cho release | `build.gradle.kts` thiếu `isMinifyEnabled`/`isShrinkResources` | Cân nhắc bật minify + giữ rule cho ads | ✅ Done — bật `isMinifyEnabled`+`isShrinkResources`, thêm `proguard-rules.pro` (giữ ads + dontwarn Play Core). Verify build release APK thành công (56MB) |
| V5 | Chưa có test cho logic cốt lõi | Thư mục `test/` chưa được rà | Thêm unit test cho `test_engine.dart` (scoring), `storage.dart` | ✅ Done — test cũ đang **fail** (path_provider trong unit test); thêm DI `overrideDirectory` cho `AppStorage`; viết 12 test (scoring/threshold/X, progress persist/resume, access logic). **12/12 pass** |
| V6 | `webview_flutter` xuất hiện trong lock cũ nhưng không thấy import | `pubspec.lock` (trước khi sửa) liệt kê webview như direct | Xác minh có thực sự cần không; nếu không, bỏ | ✅ Done — không có import trong code; là transitive của `google_mobile_ads`, không cần khai báo direct |
| V7 | **ATT khai báo nhưng không gọi API** (iOS) | `Info.plist` có `NSUserTrackingUsageDescription` nhưng grep code: không có `requestTrackingAuthorization` → prompt không bao giờ hiện | Thêm `app_tracking_transparency`, gọi ATT trước khi init ads | ✅ Done — `ad_service.initialize()` gọi `_requestTrackingAuthorization()` (no-op trên Android), verify chạy emulator không crash |
| V8 | **Thiếu UMP/GDPR consent** cho AdMob | Code chưa khởi tạo `ConsentInformation`/`ConsentForm` | Thêm UMP consent flow trong init | ✅ Done — `_gatherConsent()` + `loadAndShowConsentFormIfRequired`; log `UserMessagingPlatform` xác nhận chạy thật trên emulator |
| V9 | **Số câu hỏi hardcode** trong `_VersionCard` (28/93/200) | `home_screen.dart` switch cứng theo version | Lấy động từ repository | ✅ Done — truyền `repository.questionsFor(version).length`; đã kiểm chứng JSON khớp 28/93/200 |

---

## 3. Bộ tiêu chí Pass/Fail theo tầng

### A. Build & Dependency
- [x] `pubspec.yaml` khai báo đủ mọi package được import (B1)
- [x] `flutter pub get` thành công, không có dependency "ngầm"
- [x] `flutter analyze` **0 error** — *No issues found! (đã verify)*
- [x] Build thành công APK debug (`flutter build apk --debug`) — *xác nhận chuỗi biên dịch Dart+Gradle+ads*
- [x] Build thành công APK release (`flutter build apk --release`) — *minify/shrink OK, 56MB (signing fallback debug khi chưa có keystore)*
- [ ] Build `appbundle --release` ký bằng keystore production — *cần bạn tạo keystore (B3)*
- [ ] Build thành công `flutter build ipa --release` (iOS, cần macOS)

### B. Cấu hình nền tảng & store
- [x] applicationId/bundleId là domain thật, nhất quán (`com.mbti.vietnamese.mobile`) — ⚠️ xác nhận sở hữu domain/Apple bundle id
- [x] Tên hiển thị app nhất quán 2 OS (H1) — "MBTI Personality"
- [x] Android cấu hình ký bằng keystore production (B3) — ⚠️ cần tạo keystore + `key.properties`
- [x] Icon + splash đầy đủ cho cả Android & iOS (H3)
- [ ] Orientation hợp lý theo thiết kế (hiện iOS cho phép landscape — xác nhận có chủ đích)

### C. Privacy & tuân thủ
- [x] iOS: `GADApplicationIdentifier` (B5), `SKAdNetworkItems`, `NSUserTrackingUsageDescription` (H2) — ⚠️ thay App ID test bằng prod
- [x] Android: permission `AD_ID` (H6) — ⚠️ Data Safety form làm trên Play Console
- [x] AdMob dùng ID production, test device cho dev (B4) — cấu hình qua `--dart-define`/`-Padmob.appId`; ⚠️ cần ID thật
- [x] Có Privacy Policy truy cập trong app + URL công khai (H4) — *card + nút trong About; cần URL thật qua dart-define*
- [ ] Xác nhận target audience (không hướng trẻ em) cho cấu hình ad phù hợp

### D. Kiến trúc & chất lượng code
- [x] Sửa lỗi biên dịch `strings` (B2)
- [x] Xử lý `BuildContext` qua async đúng (V2)
- [x] Xử lý lỗi: ad load fail, JSON parse, I/O storage (đã có try/catch ở `main.dart`, `storage.load`)
- [x] Lint sạch theo `analysis_options.yaml` — *No issues found*

### E. UX/UI & a11y & localization
- [x] Responsive nhiều kích thước + safe area/notch 2 OS — *các màn dùng `SafeArea` + `ListView`; khóa portrait để tránh lỗi layout landscape*
- [x] Localization phủ hết chuỗi 5 ngôn ngữ, dấu tiếng Việt đầy đủ — *đã sửa `monetization_strings.dart` (không dấu → có dấu)*
- [x] Tương phản màu & kích thước chạm tối thiểu (48dp) — *option tile 46px + padding, button theme 16px vertical; đạt mức khuyến nghị*
- [ ] Hỗ trợ screen reader cơ bản (semantics) — *Material widgets có semantics mặc định; cân nhắc bổ sung label cho icon-only nếu cần*

### F. Kiểm thử & ổn định
- [x] Unit test cho `test_engine` (scoring, threshold, dimension "X") — **12/12 pass**
- [x] Test cho `storage` (load/save, access logic, locale persist)
- [x] Không crash luồng chính; xử lý offline & no-ad-fill (đã có `RewardedUnlockResult.failed/unavailable`)
- [x] Khóa orientation portrait (2 OS) cho UI dạng cuộn dọc

---

## 4. Lộ trình thực hiện

- **Giai đoạn 1 — Quét blocker build** ✅ *(đã chạy `flutter analyze`, xác nhận B1, B2)*
- **Giai đoạn 2 — Sửa blocker build:** B1 (pubspec), B2 (lỗi `strings`) ✅ *analyze sạch + build APK*
- **Giai đoạn 3 — Chuẩn hóa cấu hình store:** B3, B4, B5, H1, H3 ✅ *build release APK OK*
- **Giai đoạn 4 — Tuân thủ privacy/ads + localization:** H2, H4, H6, V1, localization VN ✅
- **Giai đoạn 5 — Kiểm thử & UX/a11y:** D, E, F (12/12 test pass), khóa portrait ✅

---

## 5. Định nghĩa "Done"

App build release thành công và chạy không crash trên cả Android & iOS; `flutter analyze` 0 error; không còn ID/khóa test; tên/icon/splash chuẩn 2 OS; đầy đủ khai báo privacy & quảng cáo theo Apple/Google; có Privacy Policy truy cập được; có unit test cho logic cốt lõi.

**Trạng thái:** Mọi mục trong tầm xử lý bằng code đã hoàn tất và kiểm chứng (analyze sạch, 12/12 test pass, build release APK 56.2MB). Còn lại là các mục **cần input/tài khoản của bạn** (mục 7).

---

## 7. Việc còn lại cần bạn cung cấp (không thể tự làm bằng code)

| # | Việc | Cách áp dụng |
|---|------|--------------|
| 1 | **AdMob App ID + Rewarded Ad Unit ID** thật (Android & iOS) | Android app id: `-Padmob.appId=...`; iOS app id: sửa `GADApplicationIdentifier` trong `Info.plist`; ad unit: `--dart-define=ADMOB_REWARDED_ANDROID_ID=...` / `ADMOB_REWARDED_IOS_ID=...` |
| 2 | **Keystore production** | Tạo theo `android/key.properties.example`, đặt `android/key.properties` |
| 3 | **URL Privacy Policy công khai** | `--dart-define=PRIVACY_POLICY_URL=https://...` |
| 4 | **Data Safety form** (Play Console) + **App Privacy** (App Store Connect) | Khai báo thu thập qua AdMob (device id, usage) |
| 5 | **Build IPA + ký** | Cần macOS + Xcode + Apple Developer account; `flutter build ipa --release` |
| 6 | Xác nhận **targetSdk ≥ 35** | Kiểm tra `flutter.targetSdkVersion` của Flutter SDK đang dùng khi build cuối |
| 7 | Xác nhận **bundle id iOS** (`com.mbti.vietnamese.mobile`) đã đăng ký trên Apple Developer | App Store Connect |

### Lệnh build production tham khảo

```
flutter build appbundle --release ^
  -Padmob.appId=ca-app-pub-XXXX~YYYY ^
  --dart-define=ADMOB_REWARDED_ANDROID_ID=ca-app-pub-XXXX/ZZZZ ^
  --dart-define=PRIVACY_POLICY_URL=https://your-domain/privacy
```

---

## 6. Lưu ý kỹ thuật

- Lệnh `flutter analyze` đã chạy `pub get` và đồng bộ lại `pubspec.lock` theo `pubspec.yaml`. `webview_flutter` là transitive của `google_mobile_ads`, không cần khai báo direct.
- Thư mục `mobile_app/` hiện **chưa được track** trong git. Cân nhắc commit baseline để dễ theo dõi diff.
- `flutter_native_splash` đã re-indent `ios/Runner/Info.plist` (tab) và thêm `UIStatusBarHidden` — cấu trúc plist vẫn hợp lệ, đã kiểm tra.
