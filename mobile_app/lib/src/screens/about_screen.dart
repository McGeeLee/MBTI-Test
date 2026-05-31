import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../app.dart';
import '../app_strings.dart';
import '../models.dart';
import '../widgets.dart';

/// Public URL of the app's privacy policy.
///
/// Provide the real URL at build time, e.g.:
///   --dart-define=PRIVACY_POLICY_URL=https://example.com/privacy
const String _privacyPolicyUrl = String.fromEnvironment(
  'PRIVACY_POLICY_URL',
  defaultValue: 'https://example.com/privacy',
);

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final scope = AppScope.of(context);
    final strings = scope.strings;
    return GradientSurface(
      child: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
          children: [
            ScreenHeading(
              title: strings.aboutTitle,
              subtitle: strings.aboutSubtitle,
            ),
            const SizedBox(height: 20),
            SectionCard(
              borderRadius: 30,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _AboutTitle(title: strings.settingsLanguageTitle),
                  Text(
                    strings.settingsLanguageSubtitle,
                    style: const TextStyle(
                      height: 1.55,
                      color: AppColors.textMuted,
                    ),
                  ),
                  const SizedBox(height: 14),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: AppLocale.values
                        .map(
                          (locale) => ChoiceChip(
                            label: Text(strings.languageName(locale)),
                            selected: scope.locale == locale,
                            onSelected: (_) => scope.onLocaleChanged(locale),
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
                  _AboutTitle(title: strings.aboutAxesTitle),
                  ..._aboutAxes(strings.locale).map(
                    (item) => _AboutItem(title: item.$1, body: item.$2),
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
                  _AboutTitle(title: strings.aboutUsageTitle),
                  Text(
                    strings.aboutUsageBody,
                    style: const TextStyle(
                      height: 1.55,
                      color: AppColors.textMuted,
                    ),
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
                  _AboutTitle(title: strings.privacyTitle),
                  Text(
                    strings.privacyBody,
                    style: const TextStyle(
                      height: 1.55,
                      color: AppColors.textMuted,
                    ),
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    child: OutlinedButton.icon(
                      onPressed: () => _openPrivacyPolicy(context, strings),
                      icon: const Icon(Icons.privacy_tip_outlined),
                      label: Text(strings.privacyPolicyButton),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _openPrivacyPolicy(
    BuildContext context,
    AppStrings strings,
  ) async {
    final messenger = ScaffoldMessenger.of(context);
    final uri = Uri.tryParse(_privacyPolicyUrl);
    final opened = uri != null &&
        await launchUrl(uri, mode: LaunchMode.externalApplication);
    if (!opened) {
      messenger.showSnackBar(
        SnackBar(content: Text(strings.privacyPolicyUnavailable)),
      );
    }
  }

  List<(String, String)> _aboutAxes(AppLocale locale) {
    return switch (locale) {
      AppLocale.vi => const [
          (
            'Hướng ngoại (E) và Hướng nội (I)',
            'Bạn lấy năng lượng từ tương tác xã hội hay từ không gian riêng và sự tập trung nội tâm.'
          ),
          (
            'Giác quan (S) và Trực giác (N)',
            'Bạn ưu tiên dữ kiện cụ thể, trải nghiệm thực tế hay nhìn vào mô hình, ý tưởng và khả năng.'
          ),
          (
            'Lý trí (T) và Cảm xúc (F)',
            'Bạn ra quyết định dựa trên logic khách quan hay giá trị cá nhân và tác động tới con người.'
          ),
          (
            'Nguyên tắc (J) và Linh hoạt (P)',
            'Bạn thích sự có kế hoạch, kết cấu rõ ràng hay thích thích nghi, mở và thay đổi theo tình huống.'
          ),
        ],
      AppLocale.en => const [
          (
            'Extraversion (E) and Introversion (I)',
            'Do you recharge through social interaction or through private space and inner focus?'
          ),
          (
            'Sensing (S) and Intuition (N)',
            'Do you prefer concrete facts and direct experience, or patterns, ideas, and possibilities?'
          ),
          (
            'Thinking (T) and Feeling (F)',
            'Do you decide through objective logic or through personal values and human impact?'
          ),
          (
            'Judging (J) and Perceiving (P)',
            'Do you prefer structure and planning, or flexibility and adapting as things unfold?'
          ),
        ],
      AppLocale.ko => const [
          (
            '외향형 (E)과 내향형 (I)',
            '사람들과의 상호작용에서 에너지를 얻나요, 아니면 혼자만의 시간과 내적 집중에서 회복하나요?'
          ),
          (
            '감각형 (S)과 직관형 (N)',
            '구체적인 사실과 실제 경험을 선호하나요, 아니면 패턴과 아이디어, 가능성에 더 끌리나요?'
          ),
          (
            '사고형 (T)과 감정형 (F)',
            '객관적인 논리로 결정하나요, 아니면 개인적 가치와 사람에 대한 영향을 더 중시하나요?'
          ),
          (
            '판단형 (J)과 인식형 (P)',
            '계획과 구조를 선호하나요, 아니면 상황에 맞게 유연하게 움직이는 편인가요?'
          ),
        ],
      AppLocale.ja => const [
          (
            '外向型 (E) と内向型 (I)',
            '人との交流でエネルギーを得ますか、それとも一人の時間と内面への集中で回復しますか？'
          ),
          (
            '感覚型 (S) と直観型 (N)',
            '具体的な事実や実体験を重視しますか、それともパターンやアイデア、可能性に惹かれますか？'
          ),
          (
            '思考型 (T) と感情型 (F)',
            '客観的な論理で判断しますか、それとも個人の価値観や人への影響を重視しますか？'
          ),
          (
            '判断型 (J) と知覚型 (P)',
            '計画性と構造を好みますか、それとも柔軟に対応するほうですか？'
          ),
        ],
      AppLocale.zh => const [
          (
            '外向 (E) 与内向 (I)',
            '你是通过与人互动获得能量，还是通过独处和内在专注来恢复状态？'
          ),
          (
            '感觉 (S) 与直觉 (N)',
            '你更偏好具体事实和现实经验，还是模式、想法与可能性？'
          ),
          (
            '思考 (T) 与情感 (F)',
            '你更常通过客观逻辑做决定，还是更看重个人价值与对他人的影响？'
          ),
          (
            '判断 (J) 与知觉 (P)',
            '你更喜欢结构化与计划性，还是更倾向灵活应变？'
          ),
        ],
    };
  }
}

class _AboutTitle extends StatelessWidget {
  const _AboutTitle({required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: Text(
        title,
        style: Theme.of(context).textTheme.titleLarge?.copyWith(
          fontWeight: FontWeight.w900,
          color: AppColors.ink,
        ),
      ),
    );
  }
}

class _AboutItem extends StatelessWidget {
  const _AboutItem({required this.title, required this.body});

  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w800,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            body,
            style: const TextStyle(height: 1.5, color: AppColors.textMuted),
          ),
        ],
      ),
    );
  }
}
