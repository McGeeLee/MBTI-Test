import 'package:flutter/material.dart';

import '../app.dart';
import '../models.dart';
import '../widgets.dart';

class TypeDetailScreen extends StatelessWidget {
  const TypeDetailScreen({super.key, required this.type});

  final PersonalityTypeModel type;

  @override
  Widget build(BuildContext context) {
    final strings = AppScope.of(context).strings;
    final accent = colorFromHex(type.luckyColors.primary);

    return GradientSurface(
      child: DecoratedScaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(title: Text('${type.id} • ${type.name}')),
        child: SafeArea(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
            children: [
              SectionCard(
                borderRadius: 34,
                child: Column(
                  children: [
                    TypeBadge(type: type.id, color: accent, large: true),
                    const SizedBox(height: 16),
                    BrandPill(
                      label: type.category,
                      icon: Icons.auto_awesome_rounded,
                      gradient: LinearGradient(
                        colors: [
                          accent.withValues(alpha: 0.16),
                          accent.withValues(alpha: 0.06),
                        ],
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      type.summary,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 16,
                        height: 1.55,
                        color: AppColors.textMuted,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              _BulletSection(
                title: strings.typeCoreTraits,
                icon: Icons.auto_awesome_rounded,
                color: accent,
                items: type.description.traits,
              ),
              const SizedBox(height: 16),
              _BulletSection(
                title: strings.typeStrengths,
                icon: Icons.trending_up_rounded,
                color: AppColors.success,
                items: type.description.strengths,
              ),
              const SizedBox(height: 16),
              _BulletSection(
                title: strings.typeWeaknesses,
                icon: Icons.warning_amber_rounded,
                color: AppColors.danger,
                items: type.description.weaknesses,
              ),
              const SizedBox(height: 16),
              _BulletSection(
                title: strings.typeCareers,
                icon: Icons.work_outline_rounded,
                color: AppColors.secondary,
                items: type.description.careers,
              ),
              const SizedBox(height: 16),
              SectionCard(
                borderRadius: 30,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      strings.typeRelations,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w900,
                        color: AppColors.ink,
                      ),
                    ),
                    const SizedBox(height: 12),
                    _TagWrap(
                      title: strings.typeCompatible,
                      items: type.relationships.compatible,
                      color: accent,
                    ),
                    const SizedBox(height: 12),
                    _TagWrap(
                      title: strings.typeChallenging,
                      items: type.relationships.challenging,
                      color: AppColors.primary,
                    ),
                    const SizedBox(height: 12),
                    Text(
                      type.relationships.advice,
                      style: const TextStyle(
                        height: 1.5,
                        color: AppColors.textMuted,
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Divider(),
                    const SizedBox(height: 8),
                    Text(
                      strings.typeGrowthPath,
                      style: const TextStyle(
                        fontWeight: FontWeight.w800,
                        color: AppColors.ink,
                      ),
                    ),
                    const SizedBox(height: 10),
                    ...type.development.growthPath.map(
                      (item) => _MiniBullet(item: item),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      strings.typeTips,
                      style: const TextStyle(
                        fontWeight: FontWeight.w800,
                        color: AppColors.ink,
                      ),
                    ),
                    const SizedBox(height: 10),
                    ...type.development.tips.map(
                      (item) => _MiniBullet(item: item),
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
                      strings.typeColorsAndRoleModels,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w900,
                        color: AppColors.ink,
                      ),
                    ),
                    const SizedBox(height: 14),
                    Row(
                      children: [
                        Container(
                          width: 52,
                          height: 52,
                          decoration: BoxDecoration(
                            color: accent,
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Text(
                            type.luckyColors.meaning,
                            style: const TextStyle(
                              color: AppColors.textMuted,
                              height: 1.45,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 14),
                    ...type.famousPeople.map(
                      (person) => Container(
                        margin: const EdgeInsets.only(bottom: 10),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppColors.panelSoft,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          children: [
                            CircleAvatar(
                              backgroundColor: accent.withValues(alpha: 0.12),
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

class _BulletSection extends StatelessWidget {
  const _BulletSection({
    required this.title,
    required this.icon,
    required this.color,
    required this.items,
  });

  final String title;
  final IconData icon;
  final Color color;
  final List<String> items;

  @override
  Widget build(BuildContext context) {
    return SectionCard(
      borderRadius: 30,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color),
              const SizedBox(width: 10),
              Text(
                title,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w900,
                  color: AppColors.ink,
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          ...items.map((item) => _MiniBullet(item: item)),
        ],
      ),
    );
  }
}

class _MiniBullet extends StatelessWidget {
  const _MiniBullet({required this.item});

  final String item;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 8,
            height: 8,
            margin: const EdgeInsets.only(top: 6),
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.primary,
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              item,
              style: const TextStyle(height: 1.5, color: AppColors.ink),
            ),
          ),
        ],
      ),
    );
  }
}

class _TagWrap extends StatelessWidget {
  const _TagWrap({
    required this.title,
    required this.items,
    required this.color,
  });

  final String title;
  final List<String> items;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontWeight: FontWeight.w800,
            color: AppColors.ink,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: items
              .map(
                (item) => Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                  decoration: BoxDecoration(
                    color: color.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Text(
                    item,
                    style: TextStyle(color: color, fontWeight: FontWeight.w700),
                  ),
                ),
              )
              .toList(),
        ),
      ],
    );
  }
}
