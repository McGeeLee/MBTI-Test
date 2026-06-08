import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'app_strings.dart';
import 'models.dart';
import 'repository.dart';
import 'screens/about_screen.dart';
import 'screens/history_screen.dart';
import 'screens/home_screen.dart';
import 'screens/library_screen.dart';
import 'storage.dart';
import 'widgets.dart';

class MbtiApp extends StatefulWidget {
  const MbtiApp({super.key, required this.repository, required this.storage});

  final MbtiRepository repository;
  final AppStorage storage;

  @override
  State<MbtiApp> createState() => _MbtiAppState();
}

class _MbtiAppState extends State<MbtiApp> {
  late AppLocale _locale = widget.storage.state.locale;
  bool _loadingLocale = false;

  Future<void> _changeLocale(AppLocale locale) async {
    if (_loadingLocale || _locale == locale) return;
    setState(() {
      _loadingLocale = true;
    });
    await widget.repository.load(locale);
    await widget.storage.setLocale(locale);
    if (!mounted) return;
    setState(() {
      _locale = locale;
      _loadingLocale = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final strings = AppStrings.of(_locale);
    const fontFamily = 'BeVietnamPro';
    TextStyle font({
      double? fontSize,
      double? height,
      FontWeight? fontWeight,
      Color? color,
      double? letterSpacing,
    }) {
      return TextStyle(
        fontFamily: fontFamily,
        fontSize: fontSize,
        height: height,
        fontWeight: fontWeight,
        color: color,
        letterSpacing: letterSpacing,
      );
    }

    final colorScheme =
        ColorScheme.fromSeed(
          seedColor: AppColors.primary,
          brightness: Brightness.light,
        ).copyWith(
          primary: AppColors.primary,
          secondary: AppColors.secondary,
          surface: AppColors.panel,
          onSurface: AppColors.ink,
        );

    return AppScope(
      locale: _locale,
      strings: strings,
      onLocaleChanged: _changeLocale,
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: strings.appName,
        locale: Locale(appLocaleToString(_locale)),
        localizationsDelegates: GlobalMaterialLocalizations.delegates,
        supportedLocales: const [
          Locale('vi'),
          Locale('en'),
          Locale('ko'),
          Locale('ja'),
          Locale('zh'),
        ],
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: colorScheme,
          fontFamily: fontFamily,
          scaffoldBackgroundColor: AppColors.cream,
          textTheme: TextTheme(
            headlineLarge: font(
              fontSize: 34,
              height: 1.05,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
              letterSpacing: -0.6,
            ),
            headlineMedium: font(
              fontSize: 28,
              height: 1.15,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
              letterSpacing: -0.4,
            ),
            headlineSmall: font(
              fontSize: 24,
              height: 1.2,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
              letterSpacing: -0.3,
            ),
            titleLarge: font(
              fontSize: 20,
              height: 1.25,
              fontWeight: FontWeight.w800,
              color: AppColors.ink,
            ),
            titleMedium: font(
              fontSize: 16,
              height: 1.25,
              fontWeight: FontWeight.w700,
              color: AppColors.ink,
            ),
            bodyLarge: font(fontSize: 16, height: 1.55, color: AppColors.ink),
            bodyMedium: font(
              fontSize: 14,
              height: 1.55,
              color: AppColors.textMuted,
            ),
            labelLarge: font(
              fontSize: 14,
              height: 1.2,
              fontWeight: FontWeight.w700,
              color: AppColors.ink,
            ),
          ),
          appBarTheme: AppBarTheme(
            backgroundColor: Colors.transparent,
            foregroundColor: AppColors.ink,
            elevation: 0,
            scrolledUnderElevation: 0,
            titleTextStyle: font(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: AppColors.ink,
            ),
          ),
          filledButtonTheme: FilledButtonThemeData(
            style: FilledButton.styleFrom(
              foregroundColor: Colors.white,
              backgroundColor: AppColors.primary,
              elevation: 0,
              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(22),
              ),
              textStyle: font(fontWeight: FontWeight.w800),
            ),
          ),
          outlinedButtonTheme: OutlinedButtonThemeData(
            style: OutlinedButton.styleFrom(
              foregroundColor: AppColors.ink,
              side: const BorderSide(color: AppColors.border),
              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(22),
              ),
              textStyle: font(fontWeight: FontWeight.w800),
            ),
          ),
          navigationBarTheme: NavigationBarThemeData(
            backgroundColor: Colors.white.withValues(alpha: 0.96),
            indicatorColor: AppColors.primary.withValues(alpha: 0.12),
            labelTextStyle: WidgetStateProperty.resolveWith(
              (states) => font(
                fontWeight: states.contains(WidgetState.selected)
                    ? FontWeight.w800
                    : FontWeight.w600,
                color: states.contains(WidgetState.selected)
                    ? AppColors.primary
                    : AppColors.textMuted,
              ),
            ),
          ),
        ),
        home: Stack(
          children: [
            SplashGate(repository: widget.repository, storage: widget.storage),
            if (_loadingLocale)
              Positioned.fill(
                child: ColoredBox(
                  color: Colors.black.withValues(alpha: 0.14),
                  child: Center(
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 18,
                        vertical: 16,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(color: AppColors.border),
                        boxShadow: AppShadows.soft,
                      ),
                      child: const CircularProgressIndicator(),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class AppScope extends InheritedWidget {
  const AppScope({
    super.key,
    required super.child,
    required this.locale,
    required this.strings,
    required this.onLocaleChanged,
  });

  final AppLocale locale;
  final AppStrings strings;
  final Future<void> Function(AppLocale locale) onLocaleChanged;

  static AppScope of(BuildContext context) {
    final scope = context.dependOnInheritedWidgetOfExactType<AppScope>();
    if (scope == null) {
      throw StateError('AppScope not found');
    }
    return scope;
  }

  @override
  bool updateShouldNotify(AppScope oldWidget) {
    return locale != oldWidget.locale;
  }
}

class SplashGate extends StatefulWidget {
  const SplashGate({
    super.key,
    required this.repository,
    required this.storage,
  });

  final MbtiRepository repository;
  final AppStorage storage;

  @override
  State<SplashGate> createState() => _SplashGateState();
}

class _SplashGateState extends State<SplashGate> {
  // App data is already loaded in main() before runApp(), so this splash is a
  // brief branded intro rather than a loading gate. Keep it short.
  static const splashMinDuration = Duration(milliseconds: 1500);

  bool _ready = false;

  @override
  void initState() {
    super.initState();
    unawaited(_prepare());
  }

  Future<void> _prepare() async {
    await Future<void>.delayed(splashMinDuration);
    if (!mounted) return;
    setState(() {
      _ready = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 550),
      child: _ready
          ? HomeShell(
              key: const ValueKey('home'),
              repository: widget.repository,
              storage: widget.storage,
            )
          : const AppSplashScreen(key: ValueKey('splash')),
    );
  }
}

class AppSplashScreen extends StatelessWidget {
  const AppSplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final strings = AppScope.of(context).strings;
    return DecoratedScaffold(
      child: GradientSurface(
        child: SafeArea(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 28),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.88),
                      borderRadius: BorderRadius.circular(32),
                      border: Border.all(color: AppColors.border),
                      boxShadow: AppShadows.soft,
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(24),
                      child: Image.asset(
                        'assets/branding/splash_image.png',
                        width: 210,
                        height: 340,
                        fit: BoxFit.contain,
                      ),
                    ),
                  ),
                  const SizedBox(height: 28),
                  BrandPill(
                    label: strings.appName.toUpperCase(),
                    icon: Icons.auto_awesome_rounded,
                    gradient: const LinearGradient(
                      colors: [Color(0x226D5EF8), Color(0x2236C6F4)],
                    ),
                  ),
                  const SizedBox(height: 18),
                  Text(
                    strings.splashTagline,
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                  const SizedBox(height: 10),
                  Text(
                    strings.splashBody,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      color: AppColors.textMuted,
                      height: 1.6,
                    ),
                  ),
                  const SizedBox(height: 28),
                  Container(
                    width: 120,
                    height: 6,
                    decoration: BoxDecoration(
                      color: AppColors.border,
                      borderRadius: BorderRadius.circular(999),
                    ),
                    alignment: Alignment.centerLeft,
                    child: TweenAnimationBuilder<double>(
                      tween: Tween(begin: 0, end: 1),
                      duration: _SplashGateState.splashMinDuration,
                      builder: (context, value, child) {
                        return FractionallySizedBox(
                          alignment: Alignment.centerLeft,
                          widthFactor: value,
                          child: child,
                        );
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [AppColors.primary, AppColors.secondary],
                          ),
                          borderRadius: BorderRadius.circular(999),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class HomeShell extends StatefulWidget {
  const HomeShell({super.key, required this.repository, required this.storage});

  final MbtiRepository repository;
  final AppStorage storage;

  @override
  State<HomeShell> createState() => _HomeShellState();
}

class _HomeShellState extends State<HomeShell> {
  int _currentIndex = 0;

  void _refresh() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final strings = AppScope.of(context).strings;
    final screens = [
      HomeScreen(
        repository: widget.repository,
        storage: widget.storage,
        onDataChanged: _refresh,
      ),
      LibraryScreen(repository: widget.repository),
      HistoryScreen(
        repository: widget.repository,
        storage: widget.storage,
        onDataChanged: _refresh,
      ),
      const AboutScreen(),
    ];

    return DecoratedScaffold(
      bottomNavigationBar: Container(
        color: AppColors.cream,
        child: SafeArea(
          top: false,
          minimum: const EdgeInsets.fromLTRB(16, 0, 16, 16),
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.96),
              borderRadius: BorderRadius.circular(28),
              border: Border.all(color: AppColors.border),
              boxShadow: AppShadows.soft,
            ),
            child: NavigationBar(
              selectedIndex: _currentIndex,
              onDestinationSelected: (value) {
                setState(() {
                  _currentIndex = value;
                });
              },
              height: 74,
              backgroundColor: Colors.transparent,
              destinations: [
                NavigationDestination(
                  icon: const Icon(Icons.home_outlined),
                  selectedIcon: const Icon(Icons.home_rounded),
                  label: strings.homeTab,
                ),
                NavigationDestination(
                  icon: const Icon(Icons.grid_view_rounded),
                  selectedIcon: const Icon(Icons.grid_view_rounded),
                  label: strings.libraryTab,
                ),
                NavigationDestination(
                  icon: const Icon(Icons.history_rounded),
                  selectedIcon: const Icon(Icons.history_rounded),
                  label: strings.historyTab,
                ),
                NavigationDestination(
                  icon: const Icon(Icons.bubble_chart_outlined),
                  selectedIcon: const Icon(Icons.bubble_chart_rounded),
                  label: strings.aboutTab,
                ),
              ],
            ),
          ),
        ),
      ),
      child: IndexedStack(index: _currentIndex, children: screens),
    );
  }
}
