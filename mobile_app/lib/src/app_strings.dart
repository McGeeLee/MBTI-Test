import 'models.dart';

class AppStrings {
  const AppStrings._(this.locale);

  final AppLocale locale;

  static AppStrings of(AppLocale locale) => AppStrings._(locale);

  static const _languageNames = {
    AppLocale.vi: {
      AppLocale.vi: 'Tiếng Việt',
      AppLocale.en: 'English',
      AppLocale.ko: '한국어',
      AppLocale.ja: '日本語',
      AppLocale.zh: '中文',
    },
    AppLocale.en: {
      AppLocale.vi: 'Vietnamese',
      AppLocale.en: 'English',
      AppLocale.ko: 'Korean',
      AppLocale.ja: 'Japanese',
      AppLocale.zh: 'Chinese',
    },
    AppLocale.ko: {
      AppLocale.vi: '베트남어',
      AppLocale.en: '영어',
      AppLocale.ko: '한국어',
      AppLocale.ja: '일본어',
      AppLocale.zh: '중국어',
    },
    AppLocale.ja: {
      AppLocale.vi: 'ベトナム語',
      AppLocale.en: '英語',
      AppLocale.ko: '韓国語',
      AppLocale.ja: '日本語',
      AppLocale.zh: '中国語',
    },
    AppLocale.zh: {
      AppLocale.vi: '越南语',
      AppLocale.en: '英语',
      AppLocale.ko: '韩语',
      AppLocale.ja: '日语',
      AppLocale.zh: '中文',
    },
  };

  String languageName(AppLocale target) => _languageNames[locale]![target]!;

  String get appName => switch (locale) {
        AppLocale.vi => 'Personality Type',
        AppLocale.en => 'Personality Type',
        AppLocale.ko => 'Personality Type',
        AppLocale.ja => 'Personality Type',
        AppLocale.zh => 'Personality Type',
      };

  String get homeTab => switch (locale) {
        AppLocale.vi => 'Trang chủ',
        AppLocale.en => 'Home',
        AppLocale.ko => '홈',
        AppLocale.ja => 'ホーム',
        AppLocale.zh => '首页',
      };
  String get libraryTab => switch (locale) {
        AppLocale.vi => 'Thư viện',
        AppLocale.en => 'Library',
        AppLocale.ko => '라이브러리',
        AppLocale.ja => 'ライブラリ',
        AppLocale.zh => '资料库',
      };
  String get historyTab => switch (locale) {
        AppLocale.vi => 'Lịch sử',
        AppLocale.en => 'History',
        AppLocale.ko => '기록',
        AppLocale.ja => '履歴',
        AppLocale.zh => '历史',
      };
  String get aboutTab => switch (locale) {
        AppLocale.vi => 'Giới thiệu',
        AppLocale.en => 'About',
        AppLocale.ko => '소개',
        AppLocale.ja => '概要',
        AppLocale.zh => '关于',
      };

  String get splashTagline => switch (locale) {
        AppLocale.vi => 'Khám phá mã tính cách của bạn',
        AppLocale.en => 'Discover your personality code',
        AppLocale.ko => '당신의 성격 코드를 발견하세요',
        AppLocale.ja => 'あなたの性格コードを見つけよう',
        AppLocale.zh => '发现你的性格代码',
      };
  String get splashBody => switch (locale) {
        AppLocale.vi => 'Ứng dụng MBTI mobile với dữ liệu đa ngôn ngữ và trải nghiệm làm bài mượt hơn.',
        AppLocale.en => 'A mobile MBTI app with multilingual content and a cleaner test experience.',
        AppLocale.ko => '다국어 콘텐츠와 더 깔끔한 테스트 경험을 담은 MBTI 모바일 앱입니다.',
        AppLocale.ja => '多言語コンテンツと、より快適なテスト体験を備えたMBTIモバイルアプリです。',
        AppLocale.zh => '这是一款支持多语言内容并拥有更流畅测试体验的 MBTI 移动应用。',
      };

