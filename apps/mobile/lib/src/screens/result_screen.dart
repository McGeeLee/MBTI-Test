import 'package:flutter/material.dart';

import '../app.dart';
import '../models.dart';
import '../repository.dart';
import '../widgets.dart';
import 'type_detail_screen.dart';

class ResultScreen extends StatelessWidget {
  const ResultScreen({
    super.key,
    required this.repository,
    required this.result,
  });

  final MbtiRepository repository;
  final TestResultModel result;

  @override
  Widget build(BuildContext context) {
    final strings = AppScope.of(context).strings;
    final type = repository.typeById(result.resultType);
    final accent = colorFromHex(type.luckyColors.primary);

    return GradientSurface(
      child: DecoratedScaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(title: Text(strings.resultTitle)),
        child: SafeArea(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
            children: [
              SectionCard(
                borderRadius: 34,
                padding: const EdgeInsets.all(0),
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(34),
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [
                        accent.withValues(alpha: 0.98),
                        accent.withValues(alpha: 0.74),
                        AppColors.secondary.withValues(alpha: 0.88),
                      ],
                    ),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(22, 24, 22, 24),
                    child: Column(
                      children: [
                        TypeBadge(type: type.id, color: Colors.white, large: true),
                        const SizedBox(height: 16),
                        BrandPill(
                          label: type.category,
                          icon: Icons.auto_awesome_rounded,
                          foregroundColor: Colors.white,
                          gradient: const LinearGradient(
                            colors: [Color(0x30FFFFFF), Color(0x18FFFFFF)],
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          '${type.id} • ${type.name}',
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                            fontWeight: FontWeight.w900,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          type.summary,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            color: Color(0xF5FFFFFF),
                            height: 1.6,
                            fontSize: 15,
                          ),
                        ),
                        const SizedBox(height: 20),
                        SizedBox(
                          width: double.infinity,
                          child: FilledButton.icon(
                            onPressed: () {
                              Navigator.of(context).push(
                                MaterialPageRoute<void>(
                                  builder: (_) => TypeDetailScreen(type: type),
                                ),
                              );
                            },
                            style: FilledButton.styleFrom(
                              backgroundColor: Colors.white,
                              foregroundColor: AppColors.ink,
                            ),
                            icon: const Icon(Icons.menu_book_rounded),
                            label: Text(strings.detailedProfile),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              SectionCard(
                borderRadius: 30,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      strings.axisScores,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    const SizedBox(height: 18),
                    _DimensionBar(
                      leftLabel: 'E',
                      rightLabel: 'I',
                      leftValue: result.scores.e,
                      rightValue: result.scores.i,
                      color: accent,
                    ),
                    const SizedBox(height: 14),
                    _DimensionBar(
                      leftLabel: 'S',
                      rightLabel: 'N',
                      leftValue: result.scores.s,
                      rightValue: result.scores.n,
                      color: accent,
                    ),
                    const SizedBox(height: 14),
                    _DimensionBar(
                      leftLabel: 'T',
                      rightLabel: 'F',
                      leftValue: result.scores.t,
                      rightValue: result.scores.f,
                      color: accent,
                    ),
                    const SizedBox(height: 14),
                    _DimensionBar(
                      leftLabel: 'J',
                      rightLabel: 'P',
                      leftValue: result.scores.j,
                      rightValue: result.scores.p,
                      color: accent,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              SectionCard(
                borderRadius: 30,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      strings.highlightTraits,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Wrap(
                      spacing: 10,
                      runSpacing: 10,
                      children: type.description.traits
                          .take(4)
                          .map(
                            (item) => Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 14,
                                vertical: 10,
                              ),
                              decoration: BoxDecoration(
                                color: accent.withValues(alpha: 0.09),
                                borderRadius: BorderRadius.circular(18),
                                border: Border.all(
                                  color: accent.withValues(alpha: 0.18),
                                ),
                              ),
                              child: Text(
                                item,
                                style: TextStyle(
                                  color: accent,
                                  fontWeight: FontWeight.w700,
                                ),
                              ),
                            ),
                          )
                          .toList(),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              SectionCard(
                borderRadius: 30,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      strings.famousPeople,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    const SizedBox(height: 12),
                    ...type.famousPeople.take(4).map(
                      (person) => Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: AppColors.panelSoft,
                          borderRadius: BorderRadius.circular(22),
                        ),
                        child: Row(
                          children: [
                            CircleAvatar(
                              backgroundColor: accent.withValues(alpha: 0.15),
                              child: Text(
                                person.name.substring(0, 1),
                                style: TextStyle(
                                  color: accent,
                                  fontWeight: FontWeight.w800,
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    person.name,
                                    style: const TextStyle(
                                      fontWeight: FontWeight.w800,
                                      color: AppColors.ink,
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    person.title,
                                    style: const TextStyle(
                                      color: AppColors.textMuted,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _DimensionBar extends StatelessWidget {
  const _DimensionBar({
    required this.leftLabel,
    required this.rightLabel,
    required this.leftValue,
    required this.rightValue,
    required this.color,
  });

  final String leftLabel;
  final String rightLabel;
  final int leftValue;
  final int rightValue;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final total = (leftValue + rightValue).clamp(1, 1000);
    final ratio = leftValue / total;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              '$leftLabel $leftValue',
              style: const TextStyle(
                fontWeight: FontWeight.w800,
                color: AppColors.ink,
              ),
            ),
            const Spacer(),
            Text(
              '$rightLabel $rightValue',
              style: const TextStyle(
                fontWeight: FontWeight.w800,
                color: AppColors.ink,
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Stack(
          children: [
            Container(
              height: 12,
              decoration: BoxDecoration(
                color: AppColors.border,
                borderRadius: BorderRadius.circular(999),
              ),
            ),
            FractionallySizedBox(
              widthFactor: ratio,
              child: Container(
                height: 12,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      color.withValues(alpha: 0.85),
                      AppColors.secondary.withValues(alpha: 0.95),
                    ],
                  ),
                  borderRadius: BorderRadius.circular(999),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
