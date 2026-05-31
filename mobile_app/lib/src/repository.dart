import 'dart:convert';

import 'package:flutter/services.dart';

import 'models.dart';

class MbtiRepository {
  QuestionsBundle? _questionsBundle;
  List<PersonalityTypeModel>? _types;
  AppLocale _locale = AppLocale.vi;

  AppLocale get locale => _locale;

  Future<void> load([AppLocale locale = AppLocale.vi]) async {
    _locale = locale;
    final code = appLocaleToString(locale);
    final questionsRaw = await rootBundle.loadString(
      'assets/data/questions_$code.json',
    );
    final typesRaw = await rootBundle.loadString('assets/data/types_$code.json');

    _questionsBundle = QuestionsBundle.fromRaw(questionsRaw);
    _types = (jsonDecode(typesRaw) as List<dynamic>)
        .map(
          (item) => PersonalityTypeModel.fromJson(item as Map<String, dynamic>),
        )
        .toList();
  }

  QuestionsBundle get questionsBundle {
    final bundle = _questionsBundle;
    if (bundle == null) {
      throw StateError('Questions not loaded');
    }
    return bundle;
  }

  List<PersonalityTypeModel> get allTypes {
    final data = _types;
    if (data == null) {
      throw StateError('Types not loaded');
    }
    return data;
  }

  VersionMeta versionMeta(VersionId version) => questionsBundle.meta[version]!;

  List<QuestionModel> questionsFor(VersionId version) =>
      questionsBundle.questions[version]!;

  PersonalityTypeModel typeById(String id) {
    return allTypes.firstWhere((item) => item.id == id.toUpperCase());
  }

  Map<String, List<PersonalityTypeModel>> groupedTypes() {
    final grouped = <String, List<PersonalityTypeModel>>{};
    for (final item in allTypes) {
      grouped
          .putIfAbsent(item.category, () => <PersonalityTypeModel>[])
          .add(item);
    }
    return grouped;
  }
}