  String get heroPill => switch (locale) {
        AppLocale.vi => 'PERSONALITY TYPE',
        AppLocale.en => 'PERSONALITY TYPE',
        AppLocale.ko => 'PERSONALITY TYPE',
        AppLocale.ja => 'PERSONALITY TYPE',
        AppLocale.zh => 'PERSONALITY TYPE',
      };
  String get heroTitle => switch (locale) {
        AppLocale.vi => 'Khám phá mã tính cách của bạn',
        AppLocale.en => 'Discover your personality code',
        AppLocale.ko => '당신의 성격 코드를 발견하세요',
        AppLocale.ja => 'あなたの性格コードを見つけよう',
        AppLocale.zh => '发现你的性格代码',
      };
  String get heroBody => switch (locale) {
        AppLocale.vi => 'Giao diện trẻ trung hơn, dữ liệu nhiều ngôn ngữ hơn và trải nghiệm làm bài tối ưu cho mobile.',
        AppLocale.en => 'A brighter mobile-first interface with multilingual data and faster test flows.',
        AppLocale.ko => '더 밝은 모바일 중심 UI와 다국어 데이터, 더 빠른 테스트 흐름을 제공합니다.',
        AppLocale.ja => 'より明るいモバイル向け UI、多言語データ、より速いテスト体験を提供します。',
        AppLocale.zh => '提供更年轻的移动端界面、多语言数据和更顺畅的测试流程。',
      };
  String get homeSectionTitle => switch (locale) {
        AppLocale.vi => 'Chọn bài test',
        AppLocale.en => 'Choose a test',
        AppLocale.ko => '테스트 선택',
        AppLocale.ja => 'テストを選ぶ',
        AppLocale.zh => '选择测试',
      };
  String get homeSectionSubtitle => switch (locale) {
        AppLocale.vi => 'Ba phiên bản với nhịp độ khác nhau. Bản tiêu chuẩn vẫn là lựa chọn cân bằng nhất.',
        AppLocale.en => 'Three versions with different depth and pacing. Standard is still the most balanced choice.',
        AppLocale.ko => '깊이와 속도가 다른 세 가지 버전이 있습니다. 표준 버전이 가장 균형 잡힌 선택입니다.',
        AppLocale.ja => '深さとテンポが異なる3つのバージョンがあります。標準版が最もバランスの良い選択です。',
        AppLocale.zh => '提供三种不同节奏与深度的版本，标准版仍然是最均衡的选择。',
      };
  String get latestResult => switch (locale) {
        AppLocale.vi => 'KẾT QUẢ GẦN NHẤT',
        AppLocale.en => 'LATEST RESULT',
        AppLocale.ko => '최근 결과',
        AppLocale.ja => '最新の結果',
        AppLocale.zh => '最近结果',
      };
  String get viewDetailedResult => switch (locale) {
        AppLocale.vi => 'Xem kết quả chi tiết',
        AppLocale.en => 'View detailed result',
        AppLocale.ko => '상세 결과 보기',
        AppLocale.ja => '詳細結果を見る',
        AppLocale.zh => '查看详细结果',
      };

