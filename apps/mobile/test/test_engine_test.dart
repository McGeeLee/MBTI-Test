import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

import 'package:mobile_app/src/models.dart';
import 'package:mobile_app/src/storage.dart';
import 'package:mobile_app/src/test_engine.dart';

/// Builds the 4 canonical single-axis questions (one per MBTI dimension).
List<QuestionModel> _axisQuestions() => const [
  QuestionModel(
    id: 1,
    text: 'Q1',
    options: [
      OptionModel(label: 'A', text: 'A1', value: 'E'),
      OptionModel(label: 'B', text: 'B1', value: 'I'),
    ],
  ),
  QuestionModel(
    id: 2,
    text: 'Q2',
    options: [
      OptionModel(label: 'A', text: 'A2', value: 'S'),
      OptionModel(label: 'B', text: 'B2', value: 'N'),
    ],
  ),
  QuestionModel(
    id: 3,
    text: 'Q3',
    options: [
      OptionModel(label: 'A', text: 'A3', value: 'T'),
      OptionModel(label: 'B', text: 'B3', value: 'F'),
    ],
  ),
  QuestionModel(
    id: 4,
    text: 'Q4',
    options: [
      OptionModel(label: 'A', text: 'A4', value: 'J'),
      OptionModel(label: 'B', text: 'B4', value: 'P'),
    ],
  ),
];

/// Builds [count] questions that all score toward [value] on choice 'A'.
List<QuestionModel> _repeatedQuestions(String value, int count) {
  return List<QuestionModel>.generate(
    count,
    (index) => QuestionModel(
      id: index + 1,
      text: 'Q${index + 1}',
      options: [
        OptionModel(label: 'A', text: 'A', value: value),
        OptionModel(label: 'B', text: 'B', value: 'I'),
      ],
    ),
  );
}

Future<void> _answerAll(TestEngine engine, List<String> choices) async {
  for (var i = 0; i < choices.length; i++) {
    await engine.answer(choices[i]);
    if (i < choices.length - 1) {
      await engine.next();
    }
  }
}

