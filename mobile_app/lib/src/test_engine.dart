import 'dart:math';

import 'models.dart';
import 'storage.dart';

class TestEngine {
  TestEngine({
    required this.version,
    required this.questions,
    required this.storage,
    SavedProgress? initialProgress,
  }) : _answers = Map<int, String>.from(initialProgress?.answers ?? {}),
       _currentIndex = initialProgress?.currentIndex ?? 0,
       _startTime =
           initialProgress?.startTime ?? DateTime.now().millisecondsSinceEpoch;

  final VersionId version;
  final List<QuestionModel> questions;
  final AppStorage storage;

  final Map<int, String> _answers;
  int _currentIndex;
  final int _startTime;

  int get currentIndex => _currentIndex;
  int get totalQuestions => questions.length;
  QuestionModel get currentQuestion => questions[_currentIndex];
  String? get currentAnswer => _answers[currentQuestion.id];
  Map<int, String> get answers => Map<int, String>.unmodifiable(_answers);
  int get progressPercent =>
      ((_answers.length / max(questions.length, 1)) * 100).round();
  bool get isComplete => _answers.length == questions.length;

  Future<void> ensureProgress() => _persist();

  Future<void> answer(String choice) async {
    _answers[currentQuestion.id] = choice;
    await _persist();
  }

  Future<void> next() async {
    if (_currentIndex < questions.length - 1) {
      _currentIndex += 1;
      await _persist();
    }
  }

  Future<void> previous() async {
    if (_currentIndex > 0) {
      _currentIndex -= 1;
      await _persist();
    }
  }

  Future<void> jumpTo(int index) async {
    if (index >= 0 && index < questions.length) {
      _currentIndex = index;
      await _persist();
    }
  }

  Future<void> clearProgress() => storage.clearProgress(version);

  TestResultModel calculateResult() {
    final scores = <String, int>{
      'E': 0,
      'I': 0,
      'S': 0,
      'N': 0,
      'T': 0,
      'F': 0,
      'J': 0,
      'P': 0,
    };

    for (final question in questions) {
      final choice = _answers[question.id];
      if (choice == null) continue;
      final selected = question.options.firstWhere(
        (item) => item.label == choice,
      );
      scores[selected.value] = (scores[selected.value] ?? 0) + 1;
    }

    final resultType = [
      scores['E']! >= scores['I']! ? 'E' : 'I',
      scores['S']! >= scores['N']! ? 'S' : 'N',
      scores['T']! >= scores['F']! ? 'T' : 'F',
      scores['J']! >= scores['P']! ? 'J' : 'P',
    ].join();

    final threshold = switch (version) {
      VersionId.quick => 1,
      VersionId.standard => 3,
      VersionId.full => 5,
    };

    String dimensionValue(String a, String b) {
      final left = scores[a]!;
      final right = scores[b]!;
      if ((left - right).abs() <= threshold) return 'X';
      return left > right ? a : b;
    }

    return TestResultModel(
      id: '${DateTime.now().millisecondsSinceEpoch}-${Random().nextInt(999999)}',
      timestamp: DateTime.now().millisecondsSinceEpoch,
      version: version,
      scores: TestScores(
        e: scores['E']!,
        i: scores['I']!,
        s: scores['S']!,
        n: scores['N']!,
        t: scores['T']!,
        f: scores['F']!,
        j: scores['J']!,
        p: scores['P']!,
      ),
      resultType: resultType,
      dimensions: {
        'EI': dimensionValue('E', 'I'),
        'SN': dimensionValue('S', 'N'),
        'TF': dimensionValue('T', 'F'),
        'JP': dimensionValue('J', 'P'),
      },
    );
  }

  Future<void> _persist() async {
    await storage.saveProgress(
      SavedProgress(
        version: version,
        answers: _answers,
        currentIndex: _currentIndex,
        startTime: _startTime,
        lastUpdate: DateTime.now().millisecondsSinceEpoch,
      ),
    );
  }
}