  String get statOneTitle => switch (locale) {
        AppLocale.vi => '16 nhóm tính cách',
        AppLocale.en => '16 personality types',
        AppLocale.ko => '16가지 성격 유형',
        AppLocale.ja => '16の性格タイプ',
        AppLocale.zh => '16种性格类型',
      };
  String get statOneBody => switch (locale) {
        AppLocale.vi => 'Tra cứu đầy đủ thư viện MBTI bằng ngôn ngữ bạn chọn.',
        AppLocale.en => 'Browse the full MBTI library in your selected language.',
        AppLocale.ko => '선택한 언어로 전체 MBTI 라이브러리를 탐색하세요.',
        AppLocale.ja => '選択した言語で MBTI ライブラリ全体を閲覧できます。',
        AppLocale.zh => '使用所选语言浏览完整的 MBTI 资料库。',
      };
  String get statTwoTitle => switch (locale) {
        AppLocale.vi => '3 chế độ làm bài',
        AppLocale.en => '3 test modes',
        AppLocale.ko => '3가지 테스트 모드',
        AppLocale.ja => '3つのテストモード',
        AppLocale.zh => '3种测试模式',
      };
  String get statTwoBody => switch (locale) {
        AppLocale.vi => 'Bản nhanh, tiêu chuẩn và đầy đủ theo quỹ thời gian.',
        AppLocale.en => 'Quick, standard, and full versions for different time budgets.',
        AppLocale.ko => '시간에 따라 빠른 버전, 표준 버전, 전체 버전을 선택하세요.',
        AppLocale.ja => '時間に合わせて、クイック・標準・フル版を選べます。',
        AppLocale.zh => '根据时间选择快速版、标准版或完整版。',
      };
  String get statThreeTitle => switch (locale) {
        AppLocale.vi => 'Lưu local tiến độ',
        AppLocale.en => 'Local progress save',
        AppLocale.ko => '로컬 진행 저장',
        AppLocale.ja => '進行状況を端末保存',
        AppLocale.zh => '本地保存进度',
      };
  String get statThreeBody => switch (locale) {
        AppLocale.vi => 'Thoát ra vẫn tiếp tục lại đúng câu đang làm.',
        AppLocale.en => 'Leave the app and resume from the exact question later.',
        AppLocale.ko => '앱을 나가도 같은 문항부터 다시 이어서 할 수 있습니다.',
        AppLocale.ja => 'アプリを閉じても、同じ設問から再開できます。',
        AppLocale.zh => '退出后仍可从上次做到的题目继续。',
      };

  String get savedProgress => switch (locale) {
        AppLocale.vi => 'TIẾN ĐỘ ĐÃ LƯU',
        AppLocale.en => 'SAVED PROGRESS',
        AppLocale.ko => '저장된 진행 상황',
        AppLocale.ja => '保存された進行状況',
        AppLocale.zh => '已保存进度',
      };
  String get resumePromptTitle => switch (locale) {
        AppLocale.vi => 'Bạn muốn tiếp tục hay làm lại từ đầu?',
        AppLocale.en => 'Do you want to continue or restart?',
        AppLocale.ko => '이어하시겠어요, 아니면 처음부터 다시 할까요?',
        AppLocale.ja => '続けますか、それとも最初からやり直しますか？',
        AppLocale.zh => '你想继续还是重新开始？',
      };
  String resumePromptBody(String versionTitle) => switch (locale) {
        AppLocale.vi => 'Bài $versionTitle đã được lưu cục bộ. Bạn có thể tiếp tục từ vị trí cũ hoặc reset lại.',
        AppLocale.en => 'Your $versionTitle test is saved locally. You can continue from where you left off or reset it.',
        AppLocale.ko => '$versionTitle 테스트가 로컬에 저장되어 있습니다. 이어서 하거나 초기화할 수 있습니다.',
        AppLocale.ja => '$versionTitle テストは端末に保存されています。続きから始めるか、リセットできます。',
        AppLocale.zh => '$versionTitle 测试已保存在本地。你可以继续作答或重置重做。',
      };
  String get restart => switch (locale) {
        AppLocale.vi => 'Làm lại',
        AppLocale.en => 'Restart',
        AppLocale.ko => '다시 시작',
        AppLocale.ja => 'やり直す',
        AppLocale.zh => '重新开始',
      };
  String get resume => switch (locale) {
        AppLocale.vi => 'Tiếp tục',
        AppLocale.en => 'Continue',
        AppLocale.ko => '계속하기',
        AppLocale.ja => '続ける',
        AppLocale.zh => '继续',
      };

