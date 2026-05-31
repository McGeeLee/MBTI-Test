import 'dart:convert';

enum AppLocale { vi, en, ko, ja, zh }

AppLocale appLocaleFromString(String value) {
  switch (value) {
    case 'vi':
      return AppLocale.vi;
    case 'en':
      return AppLocale.en;
    case 'ko':
      return AppLocale.ko;
    case 'ja':
      return AppLocale.ja;
    case 'zh':
      return AppLocale.zh;
  }
  return AppLocale.vi;
}

String appLocaleToString(AppLocale locale) {
  switch (locale) {
    case AppLocale.vi:
      return 'vi';
    case AppLocale.en:
      return 'en';
    case AppLocale.ko:
      return 'ko';
    case AppLocale.ja:
      return 'ja';
    case AppLocale.zh:
      return 'zh';
  }
}

VersionId versionIdFromString(String value) {
  switch (value) {
    case 'quick':
      return VersionId.quick;
    case 'standard':
      return VersionId.standard;
    case 'full':
      return VersionId.full;
  }
  throw ArgumentError('Unknown version: $value');
}

String versionIdToString(VersionId value) {
  switch (value) {
    case VersionId.quick:
      return 'quick';
    case VersionId.standard:
      return 'standard';
    case VersionId.full:
      return 'full';
  }
}

enum VersionId { quick, standard, full }

enum TestAccessKind { freeTrial, rewardedCredit, locked }

class VersionMeta {
  const VersionMeta({
    required this.id,
    required this.title,
    required this.duration,
    required this.description,
  });

  final VersionId id;
  final String title;
  final String duration;
  final String description;
}

class OptionModel {
  const OptionModel({
    required this.label,
    required this.text,
    required this.value,
  });

  final String label;
  final String text;
  final String value;

  factory OptionModel.fromJson(Map<String, dynamic> json) {
    return OptionModel(
      label: json['label'] as String,
      text: json['text'] as String,
      value: json['value'] as String,
    );
  }
}

class QuestionModel {
  const QuestionModel({
    required this.id,
    required this.text,
    required this.options,
  });

  final int id;
  final String text;
  final List<OptionModel> options;

  factory QuestionModel.fromJson(Map<String, dynamic> json) {
    return QuestionModel(
      id: json['id'] as int,
      text: json['text'] as String,
      options: (json['options'] as List<dynamic>)
          .map((item) => OptionModel.fromJson(item as Map<String, dynamic>))
          .toList(),
    );
  }
}

class QuestionsBundle {
  const QuestionsBundle({required this.meta, required this.questions});

  final Map<VersionId, VersionMeta> meta;
  final Map<VersionId, List<QuestionModel>> questions;

  factory QuestionsBundle.fromRaw(String raw) {
    final json = jsonDecode(raw) as Map<String, dynamic>;
    final metaJson = json['meta'] as Map<String, dynamic>;
    final questionsJson = json['questions'] as Map<String, dynamic>;

    final meta = <VersionId, VersionMeta>{};
    for (final entry in metaJson.entries) {
      final version = versionIdFromString(entry.key);
      final value = entry.value as Map<String, dynamic>;
      meta[version] = VersionMeta(
        id: version,
        title: value['title'] as String,
        duration: value['duration'] as String,
        description: value['description'] as String,
      );
    }

    final questions = <VersionId, List<QuestionModel>>{};
    for (final entry in questionsJson.entries) {
      questions[versionIdFromString(entry.key)] = (entry.value as List<dynamic>)
          .map((item) => QuestionModel.fromJson(item as Map<String, dynamic>))
          .toList();
    }

    return QuestionsBundle(meta: meta, questions: questions);
  }
}

class PersonalityDescription {
  const PersonalityDescription({
    required this.traits,
    required this.strengths,
    required this.weaknesses,
    required this.careers,
  });

  final List<String> traits;
  final List<String> strengths;
  final List<String> weaknesses;
  final List<String> careers;

