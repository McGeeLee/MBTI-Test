import 'app_strings.dart';
import 'models.dart';

extension MonetizationStrings on AppStrings {
  String get testAccessTitle => switch (locale) {
    AppLocale.vi => 'Quyền vào bài test',
    AppLocale.en => 'Test access',
    AppLocale.ko => '테스트 이용 권한',
    AppLocale.ja => 'テスト利用権',
    AppLocale.zh => '测试访问权限',
  };

  String get freeTrialReadyLabel => switch (locale) {
    AppLocale.vi => 'Dùng thử miễn phí sẵn sàng',
    AppLocale.en => 'Free trial ready',
    AppLocale.ko => '무료 체험 가능',
    AppLocale.ja => '無料トライアル利用可',
    AppLocale.zh => '可用免费试用',
  };

  String get freeTrialReadyBody => switch (locale) {
    AppLocale.vi =>
      'Lần đầu mở bài test mới được miễn phí. Từ lần tiếp theo, ứng dụng sẽ cần xem quảng cáo để mở thêm lượt mới.',
    AppLocale.en =>
      'Your first new test session is free. After that, each new session needs a rewarded ad unlock.',
    AppLocale.ko =>
      '첫 새 테스트 세션은 무료입니다. 이후 새 세션을 시작할 때마다 리워드 광고 잠금 해제가 필요합니다.',
    AppLocale.ja =>
      '最初の新規テストセッションは無料です。その後は、新しいセッションごとにリワード広告で解除する必要があります。',
    AppLocale.zh =>
      '首次开启新的测试会话免费。之后每次开启新的会话，都需要通过激励广告解锁。',
  };

  String rewardedCreditsReadyBody(int count) => switch (locale) {
    AppLocale.vi => 'Bạn đang có $count lượt test đã mở khóa từ quảng cáo.',
    AppLocale.en => 'You currently have $count rewarded test unlocks ready.',
    AppLocale.ko => '현재 광고로 해제된 테스트 이용권이 $count개 있습니다.',
    AppLocale.ja => '現在、広告で解除済みのテスト利用権を $count 件持っています。',
    AppLocale.zh => '你当前有 $count 次通过广告解锁的测试机会。',
  };

  String get adRequiredLabel => switch (locale) {
    AppLocale.vi => 'Cần xem quảng cáo',
    AppLocale.en => 'Ad required',
    AppLocale.ko => '광고 시청 필요',
    AppLocale.ja => '広告の視聴が必要',
    AppLocale.zh => '需要观看广告',
  };

  String adRequiredBody(String versionTitle) => switch (locale) {
    AppLocale.vi =>
      'Lần dùng thử miễn phí đã hết. Xem 1 quảng cáo có thưởng để mở thêm 1 lượt cho bài $versionTitle.',
    AppLocale.en =>
      'The free trial has been used. Watch one rewarded ad to unlock one more $versionTitle test session.',
    AppLocale.ko =>
      '무료 체험을 이미 사용했습니다. 리워드 광고 1개를 보고 $versionTitle 테스트 1회를 해제하세요.',
    AppLocale.ja =>
      '無料トライアルはすでに使用済みです。リワード広告を1本視聴すると、$versionTitle テストを1回解除できます。',
    AppLocale.zh =>
      '免费试用已用完。观看 1 条激励广告即可解锁 1 次 $versionTitle 测试。',
  };

  String get adRequiredHomeBody => switch (locale) {
    AppLocale.vi =>
      'Lần dùng thử miễn phí đã hết. Xem quảng cáo có thưởng để mở thêm từng lượt test mới mỗi khi cần.',
    AppLocale.en =>
      'The free trial has been used. Watch a rewarded ad whenever you need to unlock another new test session.',
    AppLocale.ko =>
      '무료 체험을 이미 사용했습니다. 새 테스트 세션이 필요할 때마다 리워드 광고를 시청해 잠금을 해제하세요.',
    AppLocale.ja =>
      '無料トライアルはすでに使用済みです。新しいテストを始めるたびに、必要に応じてリワード広告で解除してください。',
    AppLocale.zh =>
      '免费试用已用完。每次需要开启新的测试时，可观看激励广告进行解锁。',
  };

  String get watchRewardedAd => switch (locale) {
    AppLocale.vi => 'Xem quảng cáo để mở khóa',
    AppLocale.en => 'Watch ad to unlock',
    AppLocale.ko => '광고 보고 잠금 해제',
    AppLocale.ja => '広告を見て解除',
    AppLocale.zh => '观看广告解锁',
  };

  String get loadingAd => switch (locale) {
    AppLocale.vi => 'Đang tải quảng cáo...',
    AppLocale.en => 'Loading ad...',
    AppLocale.ko => '광고를 불러오는 중...',
    AppLocale.ja => '広告を読み込み中...',
    AppLocale.zh => '正在加载广告...',
  };

  String get rewardedAccessGranted => switch (locale) {
    AppLocale.vi => 'Đã xem xong quảng cáo. Ứng dụng đã mở thêm 1 lượt test mới.',
    AppLocale.en => 'Ad completed. One more test session is now unlocked.',
    AppLocale.ko => '광고 시청이 완료되었습니다. 테스트 1회가 추가로 해제되었습니다.',
    AppLocale.ja => '広告の視聴が完了し、テストが1回分解除されました。',
    AppLocale.zh => '广告观看完成，已额外解锁 1 次测试。',
  };

  String get rewardedAccessDismissed => switch (locale) {
    AppLocale.vi => 'Bạn đã đóng quảng cáo trước khi nhận thưởng.',
    AppLocale.en => 'The ad was closed before the reward was earned.',
    AppLocale.ko => '보상을 받기 전에 광고가 닫혔습니다.',
    AppLocale.ja => '報酬を受け取る前に広告が閉じられました。',
    AppLocale.zh => '广告在获得奖励前被关闭了。',
  };

  String get rewardedAccessUnavailable => switch (locale) {
    AppLocale.vi => 'Thiết bị này chưa sẵn sàng cho quảng cáo có thưởng.',
    AppLocale.en => 'Rewarded ads are not available on this device yet.',
    AppLocale.ko => '이 기기에서는 아직 리워드 광고를 사용할 수 없습니다.',
    AppLocale.ja => 'この端末ではまだリワード広告を利用できません。',
    AppLocale.zh => '此设备暂时无法使用激励广告。',
  };

  String get rewardedAccessFailed => switch (locale) {
    AppLocale.vi => 'Không tải được quảng cáo lúc này. Thử lại sau.',
    AppLocale.en => 'Unable to load an ad right now. Try again later.',
    AppLocale.ko => '지금은 광고를 불러올 수 없습니다. 나중에 다시 시도하세요.',
    AppLocale.ja => '現在は広告を読み込めません。しばらくしてから再試行してください。',
    AppLocale.zh => '当前无法加载广告，请稍后再试。',
  };

  String rewardedCreditsLabel(int count) => switch (locale) {
    AppLocale.vi => '$count lượt đã mở khóa',
    AppLocale.en => '$count unlocks ready',
    AppLocale.ko => '$count회 사용 가능',
    AppLocale.ja => '$count 回分を利用可能',
    AppLocale.zh => '已解锁 $count 次',
  };

  String get watchAdToStartLabel => switch (locale) {
    AppLocale.vi => 'Xem quảng cáo để bắt đầu',
    AppLocale.en => 'Watch ad to start',
    AppLocale.ko => '광고 보고 시작',
    AppLocale.ja => '広告を見て開始',
    AppLocale.zh => '观看广告后开始',
  };
}