  String get resultTitle => switch (locale) {
        AppLocale.vi => 'Kết quả MBTI',
        AppLocale.en => 'MBTI Result',
        AppLocale.ko => 'MBTI 결과',
        AppLocale.ja => 'MBTI 結果',
        AppLocale.zh => 'MBTI 结果',
      };
  String get detailedProfile => switch (locale) {
        AppLocale.vi => 'Xem hồ sơ chi tiết',
        AppLocale.en => 'View full profile',
        AppLocale.ko => '상세 프로필 보기',
        AppLocale.ja => '詳細プロフィールを見る',
        AppLocale.zh => '查看完整档案',
      };
  String get axisScores => switch (locale) {
        AppLocale.vi => 'Điểm theo từng trục',
        AppLocale.en => 'Axis scores',
        AppLocale.ko => '축별 점수',
        AppLocale.ja => '各軸のスコア',
        AppLocale.zh => '各维度得分',
      };
  String get highlightTraits => switch (locale) {
        AppLocale.vi => 'Điểm nổi bật',
        AppLocale.en => 'Highlights',
        AppLocale.ko => '주요 특징',
        AppLocale.ja => '主な特徴',
        AppLocale.zh => '亮点特征',
      };
  String get famousPeople => switch (locale) {
        AppLocale.vi => 'Người nổi tiếng cùng nhóm',
        AppLocale.en => 'Famous people with this type',
        AppLocale.ko => '같은 유형의 유명 인물',
        AppLocale.ja => '同じタイプの有名人',
        AppLocale.zh => '同类型名人',
      };

  String progressLabel(int percent) => switch (locale) {
        AppLocale.vi => 'Tiến độ $percent%',
        AppLocale.en => 'Progress $percent%',
        AppLocale.ko => '진행률 $percent%',
        AppLocale.ja => '進行率 $percent%',
        AppLocale.zh => '进度 $percent%',
      };
  String questionLabel(int current, int total) => switch (locale) {
        AppLocale.vi => 'Câu $current/$total',
        AppLocale.en => 'Question $current/$total',
        AppLocale.ko => '문항 $current/$total',
        AppLocale.ja => '設問 $current/$total',
        AppLocale.zh => '第 $current/$total 题',
      };
  String get previous => switch (locale) {
        AppLocale.vi => 'Trước',
        AppLocale.en => 'Previous',
        AppLocale.ko => '이전',
        AppLocale.ja => '前へ',
        AppLocale.zh => '上一题',
      };
  String get next => switch (locale) {
        AppLocale.vi => 'Sau',
        AppLocale.en => 'Next',
        AppLocale.ko => '다음',
        AppLocale.ja => '次へ',
        AppLocale.zh => '下一题',
      };

  String get libraryTitle => switch (locale) {
        AppLocale.vi => 'Thư viện 16 nhóm tính cách',
        AppLocale.en => 'Library of 16 personality types',
        AppLocale.ko => '16가지 성격 유형 라이브러리',
        AppLocale.ja => '16性格タイプのライブラリ',
        AppLocale.zh => '16种人格类型资料库',
      };
  String get librarySubtitle => switch (locale) {
        AppLocale.vi => 'Tra cứu nhanh từng nhóm, đọc mô tả ngắn và mở hồ sơ chi tiết ngay trong app.',
        AppLocale.en => 'Browse each type quickly, read a short summary, and open the full profile in the app.',
        AppLocale.ko => '각 유형을 빠르게 탐색하고 짧은 설명과 상세 프로필을 바로 확인하세요.',
        AppLocale.ja => '各タイプをすばやく確認し、要約と詳細プロフィールをアプリ内で開けます。',
        AppLocale.zh => '快速浏览各类型，阅读简介，并在应用内打开完整档案。',
      };