  factory PersonalityDescription.fromJson(Map<String, dynamic> json) {
    return PersonalityDescription(
      traits: (json['traits'] as List<dynamic>).cast<String>(),
      strengths: (json['strengths'] as List<dynamic>).cast<String>(),
      weaknesses: (json['weaknesses'] as List<dynamic>).cast<String>(),
      careers: (json['careers'] as List<dynamic>).cast<String>(),
    );
  }
}

class LuckyColors {
  const LuckyColors({
    required this.primary,
    required this.secondary,
    required this.meaning,
  });

  final String primary;
  final List<String> secondary;
  final String meaning;

  factory LuckyColors.fromJson(Map<String, dynamic> json) {
    return LuckyColors(
      primary: json['primary'] as String,
      secondary: (json['secondary'] as List<dynamic>).cast<String>(),
      meaning: json['meaning'] as String,
    );
  }
}

class RelationshipInfo {
  const RelationshipInfo({
    required this.compatible,
    required this.challenging,
    required this.advice,
  });

  final List<String> compatible;
  final List<String> challenging;
  final String advice;

  factory RelationshipInfo.fromJson(Map<String, dynamic> json) {
    return RelationshipInfo(
      compatible: (json['compatible'] as List<dynamic>).cast<String>(),
      challenging: (json['challenging'] as List<dynamic>).cast<String>(),
      advice: json['advice'] as String,
    );
  }
}

class DevelopmentInfo {
  const DevelopmentInfo({required this.growthPath, required this.tips});

  final List<String> growthPath;
  final List<String> tips;

  factory DevelopmentInfo.fromJson(Map<String, dynamic> json) {
    return DevelopmentInfo(
      growthPath: (json['growthPath'] as List<dynamic>).cast<String>(),
      tips: (json['tips'] as List<dynamic>).cast<String>(),
    );
  }
}

class FamousPerson {
  const FamousPerson({required this.name, required this.title});

  final String name;
  final String title;

  factory FamousPerson.fromJson(Map<String, dynamic> json) {
    return FamousPerson(
      name: json['name'] as String,
      title: json['title'] as String,
    );
  }
}

class PersonalityTypeModel {
  const PersonalityTypeModel({
    required this.id,
    required this.name,
    required this.category,
    required this.summary,
    required this.description,
    required this.luckyColors,
    required this.relationships,
    required this.development,
    required this.famousPeople,
  });

  final String id;
  final String name;
  final String category;
  final String summary;
  final PersonalityDescription description;
  final LuckyColors luckyColors;
  final RelationshipInfo relationships;
  final DevelopmentInfo development;
  final List<FamousPerson> famousPeople;

  factory PersonalityTypeModel.fromJson(Map<String, dynamic> json) {
    return PersonalityTypeModel(
      id: json['id'] as String,
      name: json['name'] as String,
      category: json['category'] as String,
      summary: json['summary'] as String,
      description: PersonalityDescription.fromJson(
        json['description'] as Map<String, dynamic>,
      ),
      luckyColors: LuckyColors.fromJson(
        json['luckyColors'] as Map<String, dynamic>,
      ),
      relationships: RelationshipInfo.fromJson(
        json['relationships'] as Map<String, dynamic>,
      ),
      development: DevelopmentInfo.fromJson(
        json['development'] as Map<String, dynamic>,
      ),
      famousPeople: (json['famousPeople'] as List<dynamic>)
          .map((item) => FamousPerson.fromJson(item as Map<String, dynamic>))
          .toList(),
    );
  }
}

class SavedProgress {
  const SavedProgress({
    required this.version,
    required this.answers,
    required this.currentIndex,
    required this.startTime,
    required this.lastUpdate,
  });

  final VersionId version;
  final Map<int, String> answers;
  final int currentIndex;
  final int startTime;
  final int lastUpdate;

