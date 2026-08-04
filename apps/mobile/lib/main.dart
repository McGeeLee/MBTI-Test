import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'src/app.dart';
import 'src/repository.dart';
import 'src/storage.dart';
import 'src/widgets.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // The UI is designed for vertical scrolling; lock to portrait to keep a
  // consistent layout across phones and avoid landscape layout review issues.
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  final repository = MbtiRepository();
  final storage = AppStorage();

  try {
    await storage.load();
    await repository.load(storage.state.locale);
    runApp(MbtiApp(repository: repository, storage: storage));
  } catch (error) {
    runApp(
      MaterialApp(
        debugShowCheckedModeBanner: false,
        home: DecoratedScaffold(
          child: GradientSurface(
            child: Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: SectionCard(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(
                        Icons.error_outline_rounded,
                        size: 42,
                        color: AppColors.danger,
                      ),
                      const SizedBox(height: 16),
                      const Text(
                        'Unable to load personality data.',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w800,
                          color: AppColors.ink,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        '$error',
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: AppColors.textMuted,
                          height: 1.5,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
