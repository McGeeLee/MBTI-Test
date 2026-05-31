import 'dart:convert';
import 'dart:io';

import 'package:path_provider/path_provider.dart';

import 'models.dart';

class AppStorage {
  AppStorage({Directory? overrideDirectory})
      : _overrideDirectory = overrideDirectory;

  static const _fileName = 'mbti_mobile_app_data.json';

  /// Optional base directory for persistence. When null (production), the app
  /// support directory from `path_provider` is used. Tests can inject a temp
  /// directory to avoid depending on the platform plugin.
  final Directory? _overrideDirectory;

  AppStorageState _state = const AppStorageState();
  late final File _file;

  AppStorageState get state => _state;
  TestAccessState get testAccess => state.testAccess;

  Future<void> load() async {
    final dir = await _resolveStorageDir();
    _file = File('${dir.path}${Platform.pathSeparator}$_fileName');

    if (!await _file.exists()) {
      _state = const AppStorageState();
      return;
    }

    try {
      final raw = await _file.readAsString();
      _state = AppStorageState.fromJson(
        jsonDecode(raw) as Map<String, dynamic>,
      );
    } catch (_) {
      _state = const AppStorageState();
    }
  }

  Future<Directory> _resolveStorageDir() async {
    final supportDirectory =
        _overrideDirectory ?? await getApplicationSupportDirectory();
    final base = Directory(
      '${supportDirectory.path}${Platform.pathSeparator}mbti_viet_storage',
    );
    if (!await base.exists()) {
      await base.create(recursive: true);
    }
    return base;
  }

  Future<void> _save() async {
    await _file.writeAsString(jsonEncode(_state.toJson()));
  }

  SavedProgress? progressFor(VersionId version) => state.savedTests[version];

  Future<void> saveProgress(SavedProgress progress) async {
    final savedTests = Map<VersionId, SavedProgress>.from(state.savedTests);
    savedTests[progress.version] = progress;
    _state = state.copyWith(savedTests: savedTests);
    await _save();
  }

  Future<void> clearProgress(VersionId version) async {
    final savedTests = Map<VersionId, SavedProgress>.from(state.savedTests);
    savedTests.remove(version);
    _state = state.copyWith(savedTests: savedTests);
    await _save();
  }

  Future<void> addResult(TestResultModel result) async {
    final history = <TestResultModel>[result, ...state.testHistory];
    _state = state.copyWith(testHistory: history);
    await _save();
  }

  Future<void> setLocale(AppLocale locale) async {
    _state = state.copyWith(locale: locale);
    await _save();
  }

  Future<void> deleteResult(String id) async {
    _state = state.copyWith(
      testHistory: state.testHistory.where((item) => item.id != id).toList(),
    );
    await _save();
  }

  Future<void> clearHistory() async {
    _state = state.copyWith(testHistory: <TestResultModel>[]);
    await _save();
  }

  Future<TestAccessKind> claimNextTestAccess() async {
    final nextAccess = testAccess.nextAccessKind;
    switch (nextAccess) {
      case TestAccessKind.freeTrial:
        _state = state.copyWith(
          testAccess: testAccess.copyWith(freeTrialUsed: true),
        );
        break;
      case TestAccessKind.rewardedCredit:
        _state = state.copyWith(
          testAccess: testAccess.copyWith(
            rewardedCredits: testAccess.rewardedCredits - 1,
          ),
        );
        break;
      case TestAccessKind.locked:
        throw StateError('No trial or rewarded credit available.');
    }
    await _save();
    return nextAccess;
  }

  Future<void> grantRewardedTestCredit([int credits = 1]) async {
    if (credits <= 0) return;
    _state = state.copyWith(
      testAccess: testAccess.copyWith(
        rewardedCredits: testAccess.rewardedCredits + credits,
      ),
    );
    await _save();
  }
}

class AppStorageState {
  const AppStorageState({
    this.locale = AppLocale.vi,
    this.savedTests = const {},
    this.testHistory = const [],
    this.testAccess = const TestAccessState(),
  });

  final AppLocale locale;
  final Map<VersionId, SavedProgress> savedTests;
  final List<TestResultModel> testHistory;
  final TestAccessState testAccess;

  AppStorageState copyWith({
    AppLocale? locale,
    Map<VersionId, SavedProgress>? savedTests,
    List<TestResultModel>? testHistory,
    TestAccessState? testAccess,
  }) {
    return AppStorageState(
      locale: locale ?? this.locale,
      savedTests: savedTests ?? this.savedTests,
      testHistory: testHistory ?? this.testHistory,
      testAccess: testAccess ?? this.testAccess,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'locale': appLocaleToString(locale),
      'savedTests': {
        for (final entry in savedTests.entries)
          versionIdToString(entry.key): entry.value.toJson(),
      },
      'testHistory': testHistory.map((item) => item.toJson()).toList(),
      'testAccess': testAccess.toJson(),
    };
  }

  factory AppStorageState.fromJson(Map<String, dynamic> json) {
    final savedTestsJson = json['savedTests'] as Map<String, dynamic>? ?? {};
    final historyJson = json['testHistory'] as List<dynamic>? ?? [];

    return AppStorageState(
      locale: appLocaleFromString(json['locale'] as String? ?? 'vi'),
      savedTests: savedTestsJson.map(
        (key, value) => MapEntry(
          versionIdFromString(key),
          SavedProgress.fromJson(value as Map<String, dynamic>),
        ),
      ),
      testHistory: historyJson
          .map((item) => TestResultModel.fromJson(item as Map<String, dynamic>))
          .toList(),
      testAccess: TestAccessState.fromJson(
        json['testAccess'] as Map<String, dynamic>? ?? <String, dynamic>{},
      ),
    );
  }
}
