import 'package:flutter/material.dart';

import '../app.dart';
import '../app_strings.dart';
import '../models.dart';
import '../repository.dart';
import '../storage.dart';
import '../widgets.dart';
import 'result_screen.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({
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
    final history = storage.state.testHistory;

    return GradientSurface(
      child: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
          children: [
            ScreenHeading(
              title: strings.historyTitle,
              subtitle: strings.historySubtitle,
              trailing: history.isNotEmpty
                  ? TextButton.icon(
                      onPressed: () async {
                        await storage.clearHistory();
                        onDataChanged();
                      },
                      icon: const Icon(Icons.delete_sweep_outlined),
                      label: Text(strings.clearAll),
                    )
                  : null,
            ),
            const SizedBox(height: 20),
            if (history.isEmpty)
              EmptyState(
                icon: Icons.history_toggle_off_rounded,
                title: strings.noHistoryTitle,
                message: strings.noHistoryBody,
              )
            else
              ...history.map((item) {
                final type = repository.typeById(item.resultType);
                final accent = colorFromHex(type.luckyColors.primary);

                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: SectionCard(
                    borderRadius: 28,
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        TypeBadge(type: item.resultType, color: accent),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '${item.resultType} • ${type.name}',
                                style: const TextStyle(
                                  fontWeight: FontWeight.w900,
                                  color: AppColors.ink,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                '${_versionLabel(item.version)} • ${DateTime.fromMillisecondsSinceEpoch(item.timestamp)}',
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  color: AppColors.textMuted,
                                  height: 1.45,
                                ),
                              ),
                            ],
                          ),
                        ),
                        PopupMenuButton<String>(
                          onSelected: (value) async {
                            if (value == 'open') {
                              await Navigator.of(context).push(
                                MaterialPageRoute<void>(
                                  builder: (_) => ResultScreen(
                                    repository: repository,
                                    result: item,
                                  ),
                                ),
                              );
                            } else if (value == 'delete') {
                              await storage.deleteResult(item.id);
                              onDataChanged();
                            }
                          },
                          itemBuilder: (_) => [
                            PopupMenuItem(
                              value: 'open',
                              child: Text(strings.openResult),
                            ),
                            PopupMenuItem(
                              value: 'delete',
                              child: Text(strings.deleteItem),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              }),
          ],
        ),
      ),
    );
  }

  String _versionLabel(VersionId version) {
    final strings = AppStrings.of(storage.state.locale);
    switch (version) {
      case VersionId.quick:
        return strings.quickVersion;
      case VersionId.standard:
        return strings.standardVersion;
      case VersionId.full:
        return strings.fullVersion;
    }
  }
}