  String get historyTitle => switch (locale) {
        AppLocale.vi => 'Lịch sử làm bài',
        AppLocale.en => 'Test history',
        AppLocale.ko => '테스트 기록',
        AppLocale.ja => 'テスト履歴',
        AppLocale.zh => '测试历史',
      };
  String get historySubtitle => switch (locale) {
        AppLocale.vi => 'Toàn bộ kết quả được lưu ngay trên thiết bị để bạn mở lại, so sánh hoặc xoá từng mục.',
        AppLocale.en => 'All results are saved on the device so you can reopen, compare, or delete them anytime.',
        AppLocale.ko => '모든 결과는 기기에 저장되어 언제든 다시 열고 비교하거나 삭제할 수 있습니다.',
        AppLocale.ja => 'すべての結果は端末に保存され、いつでも再確認・比較・削除できます。',
        AppLocale.zh => '所有结果都会保存在设备上，你可以随时重新打开、比较或删除。',
      };
  String get clearAll => switch (locale) {
        AppLocale.vi => 'Xóa hết',
        AppLocale.en => 'Clear all',
        AppLocale.ko => '전체 삭제',
        AppLocale.ja => 'すべて削除',
        AppLocale.zh => '全部清除',
      };
  String get noHistoryTitle => switch (locale) {
        AppLocale.vi => 'Chưa có kết quả nào',
        AppLocale.en => 'No results yet',
        AppLocale.ko => '아직 결과가 없습니다',
        AppLocale.ja => 'まだ結果がありません',
        AppLocale.zh => '还没有任何结果',
      };
  String get noHistoryBody => switch (locale) {
        AppLocale.vi => 'Làm một bài test từ trang chủ để tạo kết quả đầu tiên và xem lịch sử tại đây.',
        AppLocale.en => 'Take a test from the home screen to create your first result and see it here.',
        AppLocale.ko => '홈 화면에서 테스트를 시작하면 첫 결과가 여기에 저장됩니다.',
        AppLocale.ja => 'ホーム画面からテストを受けると、最初の結果がここに保存されます。',
        AppLocale.zh => '从首页开始一次测试后，第一条结果就会显示在这里。',
      };
  String get openResult => switch (locale) {
        AppLocale.vi => 'Mở kết quả',
        AppLocale.en => 'Open result',
        AppLocale.ko => '결과 열기',
        AppLocale.ja => '結果を開く',
        AppLocale.zh => '打开结果',
      };
  String get deleteItem => switch (locale) {
        AppLocale.vi => 'Xóa mục này',
        AppLocale.en => 'Delete this item',
        AppLocale.ko => '이 항목 삭제',
        AppLocale.ja => 'この項目を削除',
        AppLocale.zh => '删除此项',
      };

  String get aboutTitle => switch (locale) {
        AppLocale.vi => 'Về MBTI',
        AppLocale.en => 'About MBTI',
        AppLocale.ko => 'MBTI 소개',
        AppLocale.ja => 'MBTIについて',
        AppLocale.zh => '关于 MBTI',
      };
  String get aboutSubtitle => switch (locale) {
        AppLocale.vi => 'MBTI là khung tham chiếu phổ biến để mô tả xu hướng nhận thức, ra quyết định và cách bạn tổ chức cuộc sống.',
        AppLocale.en => 'MBTI is a popular framework for describing how people process information, decide, and structure life.',
        AppLocale.ko => 'MBTI는 사람들이 정보를 인식하고 의사결정을 내리며 삶을 구조화하는 방식을 설명하는 데 널리 쓰이는 프레임워크입니다.',
        AppLocale.ja => 'MBTI は、人が情報を受け取り、意思決定し、生活を組み立てる傾向を説明するための代表的な枠組みです。',
        AppLocale.zh => 'MBTI 是一个常见框架，用于描述人们如何获取信息、做决定以及组织生活。',
      };
  String get aboutAxesTitle => switch (locale) {
        AppLocale.vi => '4 trục chính',
        AppLocale.en => '4 main dimensions',
        AppLocale.ko => '4가지 핵심 축',
        AppLocale.ja => '4つの基本軸',
        AppLocale.zh => '四个核心维度',
      };
  String get aboutUsageTitle => switch (locale) {
        AppLocale.vi => 'Lưu ý sử dụng',
        AppLocale.en => 'Usage note',
        AppLocale.ko => '사용 시 참고',
        AppLocale.ja => '利用上の注意',
        AppLocale.zh => '使用说明',
      };
  String get aboutUsageBody => switch (locale) {
        AppLocale.vi => 'Ứng dụng này là công cụ tự khám phá không chính thức. Kết quả chỉ nên được xem như tài liệu tham khảo để hiểu bản thân, không thay thế tư vấn tâm lý hoặc đánh giá chuyên môn.',
        AppLocale.en => 'This app is an informal self-discovery tool. Results should be treated as reference material, not as a replacement for professional psychological advice or assessment.',
        AppLocale.ko => '이 앱은 비공식 자기 탐색 도구입니다. 결과는 참고용으로만 활용해야 하며 전문 심리 상담이나 평가를 대체하지 않습니다.',
        AppLocale.ja => 'このアプリは非公式な自己理解ツールです。結果は参考情報として扱い、専門的な心理相談や評価の代替とは考えないでください。',
        AppLocale.zh => '本应用是非官方的自我探索工具。结果仅供参考，不能替代专业心理咨询或评估。',
      };
  String get settingsLanguageTitle => switch (locale) {
        AppLocale.vi => 'Ngôn ngữ',
        AppLocale.en => 'Language',
        AppLocale.ko => '언어',
        AppLocale.ja => '言語',
        AppLocale.zh => '语言',
      };
  String get settingsLanguageSubtitle => switch (locale) {
        AppLocale.vi => 'Vietnamese mặc định, kèm English, Korean, Japanese và Chinese.',
        AppLocale.en => 'Vietnamese by default, with English, Korean, Japanese, and Chinese available.',
        AppLocale.ko => '기본 언어는 베트남어이며 영어, 한국어, 일본어, 중국어를 지원합니다.',
        AppLocale.ja => '既定言語はベトナム語で、英語・韓国語・日本語・中国語に対応しています。',
        AppLocale.zh => '默认语言为越南语，并提供英语、韩语、日语和中文。',
      };

