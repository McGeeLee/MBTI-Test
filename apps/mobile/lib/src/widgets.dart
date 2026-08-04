import 'package:flutter/material.dart';

import 'models.dart';

class AppColors {
  static const cream = Color(0xFFF8F7FF);
  static const ink = Color(0xFF161429);
  static const textMuted = Color(0xFF6E6A86);
  static const border = Color(0xFFE6E1F5);
  static const panel = Colors.white;
  static const panelSoft = Color(0xFFF6F3FF);
  static const primary = Color(0xFF6D5EF8);
  static const secondary = Color(0xFF36C6F4);
  static const accent = Color(0xFFFF8A5B);
  static const success = Color(0xFF35C98E);
  static const warning = Color(0xFFFFC14D);
  static const danger = Color(0xFFFF6B8A);
  static const navy = Color(0xFF273469);
}

class AppShadows {
  static const soft = [
    BoxShadow(
      color: Color(0x120E1025),
      blurRadius: 26,
      offset: Offset(0, 14),
    ),
    BoxShadow(
      color: Color(0x14FFFFFF),
      blurRadius: 1,
      offset: Offset(0, 1),
      spreadRadius: -0.2,
    ),
  ];
}

Color colorFromHex(String hex) {
  final normalized = hex.replaceFirst('#', '');
  return Color(int.parse('FF$normalized', radix: 16));
}

IconData iconForVersion(VersionId version) {
  switch (version) {
    case VersionId.quick:
      return Icons.bolt_rounded;
    case VersionId.standard:
      return Icons.psychology_alt_rounded;
    case VersionId.full:
      return Icons.analytics_rounded;
  }
}

Color categoryColor(String category) {
  switch (category) {
    case 'Nhà phân tích':
      return const Color(0xFF8B5CF6);
    case 'Nhà ngoại giao':
      return const Color(0xFF22C55E);
    case 'Người bảo hộ':
      return const Color(0xFF3B82F6);
    case 'Nhà thám hiểm':
      return const Color(0xFFF59E0B);
    default:
      return const Color(0xFF64748B);
  }
}

LinearGradient gradientForVersion(VersionId version) {
  switch (version) {
    case VersionId.quick:
      return const LinearGradient(
        colors: [Color(0xFFFFC14D), Color(0xFFFF8A5B)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      );
    case VersionId.standard:
      return const LinearGradient(
        colors: [Color(0xFF6D5EF8), Color(0xFF36C6F4)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      );
    case VersionId.full:
      return const LinearGradient(
        colors: [Color(0xFF9F6BFF), Color(0xFFFF6B8A)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      );
  }
}

class GradientSurface extends StatelessWidget {
  const GradientSurface({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFFF9F7FF), Color(0xFFF3F8FF), Color(0xFFFDF6FF)],
        ),
      ),
      child: Stack(
        children: [
          Positioned(
            top: -80,
            left: -30,
            child: _GlowBubble(
              size: 220,
              colors: [Color(0x406D5EF8), Color(0x1036C6F4)],
            ),
          ),
          Positioned(
            top: 90,
            right: -40,
            child: _GlowBubble(
              size: 180,
              colors: [Color(0x40FF8A5B), Color(0x10FFC14D)],
            ),
          ),
          Positioned(
            bottom: -60,
            left: 40,
            child: _GlowBubble(
              size: 180,
              colors: [Color(0x409F6BFF), Color(0x10FF6B8A)],
            ),
          ),
          child,
        ],
      ),
    );
  }
}

class _GlowBubble extends StatelessWidget {
  const _GlowBubble({required this.size, required this.colors});

  final double size;
  final List<Color> colors;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: colors,
        ),
      ),
    );
  }
}

class SectionCard extends StatelessWidget {
  const SectionCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(20),
    this.backgroundColor = AppColors.panel,
    this.borderRadius = 28,
    this.borderColor = AppColors.border,
  });

  final Widget child;
  final EdgeInsetsGeometry padding;
  final Color backgroundColor;
  final double borderRadius;
  final Color borderColor;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(borderRadius),
        border: Border.all(color: borderColor),
        boxShadow: AppShadows.soft,
      ),
      child: Padding(padding: padding, child: child),
    );
  }
}

class BrandPill extends StatelessWidget {
  const BrandPill({
    super.key,
    required this.label,
    this.icon,
    this.gradient,
    this.foregroundColor = AppColors.ink,
  });

  final String label;
  final IconData? icon;
  final Gradient? gradient;
  final Color foregroundColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        gradient:
            gradient ??
            const LinearGradient(
              colors: [Color(0x14FFFFFF), Color(0x14FFFFFF)],
            ),
        color: gradient == null ? AppColors.panelSoft : null,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 16, color: foregroundColor),
            const SizedBox(width: 6),
          ],
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w800,
              letterSpacing: 0.35,
              color: foregroundColor,
            ),
          ),
        ],
      ),
    );
  }
}

class TypeBadge extends StatelessWidget {
  const TypeBadge({
    super.key,
    required this.type,
    required this.color,
    this.large = false,
  });

  final String type;
  final Color color;
  final bool large;

  @override
  Widget build(BuildContext context) {
    final size = large ? 94.0 : 56.0;
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(large ? 28 : 18),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [color.withValues(alpha: 0.18), color.withValues(alpha: 0.06)],
        ),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      alignment: Alignment.center,
      child: Text(
        type,
        textAlign: TextAlign.center,
        style: TextStyle(
          color: color,
          fontWeight: FontWeight.w900,
          fontSize: large ? 21 : 13,
          letterSpacing: 0.2,
        ),
      ),
    );
  }
}

class EmptyState extends StatelessWidget {
  const EmptyState({
    super.key,
    required this.icon,
    required this.title,
    required this.message,
    this.action,
  });

  final IconData icon;
  final String title;
  final String message;
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    return SectionCard(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 60,
            height: 60,
            decoration: BoxDecoration(
              color: AppColors.panelSoft,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.border),
            ),
            child: Icon(icon, color: AppColors.textMuted),
          ),
          const SizedBox(height: 16),
          Text(
            title,
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 8),
          Text(
            message,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: AppColors.textMuted,
            ),
          ),
          if (action != null) ...[const SizedBox(height: 16), action!],
        ],
      ),
    );
  }
}

class ScreenHeading extends StatelessWidget {
  const ScreenHeading({
    super.key,
    required this.title,
    required this.subtitle,
    this.trailing,
  });

  final String title;
  final String subtitle;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w900,
                  color: AppColors.ink,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                subtitle,
                style: const TextStyle(
                  color: AppColors.textMuted,
                  height: 1.5,
                ),
              ),
            ],
          ),
        ),
        if (trailing != null) ...[const SizedBox(width: 12), trailing!],
      ],
    );
  }
}

class DecoratedScaffold extends StatelessWidget {
  const DecoratedScaffold({
    super.key,
    required this.child,
    this.appBar,
    this.backgroundColor = Colors.transparent,
    this.bottomNavigationBar,
  });

  final Widget child;
  final PreferredSizeWidget? appBar;
  final Color backgroundColor;
  final Widget? bottomNavigationBar;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundColor,
      appBar: appBar,
      body: child,
      bottomNavigationBar: bottomNavigationBar,
    );
  }
}