void main() {
  late Directory tempDir;
  late AppStorage storage;

  setUp(() async {
    tempDir = await Directory.systemTemp.createTemp('mbti_test_');
    storage = AppStorage(overrideDirectory: tempDir);
    await storage.load();
  });

  tearDown(() async {
    if (await tempDir.exists()) {
      await tempDir.delete(recursive: true);
    }
  });

  group('TestEngine.calculateResult', () {
    test('balanced single-axis answers map to X dimensions (quick)', () async {
      final engine = TestEngine(
        version: VersionId.quick,
        questions: _axisQuestions(),
        storage: storage,
      );

      await _answerAll(engine, ['A', 'A', 'B', 'B']);
      final result = engine.calculateResult();

      // Tie on each axis -> first letter wins for type, but dimensions == X
      // because the gap (0) is within the quick threshold (1).
      expect(result.resultType, 'ESFP');
      expect(result.dimensions['EI'], 'X');
      expect(result.dimensions['SN'], 'X');
      expect(result.dimensions['TF'], 'X');
      expect(result.dimensions['JP'], 'X');
    });

    test('a clear majority resolves the dimension letter', () async {
      // 6 E answers vs 0 I -> gap 6 > standard threshold 3.
      final engine = TestEngine(
        version: VersionId.standard,
        questions: _repeatedQuestions('E', 6),
        storage: storage,
      );

      await _answerAll(engine, List<String>.filled(6, 'A'));
      final result = engine.calculateResult();

      expect(result.scores.e, 6);
      expect(result.scores.i, 0);
      expect(result.dimensions['EI'], 'E');
    });

    test('gap within threshold stays X (standard threshold = 3)', () async {
      // 4 questions: 3 E, 1 I -> gap 2, within threshold 3 -> X.
      final questions = _repeatedQuestions('E', 4);
      final engine = TestEngine(
        version: VersionId.standard,
        questions: questions,
        storage: storage,
      );

      await _answerAll(engine, ['A', 'A', 'A', 'B']);
      final result = engine.calculateResult();

      expect(result.scores.e, 3);
      expect(result.scores.i, 1);
      expect(result.dimensions['EI'], 'X');
    });

    test('unanswered questions are ignored in scoring', () async {
      final engine = TestEngine(
        version: VersionId.quick,
        questions: _axisQuestions(),
        storage: storage,
      );

      // Only answer the first question.
      await engine.answer('A');
      final result = engine.calculateResult();

      expect(result.scores.e, 1);
      expect(result.scores.i, 0);
      expect(result.scores.s + result.scores.n, 0);
    });
  });

  group('TestEngine progress', () {
    test('progressPercent reflects answered ratio', () async {
      final engine = TestEngine(
        version: VersionId.quick,
        questions: _axisQuestions(),
        storage: storage,
      );

      expect(engine.progressPercent, 0);
      await engine.answer('A');
      expect(engine.progressPercent, 25);
      await engine.next();
      await engine.answer('A');
      expect(engine.progressPercent, 50);
    });

    test('isComplete only when every question is answered', () async {
      final engine = TestEngine(
        version: VersionId.quick,
        questions: _axisQuestions(),
        storage: storage,
      );

      await _answerAll(engine, ['A', 'A', 'A']);
      expect(engine.isComplete, isFalse);
      await engine.next();
      await engine.answer('A');
      expect(engine.isComplete, isTrue);
    });

    test('next/previous clamp at bounds', () async {
      final engine = TestEngine(
        version: VersionId.quick,
        questions: _axisQuestions(),
        storage: storage,
      );

      expect(engine.currentIndex, 0);
      await engine.previous();
      expect(engine.currentIndex, 0, reason: 'cannot go before first');

      for (var i = 0; i < 10; i++) {
        await engine.next();
      }
      expect(
        engine.currentIndex,
        engine.totalQuestions - 1,
        reason: 'cannot go past last',
      );
    });

    test('progress persists and can be resumed', () async {
      final engine = TestEngine(
        version: VersionId.quick,
        questions: _axisQuestions(),
        storage: storage,
      );
      await engine.answer('A');
      await engine.next();
      await engine.answer('B');

      final saved = storage.progressFor(VersionId.quick);
      expect(saved, isNotNull);
      expect(saved!.currentIndex, 1);
      expect(saved.answers[1], 'A');
      expect(saved.answers[2], 'B');

      // Reload from disk into a fresh storage instance.
      final reopened = AppStorage(overrideDirectory: tempDir);
      await reopened.load();
      final resumed = reopened.progressFor(VersionId.quick);
      expect(resumed, isNotNull);
      expect(resumed!.answers[1], 'A');
    });
  });

  group('AppStorage', () {
    test('history add, delete and clear', () async {
      final result = TestResultModel(
        id: 'r1',
        timestamp: 1,
        version: VersionId.quick,
        scores: const TestScores(
          e: 1,
          i: 0,
          s: 0,
          n: 0,
          t: 0,
          f: 0,
          j: 0,
          p: 0,
        ),
        resultType: 'ESTJ',
        dimensions: const {'EI': 'E', 'SN': 'S', 'TF': 'T', 'JP': 'J'},
      );

      await storage.addResult(result);
      expect(storage.state.testHistory, hasLength(1));

      await storage.deleteResult('r1');
      expect(storage.state.testHistory, isEmpty);

      await storage.addResult(result);
      await storage.clearHistory();
      expect(storage.state.testHistory, isEmpty);
    });

    test('locale changes persist across reloads', () async {
      await storage.setLocale(AppLocale.ja);
      final reopened = AppStorage(overrideDirectory: tempDir);
      await reopened.load();
      expect(reopened.state.locale, AppLocale.ja);
    });
  });
}