  String get privacyTitle => switch (locale) {
        AppLocale.vi => 'Quyền riêng tư',
        AppLocale.en => 'Privacy',
        AppLocale.ko => '개인정보 보호',
        AppLocale.ja => 'プライバシー',
        AppLocale.zh => '隐私',
      };
  String get privacyBody => switch (locale) {
        AppLocale.vi => 'Kết quả và tiến độ làm bài được lưu ngay trên thiết bị của bạn, không gửi lên máy chủ của chúng tôi. Ứng dụng hiển thị quảng cáo có thưởng của Google AdMob; AdMob có thể thu thập số nhận dạng thiết bị và dữ liệu sử dụng để phục vụ quảng cáo. Bạn có thể xem chi tiết trong chính sách quyền riêng tư.',
        AppLocale.en => 'Your results and test progress are stored on your device and are not sent to our servers. The app shows rewarded ads from Google AdMob, which may collect device identifiers and usage data to serve ads. See the privacy policy for details.',
        AppLocale.ko => '결과와 진행 상황은 기기에 저장되며 당사 서버로 전송되지 않습니다. 이 앱은 Google AdMob의 리워드 광고를 표시하며, AdMob은 광고 제공을 위해 기기 식별자와 사용 데이터를 수집할 수 있습니다. 자세한 내용은 개인정보 처리방침을 확인하세요.',
        AppLocale.ja => '結果と進行状況は端末に保存され、当社のサーバーには送信されません。本アプリは Google AdMob のリワード広告を表示し、AdMob は広告配信のために端末識別子や利用データを収集する場合があります。詳細はプライバシーポリシーをご覧ください。',
        AppLocale.zh => '你的结果和测试进度保存在设备上，不会发送到我们的服务器。应用会展示来自 Google AdMob 的激励广告，AdMob 可能会收集设备标识符和使用数据用于投放广告。详情请查看隐私政策。',
      };
  String get privacyPolicyButton => switch (locale) {
        AppLocale.vi => 'Xem chính sách quyền riêng tư',
        AppLocale.en => 'View privacy policy',
        AppLocale.ko => '개인정보 처리방침 보기',
        AppLocale.ja => 'プライバシーポリシーを見る',
        AppLocale.zh => '查看隐私政策',
      };
  String get privacyPolicyUnavailable => switch (locale) {
        AppLocale.vi => 'Không mở được liên kết. Vui lòng thử lại sau.',
        AppLocale.en => 'Could not open the link. Please try again later.',
        AppLocale.ko => '링크를 열 수 없습니다. 나중에 다시 시도하세요.',
        AppLocale.ja => 'リンクを開けませんでした。後でもう一度お試しください。',
        AppLocale.zh => '无法打开链接，请稍后再试。',
      };

