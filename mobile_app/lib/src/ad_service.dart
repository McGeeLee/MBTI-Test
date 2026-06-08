import 'dart:async';
import 'dart:io';

import 'package:app_tracking_transparency/app_tracking_transparency.dart';
import 'package:flutter/foundation.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

enum RewardedUnlockResult { rewarded, dismissed, unavailable, failed }

class AdMobConfig {
  const AdMobConfig._();

  // Official Google test ad unit IDs — only shown during development (debug/profile).
  static const _testRewardedAndroid = 'ca-app-pub-3940256099942544/5224354917';
  static const _testRewardedIos = 'ca-app-pub-3940256099942544/1712485313';

  // Production rewarded ad unit IDs. Inject real values at build time, e.g.:
  //   flutter build appbundle --release \
  //     --dart-define=ADMOB_REWARDED_ANDROID_ID=ca-app-pub-XXXXX/YYYYY
  //   flutter build ipa --release \
  //     --dart-define=ADMOB_REWARDED_IOS_ID=ca-app-pub-XXXXX/ZZZZZ
  static const _prodRewardedAndroid = String.fromEnvironment(
    'ADMOB_REWARDED_ANDROID_ID',
  );
  static const _prodRewardedIos = String.fromEnvironment(
    'ADMOB_REWARDED_IOS_ID',
  );

  /// Returns the rewarded ad unit id for the current platform.
  ///
  /// In release builds the production id (from `--dart-define`) is required;
  /// if it is missing the getter returns `null` so the app degrades gracefully
  /// instead of serving Google test ads to real users (an AdMob policy
  /// violation). Debug/profile builds always use the official test ids.
  static String? get rewardedUnitId {
    if (kIsWeb) return null;
    if (Platform.isAndroid) {
      if (kReleaseMode) {
        return _prodRewardedAndroid.isEmpty ? null : _prodRewardedAndroid;
      }
      return _testRewardedAndroid;
    }
    if (Platform.isIOS) {
      if (kReleaseMode) {
        return _prodRewardedIos.isEmpty ? null : _prodRewardedIos;
      }
      return _testRewardedIos;
    }
    return null;
  }
}

class RewardedUnlockService {
  RewardedAd? _rewardedAd;
  Future<void>? _loadFuture;
  bool _showingAd = false;

  bool get isSupportedPlatform {
    if (kIsWeb) return false;
    return Platform.isAndroid || Platform.isIOS;
  }

  bool get hasLoadedAd => _rewardedAd != null;

  Future<void> initialize() async {
    if (!isSupportedPlatform) return;

    // 1. Ask for App Tracking Transparency (iOS only) before initializing ads
    //    so the SDK knows whether it may use the IDFA. No-op on Android.
    await _requestTrackingAuthorization();

    // 2. Gather UMP (GDPR/EEA) consent. Ads may still be served with
    //    non-personalized fallback if consent is unavailable.
    await _gatherConsent();

    // 3. Initialize the Mobile Ads SDK and warm up the first ad.
    await MobileAds.instance.initialize();
    unawaited(preload());
  }

  Future<void> _requestTrackingAuthorization() async {
    if (kIsWeb || !Platform.isIOS) return;
    try {
      final status = await AppTrackingTransparency.trackingAuthorizationStatus;
      if (status == TrackingStatus.notDetermined) {
        await AppTrackingTransparency.requestTrackingAuthorization();
      }
    } catch (_) {
      // ATT is best-effort; never block ad init if the prompt fails.
    }
  }

  Future<void> _gatherConsent() async {
    final completer = Completer<void>();
    ConsentInformation.instance.requestConsentInfoUpdate(
      ConsentRequestParameters(),
      () async {
        try {
          final isFormAvailable = await ConsentInformation.instance
              .isConsentFormAvailable();
          if (isFormAvailable) {
            await _loadAndShowConsentFormIfRequired();
          }
        } finally {
          if (!completer.isCompleted) completer.complete();
        }
      },
      (error) {
        // On failure, proceed without consent (SDK serves non-personalized).
        if (!completer.isCompleted) completer.complete();
      },
    );
    return completer.future;
  }

  Future<void> _loadAndShowConsentFormIfRequired() {
    final completer = Completer<void>();
    ConsentForm.loadAndShowConsentFormIfRequired((error) {
      // Whether or not the form was shown, continue: errors are non-fatal.
      if (!completer.isCompleted) completer.complete();
    });
    return completer.future;
  }

  Future<void> preload() {
    if (!isSupportedPlatform || _rewardedAd != null) {
      return Future<void>.value();
    }
    return _loadFuture ??= _loadAd();
  }

  Future<RewardedUnlockResult> showUnlockAd() async {
    if (!isSupportedPlatform || _showingAd) {
      return RewardedUnlockResult.unavailable;
    }

    await preload();
    final ad = _rewardedAd;
    if (ad == null) {
      return RewardedUnlockResult.failed;
    }

    _rewardedAd = null;
    _showingAd = true;

    final completer = Completer<RewardedUnlockResult>();
    var earnedReward = false;

    ad.fullScreenContentCallback = FullScreenContentCallback(
      onAdDismissedFullScreenContent: (ad) {
        ad.dispose();
        _showingAd = false;
        if (!completer.isCompleted) {
          completer.complete(
            earnedReward
                ? RewardedUnlockResult.rewarded
                : RewardedUnlockResult.dismissed,
          );
        }
        unawaited(preload());
      },
      onAdFailedToShowFullScreenContent: (ad, error) {
        ad.dispose();
        _showingAd = false;
        if (!completer.isCompleted) {
          completer.complete(RewardedUnlockResult.failed);
        }
        unawaited(preload());
      },
    );

    ad.setImmersiveMode(true);
    ad.show(onUserEarnedReward: (_, _) => earnedReward = true);
    return completer.future;
  }

  Future<void> _loadAd() async {
    final unitId = AdMobConfig.rewardedUnitId;
    if (unitId == null) {
      _loadFuture = null;
      return;
    }

    final completer = Completer<void>();
    RewardedAd.load(
      adUnitId: unitId,
      request: const AdRequest(),
      rewardedAdLoadCallback: RewardedAdLoadCallback(
        onAdLoaded: (ad) {
          _rewardedAd?.dispose();
          _rewardedAd = ad;
          completer.complete();
        },
        onAdFailedToLoad: (error) {
          completer.complete();
        },
      ),
    );

    await completer.future;
    _loadFuture = null;
  }

  void dispose() {
    _rewardedAd?.dispose();
    _rewardedAd = null;
  }
}
