import 'package:flutter/material.dart';

import '../app.dart';
import '../models.dart';
import '../repository.dart';
import '../test_engine.dart';
import '../widgets.dart';

class TestScreen extends StatefulWidget {
  const TestScreen({
    super.key,
    required this.repository,
    required this.engine,
    required this.onCompleted,
  });

  final MbtiRepository repository;
  final TestEngine engine;
  final Future<void> Function(TestResultModel result) onCompleted;

  @override
  State<TestScreen> createState() => _TestScreenState();
}

class _TestScreenState extends State<TestScreen> {
  bool _submitting = false;

  @override
  Widget build(BuildContext context) {
    final strings = AppScope.of(context).strings;
    final meta = widget.repository.versionMeta(widget.engine.version);
    final question = widget.engine.currentQuestion;
    final gradient = gradientForVersion(widget.engine.version);

    return GradientSurface(
      child: DecoratedScaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(title: Text(meta.title)),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
            child: Column(
              children: [
                _ProgressHeader(engine: widget.engine, gradient: gradient),
                const SizedBox(height: 18),
                Expanded(
                  child: SectionCard(
                    borderRadius: 32,
                    padding: const EdgeInsets.all(0),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(32),
                        gradient: const LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [Colors.white, Color(0xFFF9F6FF)],
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            BrandPill(
                              label: strings.questionLabel(
                                widget.engine.currentIndex + 1,
                                widget.engine.totalQuestions,
                              ),
                              icon: Icons.rocket_launch_rounded,
                              gradient: gradient,
                              foregroundColor: Colors.white,
                            ),
                            const SizedBox(height: 18),
                            Text(
                              question.text,
                              style: Theme.of(context).textTheme.headlineSmall
                                  ?.copyWith(
                                    fontWeight: FontWeight.w900,
                                    height: 1.35,
                                  ),
                            ),
                            const Spacer(),
                            ...question.options.map(
                              (option) => Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: _OptionTile(
                                  option: option,
                                  active:
                                      widget.engine.currentAnswer ==
                                      option.label,
                                  disabled: _submitting,
                                  gradient: gradient,
                                  onTap: () => _selectOption(option.label),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed:
                            widget.engine.currentIndex == 0 || _submitting
                            ? null
                            : () async {
                                await widget.engine.previous();
                                if (mounted) {
                                  setState(() {});
                                }
                              },
                        icon: const Icon(Icons.arrow_back_rounded),
                        label: Text(strings.previous),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: FilledButton.icon(
                        onPressed:
                            widget.engine.currentAnswer == null ||
                                widget.engine.currentIndex ==
                                    widget.engine.totalQuestions - 1 ||
                                _submitting
                            ? null
                            : () async {
                                await widget.engine.next();
                                if (mounted) {
                                  setState(() {});
                                }
                              },
                        icon: const Icon(Icons.arrow_forward_rounded),
                        label: Text(strings.next),
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
  }

  Future<void> _selectOption(String label) async {
    if (_submitting) return;

    setState(() {
      _submitting = true;
    });

    await widget.engine.answer(label);

    if (widget.engine.currentIndex == widget.engine.totalQuestions - 1 &&
        widget.engine.isComplete) {
      final result = widget.engine.calculateResult();
      await widget.onCompleted(result);
      return;
    }

    await Future<void>.delayed(const Duration(milliseconds: 220));
    await widget.engine.next();

    if (mounted) {
      setState(() {
        _submitting = false;
      });
    }
  }
}

class _ProgressHeader extends StatelessWidget {
  const _ProgressHeader({required this.engine, required this.gradient});

  final TestEngine engine;
  final Gradient gradient;

  @override
  Widget build(BuildContext context) {
    final strings = AppScope.of(context).strings;
    return SectionCard(
      borderRadius: 28,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      child: Column(
        children: [
          Row(
            children: [
              Text(
                strings.progressLabel(engine.progressPercent),
                style: const TextStyle(
                  fontWeight: FontWeight.w800,
                  color: AppColors.ink,
                ),
              ),
              const Spacer(),
              Text(
                '${engine.currentIndex + 1}/${engine.totalQuestions}',
                style: const TextStyle(color: AppColors.textMuted),
              ),
            ],
          ),
          const SizedBox(height: 12),
          ClipRRect(
            borderRadius: BorderRadius.circular(999),
            child: SizedBox(
              height: 12,
              child: Stack(
                children: [
                  Container(color: AppColors.border),
                  FractionallySizedBox(
                    widthFactor: engine.progressPercent / 100,
                    child: DecoratedBox(
                      decoration: BoxDecoration(gradient: gradient),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _OptionTile extends StatelessWidget {
  const _OptionTile({
    required this.option,
    required this.active,
    required this.disabled,
    required this.gradient,
    required this.onTap,
  });

  final OptionModel option;
  final bool active;
  final bool disabled;
  final Gradient gradient;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: disabled ? null : onTap,
      borderRadius: BorderRadius.circular(24),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          color: active ? const Color(0xFFF4F1FF) : Colors.white,
          border: Border.all(
            color: active ? AppColors.primary : AppColors.border,
            width: active ? 2 : 1,
          ),
          boxShadow: active ? AppShadows.soft : null,
        ),
        child: Row(
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 180),
              width: 46,
              height: 46,
              decoration: BoxDecoration(
                gradient: active
                    ? gradient
                    : const LinearGradient(
                        colors: [AppColors.panelSoft, AppColors.panelSoft],
                      ),
                borderRadius: BorderRadius.circular(16),
              ),
              alignment: Alignment.center,
              child: Text(
                option.label,
                style: TextStyle(
                  fontWeight: FontWeight.w900,
                  color: active ? Colors.white : AppColors.ink,
                ),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Text(
                option.text,
                style: TextStyle(
                  height: 1.45,
                  fontWeight: active ? FontWeight.w800 : FontWeight.w600,
                  color: AppColors.ink,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