  String get typeCoreTraits => switch (locale) {
        AppLocale.vi => 'Đặc điểm cốt lõi',
        AppLocale.en => 'Core traits',
        AppLocale.ko => '핵심 특징',
        AppLocale.ja => '中核となる特徴',
        AppLocale.zh => '核心特征',
      };
  String get typeStrengths => switch (locale) {
        AppLocale.vi => 'Điểm mạnh',
        AppLocale.en => 'Strengths',
        AppLocale.ko => '강점',
        AppLocale.ja => '強み',
        AppLocale.zh => '优势',
      };
  String get typeWeaknesses => switch (locale) {
        AppLocale.vi => 'Điểm mù cần lưu ý',
        AppLocale.en => 'Blind spots',
        AppLocale.ko => '주의할 약점',
        AppLocale.ja => '注意すべき弱点',
        AppLocale.zh => '需要注意的盲点',
      };
  String get typeCareers => switch (locale) {
        AppLocale.vi => 'Định hướng nghề nghiệp',
        AppLocale.en => 'Career directions',
        AppLocale.ko => '진로 방향',
        AppLocale.ja => 'キャリアの方向性',
        AppLocale.zh => '职业方向',
      };
  String get typeRelations => switch (locale) {
        AppLocale.vi => 'Quan hệ và phát triển',
        AppLocale.en => 'Relationships and growth',
        AppLocale.ko => '관계와 성장',
        AppLocale.ja => '人間関係と成長',
        AppLocale.zh => '关系与成长',
      };
  String get typeCompatible => switch (locale) {
        AppLocale.vi => 'Hợp gu',
        AppLocale.en => 'Compatible',
        AppLocale.ko => '잘 맞는 유형',
        AppLocale.ja => '相性が良い',
        AppLocale.zh => '适配类型',
      };
  String get typeChallenging => switch (locale) {
        AppLocale.vi => 'Dễ va chạm',
        AppLocale.en => 'Challenging',
        AppLocale.ko => '부딪히기 쉬운 유형',
        AppLocale.ja => 'ぶつかりやすい',
        AppLocale.zh => '容易冲突',
      };
  String get typeGrowthPath => switch (locale) {
        AppLocale.vi => 'Lộ trình phát triển',
        AppLocale.en => 'Growth path',
        AppLocale.ko => '성장 경로',
        AppLocale.ja => '成長の道筋',
        AppLocale.zh => '成长路径',
      };
  String get typeTips => switch (locale) {
        AppLocale.vi => 'Mẹo thực hành',
        AppLocale.en => 'Practice tips',
        AppLocale.ko => '실전 팁',
        AppLocale.ja => '実践のヒント',
        AppLocale.zh => '实践建议',
      };
  String get typeColorsAndRoleModels => switch (locale) {
        AppLocale.vi => 'Màu may mắn và hình mẫu',
        AppLocale.en => 'Lucky colors and role models',
        AppLocale.ko => '행운의 색과 롤모델',
        AppLocale.ja => 'ラッキーカラーとロールモデル',
        AppLocale.zh => '幸运色与代表人物',
      };

  String get quickVersion => switch (locale) {
        AppLocale.vi => 'Bản nhanh',
        AppLocale.en => 'Quick',
        AppLocale.ko => '빠른 버전',
        AppLocale.ja => 'クイック版',
        AppLocale.zh => '快速版',
      };
  String get standardVersion => switch (locale) {
        AppLocale.vi => 'Bản tiêu chuẩn',
        AppLocale.en => 'Standard',
        AppLocale.ko => '표준 버전',
        AppLocale.ja => '標準版',
        AppLocale.zh => '标准版',
      };
  String get fullVersion => switch (locale) {
        AppLocale.vi => 'Bản đầy đủ',
        AppLocale.en => 'Full',
        AppLocale.ko => '전체 버전',
        AppLocale.ja => 'フル版',
        AppLocale.zh => '完整版',
      };
}
