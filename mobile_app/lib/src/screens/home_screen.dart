import 'package:flutter/material.dart';

import '../app.dart';
import '../app_strings.dart';
import '../models.dart';
import '../repository.dart';
import '../storage.dart';
import '../test_engine.dart';
import '../widgets.dart';
import 'result_screen.dart';
import 'test_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({
    super.key,
    required this.repository,
    required this.storage,
    required this.onDataChanged,
  });

  final MbtiRepository repository;
  final AppStorage storage;
  final VoidCallback onDataChanged;

  @override
  Widget build(BuildContext context) {
    final strings = AppScope.of(context).strings;
    final versions = VersionId.values;
    final latestResult = storage.state.testHistory.isNotEmpty
        ? storage.state.testHistory.first
        : null;

    return GradientSurface(
      child: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
          children: [
            _HeroCard(strings: strings),
            if (latestResult != null) ...[
              const SizedBox(height: 20),
              _LatestResultCard(
                repository: repository,
                result: latestResult,
                onOpen: () async {
                  await Navigator.of(context).push(
                    MaterialPageRoute<void>(
                      builder: (_) => ResultScreen(
                        repository: repository,
                        result: latestResult,
                      ),
                    ),
                  );
                  onDataChanged();
                },
              ),
            ],
            const SizedBox(height: 24),
            ScreenHeading(
              title: strings.homeSectionTitle,
              subtitle: strings.homeSectionSubtitle,
            ),
            const SizedBox(height: 16),
            ...versions.map(
              (version) => Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: _VersionCard(
                  meta: repository.versionMeta(version),
                  questionCount: repository.questionsFor(version).length,
                  progress: storage.progressFor(version),
                  onTap: () => _openTest(context, version),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _openTest(BuildContext context, VersionId version) async {
    final strings = AppScope.of(context).strings;
    final navigator = Navigator.of(context);
    final progress = storage.progressFor(version);
    SavedProgress? selectedProgress = progress;

    if (progress != null) {
      final resume = await showModalBottomSheet<bool>(
        context: context,
        showDragHandle: true,
        backgroundColor: Colors.transparent,
        builder: (_) => SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
            child: SectionCard(
              borderRadius: 32,
              padding: const EdgeInsets.fromLTRB(20, 18, 20, 20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  BrandPill(
                    label: strings.savedProgress,
                    icon: Icons.play_circle_outline_rounded,
                  ),
                  const SizedBox(height: 14),
                  Text(
                    strings.resumePromptTitle,
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w900,
                      color: AppColors.ink,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    strings.resumePromptBody(
                      repository.versionMeta(version).title.toLowerCase(),
                    ),
                    style: const TextStyle(
                      color: AppColors.textMuted,
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: () => Navigator.pop(context, false),
                          child: Text(strings.restart),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: FilledButton(
                          onPressed: () => Navigator.pop(context, true),
                          child: Text(strings.resume),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      );

      if (resume == null) return;
      if (!resume) {
        selectedProgress = null;
        await storage.clearProgress(version);
        onDataChanged();
      }
    }

    final engine = TestEngine(
      version: version,
      questions: repository.questionsFor(version),
      storage: storage,
      initialProgress: selectedProgress,
    );

    await engine.ensureProgress();

    await navigator.push(
      MaterialPageRoute<void>(
        builder: (_) => TestScreen(
          repository: repository,
          engine: engine,
          onCompleted: (result) async {
            await storage.addResult(result);
            await storage.clearProgress(version);
            onDataChanged();
            if (!navigator.mounted) return;
            await navigator.pushReplacement(
              MaterialPageRoute<void>(
                builder: (_) =>
                    ResultScreen(repository: repository, result: result),
              ),
            );
          },
        ),
      ),
    );

    onDataChanged();
  }
}

class _HeroCard extends StatelessWidget {
  const _HeroCard({required this.strings});

  final AppStrings strings;

  @override
  Widget build(BuildContext context) {
    return SectionCard(
      borderRadius: 36,
      padding: const EdgeInsets.all(0),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(36),
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF6D5EF8), Color(0xFF36C6F4), Color(0xFFFF8A5B)],
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(22, 24, 22, 22),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              BrandPill(
                label: strings.appName.toUpperCase(),
                icon: Icons.auto_awesome_rounded,
                foregroundColor: Colors.white,
                gradient: const LinearGradient(
                  colors: [Color(0x30FFFFFF), Color(0x18FFFFFF)],
                ),
              ),
              const SizedBox(height: 18),
              Text(
                strings.heroTitle,
                style: const TextStyle(
                  fontSize: 30,
                  height: 1.08,
                  fontWeight: FontWeight.w900,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                strings.heroBody,
                style: const TextStyle(
                  fontSize: 15,
                  height: 1.55,
                  color: Color(0xECFFFFFF),
                ),
              ),
              const SizedBox(height: 20),
              Column(
                children: [
                  _HeroStat(
                    label: strings.statOneTitle,
                    value: strings.statOneBody,
                    icon: Icons.category_rounded,
                  ),
                  const SizedBox(height: 10),
                  _HeroStat(
                    label: strings.statTwoTitle,
                    value: strings.statTwoBody,
                    icon: Icons.layers_rounded,
                  ),
                  const SizedBox(height: 10),
                  _HeroStat(
                    label: strings.statThreeTitle,
                    value: strings.statThreeBody,
                    icon: Icons.favorite_rounded,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _HeroStat extends StatelessWidget {
  const _HeroStat({
    required this.label,
    required this.value,
    required this.icon,
  });

  final String label;
  final String value;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.16),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: Colors.white.withValues(alpha: 0.22)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: Colors.white, size: 18),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  label,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            value,
            style: const TextStyle(
              fontSize: 13,
              height: 1.45,
              color: Color(0xE0FFFFFF),
            ),
          ),
        ],
      ),
    );
  }
}

class _LatestResultCard extends StatelessWidget {
  const _LatestResultCard({
    required this.repository,
    required this.result,
    required this.onOpen,
  });

  final MbtiRepository repository;
  final TestResultModel result;
  final VoidCallback onOpen;

  @override
  Widget build(BuildContext context) {
    final strings = AppScope.of(context).strings;
    final type = repository.typeById(result.resultType);
    final accent = colorFromHex(type.luckyColors.primary);

    return SectionCard(
      borderRadius: 30,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          BrandPill(label: strings.latestResult),
          const SizedBox(height: 14),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TypeBadge(type: result.resultType, color: accent, large: true),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${type.id} • ${type.name}',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      type.summary,
                      maxLines: 3,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: AppColors.textMuted,
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: FilledButton.tonalIcon(
              onPressed: onOpen,
              style: FilledButton.styleFrom(
                backgroundColor: accent.withValues(alpha: 0.12),
                foregroundColor: accent,
              ),
              icon: const Icon(Icons.arrow_forward_rounded),
              label: Text(strings.viewDetailedResult),
            ),
          ),
        ],
      ),
    );
  }
}

class _VersionCard extends StatelessWidget {
  const _VersionCard({
    required this.meta,
    required this.questionCount,
    required this.progress,
    required this.onTap,
  });

  final VersionMeta meta;
  final int questionCount;
  final SavedProgress? progress;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final strings = AppScope.of(context).strings;
    final gradient = gradientForVersion(meta.id);
    final recommended = meta.id == VersionId.standard;

    return SectionCard(
      borderRadius: 30,
      padding: const EdgeInsets.all(0),
      child: InkWell(
        borderRadius: BorderRadius.circular(30),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(18),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 62,
                height: 62,
                decoration: BoxDecoration(
                  gradient: gradient,
                  borderRadius: BorderRadius.circular(22),
                ),
                child: Icon(
                  iconForVersion(meta.id),
                  color: Colors.white,
                  size: 32,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            meta.title,
                            style: Theme.of(context).textTheme.titleLarge
                                ?.copyWith(fontWeight: FontWeight.w900),
                          ),
                        ),
                        if (recommended)
                          BrandPill(
                            label: strings.standardVersion.toUpperCase(),
                            gradient: const LinearGradient(
                              colors: [Color(0x226D5EF8), Color(0x1836C6F4)],
                            ),
                          ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      meta.description,
                      style: const TextStyle(
                        color: AppColors.textMuted,
                        height: 1.45,
                      ),
                    ),
                    const SizedBox(height: 14),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        _MetaPill(
                          icon: Icons.schedule_rounded,
                          label: meta.duration,
                        ),
                        _MetaPill(
                          icon: Icons.quiz_outlined,
                          label: strings.questionCountLabel(questionCount),
                        ),
                        if (progress != null)
                          _MetaPill(
                            icon: Icons.play_circle_fill_rounded,
                            label:
                                '${progress!.currentIndex + 1}/$questionCount',
                          ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              const Icon(
                Icons.chevron_right_rounded,
                color: AppColors.textMuted,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _MetaPill extends StatelessWidget {
  const _MetaPill({required this.icon, required this.label});

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 9),
      decoration: BoxDecoration(
        color: AppColors.panelSoft,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: AppColors.textMuted),
          const SizedBox(width: 6),
          Text(
            label,
            style: const TextStyle(
              color: AppColors.ink,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}