  Map<String, dynamic> toJson() {
    return {
      'version': versionIdToString(version),
      'answers': {
        for (final entry in answers.entries) entry.key.toString(): entry.value,
      },
      'currentIndex': currentIndex,
      'startTime': startTime,
      'lastUpdate': lastUpdate,
    };
  }

  factory SavedProgress.fromJson(Map<String, dynamic> json) {
    return SavedProgress(
      version: versionIdFromString(json['version'] as String),
      answers: (json['answers'] as Map<String, dynamic>).map(
        (key, value) => MapEntry(int.parse(key), value as String),
      ),
      currentIndex: json['currentIndex'] as int,
      startTime: json['startTime'] as int,
      lastUpdate: json['lastUpdate'] as int,
    );
  }
}

class TestAccessState {
  const TestAccessState({
    this.freeTrialUsed = false,
    this.rewardedCredits = 0,
  });

  final bool freeTrialUsed;
  final int rewardedCredits;

  bool get hasFreeTrialAvailable => !freeTrialUsed;
  bool get hasRewardedCredit => rewardedCredits > 0;

  TestAccessKind get nextAccessKind {
    if (!freeTrialUsed) {
      return TestAccessKind.freeTrial;
    }
    if (rewardedCredits > 0) {
      return TestAccessKind.rewardedCredit;
    }
    return TestAccessKind.locked;
  }

  TestAccessState copyWith({
    bool? freeTrialUsed,
    int? rewardedCredits,
  }) {
    return TestAccessState(
      freeTrialUsed: freeTrialUsed ?? this.freeTrialUsed,
      rewardedCredits: rewardedCredits ?? this.rewardedCredits,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'freeTrialUsed': freeTrialUsed,
      'rewardedCredits': rewardedCredits,
    };
  }

  factory TestAccessState.fromJson(Map<String, dynamic> json) {
    return TestAccessState(
      freeTrialUsed: json['freeTrialUsed'] as bool? ?? false,
      rewardedCredits: json['rewardedCredits'] as int? ?? 0,
    );
  }
}

class TestScores {
  const TestScores({
    required this.e,
    required this.i,
    required this.s,
    required this.n,
    required this.t,
    required this.f,
    required this.j,
    required this.p,
  });

  final int e;
  final int i;
  final int s;
  final int n;
  final int t;
  final int f;
  final int j;
  final int p;

  Map<String, dynamic> toJson() {
    return {'E': e, 'I': i, 'S': s, 'N': n, 'T': t, 'F': f, 'J': j, 'P': p};
  }

  factory TestScores.fromJson(Map<String, dynamic> json) {
    return TestScores(
      e: json['E'] as int,
      i: json['I'] as int,
      s: json['S'] as int,
      n: json['N'] as int,
      t: json['T'] as int,
      f: json['F'] as int,
      j: json['J'] as int,
      p: json['P'] as int,
    );
  }
}

class TestResultModel {
  const TestResultModel({
    required this.id,
    required this.timestamp,
    required this.version,
    required this.scores,
    required this.resultType,
    required this.dimensions,
  });

  final String id;
  final int timestamp;
  final VersionId version;
  final TestScores scores;
  final String resultType;
  final Map<String, String> dimensions;

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'timestamp': timestamp,
      'version': versionIdToString(version),
      'scores': scores.toJson(),
      'resultType': resultType,
      'dimensions': dimensions,
    };
  }

  factory TestResultModel.fromJson(Map<String, dynamic> json) {
    return TestResultModel(
      id: json['id'] as String,
      timestamp: json['timestamp'] as int,
      version: versionIdFromString(json['version'] as String),
      scores: TestScores.fromJson(json['scores'] as Map<String, dynamic>),
      resultType: json['resultType'] as String,
      dimensions: (json['dimensions'] as Map<String, dynamic>).map(
        (key, value) => MapEntry(key, value as String),
      ),
    );
  }
}
