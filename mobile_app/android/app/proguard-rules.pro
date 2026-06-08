# Flutter wrapper
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.**  { *; }
-keep class io.flutter.util.**  { *; }
-keep class io.flutter.view.**  { *; }
-keep class io.flutter.**  { *; }
-keep class io.flutter.plugins.**  { *; }

# Keep annotations and generics used by reflection-based libraries
-keepattributes *Annotation*
-keepattributes Signature
-keepattributes InnerClasses
-keepattributes EnclosingMethod

# Google Play Core — referenced by Flutter's deferred components support but
# not bundled when the app does not use dynamic feature modules. Suppress the
# missing-class warnings so R8 can complete.
-dontwarn com.google.android.play.core.**
-keep class com.google.android.play.core.** { *; }
