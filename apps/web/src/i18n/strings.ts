import { SupportedLocale, VersionId } from '../types';

export interface AboutAxis {
  title: string;
  body: string;
}

interface TypeGroupText {
  label: string;
  description: string;
}

interface TestPageText {
  loading: string;
  resultError: string;
  progress: string;
  previous: string;
  shortcuts: string;
  next: string;
}

interface NavigationText {
  brandEyebrow: string;
  home: string;
  types: string;
  profile: string;
  language: string;
  privacy: string;
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  tagline: string;
  copyright: string;
}

interface CommonText {
  pageTitle: string;
  loadingLanguage: string;
  languageLoadError: string;
}

interface HomeText {
  edition: string;
  title: string;
  subtitle: string;
  startTest: string;
  browseTypes: string;
  personalityCount: string;
  languageCount: string;
  savedHistory: string;
  masterLabel: string;
  familyCount: string;
  standardPath: string;
  start: string;
  choosePath: string;
  chooseTitle: string;
  chooseDescription: string;
  versionTags: Record<VersionId, string>;
  archetypesKicker: string;
  archetypesTitle: string;
  archetypesDescription: string;
  openLibrary: string;
  resumeKicker: string;
  resumeTitle: string;
  resumeDescription: string;
  restart: string;
  resume: string;
}

interface AboutLabelsText {
  settings: string;
  language: string;
  active: string;
  basics: string;
  notes: string;
  activeDescription: string;
}

interface ProfileText {
  kicker: string;
  title: string;
  history: string;
  clearHistory: string;
  clearConfirm: string;
  deleteConfirm: string;
  empty: string;
  startFirstTest: string;
  viewDetails: string;
  deleteResult: string;
  cancel: string;
  confirm: string;
  versionLabels: Record<VersionId, string>;
}

interface PrivacyText {
  kicker: string;
  title: string;
  paragraphs: [string, string, string];
}

interface ResultText {
  fallbackCategory: string;
  chartLabels: [string, string, string, string, string, string, string, string];
  chartDataset: string;
  scoreRadar: string;
  dimensionVerdict: string;
  coreTraits: string;
  notablePeople: string;
  openFullProfile: string;
  retake: string;
  share: string;
  shareCopied: string;
  shareUnsupported: string;
  shareError: string;
}

interface TypeDetailText {
  backToLibrary: string;
  fallbackCategory: string;
  coreTraits: string;
  luckyColors: string;
  primaryColor: string;
  careerDirections: string;
  strengths: string;
  blindSpots: string;
  relationships: string;
  bestMatches: string;
  gettingAlong: string;
  potentialFriction: string;
  growthGuide: string;
  growthPath: string;
  practicalTips: string;
  notablePeople: string;
}

export interface LocaleStrings {
  navigation: NavigationText;
  common: CommonText;
  home: HomeText;
  aboutLabels: AboutLabelsText;
  aboutTitle: string;
  aboutSubtitle: string;
  settingsLanguageTitle: string;
  settingsLanguageSubtitle: string;
  aboutAxesTitle: string;
  aboutUsageTitle: string;
  aboutUsageBody: string;
  aboutAxes: AboutAxis[];
  typeLibraryTitle: string;
  typeLibrarySubtitle: string;
  typeLibraryKicker: string;
  typeLibraryOpenProfile: string;
  typeLibraryGroups: Record<'analysts' | 'diplomats' | 'sentinels' | 'explorers', TypeGroupText>;
  profile: ProfileText;
  privacy: PrivacyText;
  result: ResultText;
  typeDetail: TypeDetailText;
  test: TestPageText;
}

const languageNames: Record<SupportedLocale, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  ko: '한국어',
  ja: '日本語',
  zh: '简体中文',
};

const languageShortNames: Record<SupportedLocale, string> = {
  vi: 'VI',
  en: 'EN',
  ko: '한',
  ja: '日',
  zh: '中',
};

const intlLocales: Record<SupportedLocale, string> = {
  vi: 'vi-VN',
  en: 'en-US',
  ko: 'ko-KR',
  ja: 'ja-JP',
  zh: 'zh-CN',
};

const localeStrings: Record<SupportedLocale, LocaleStrings> = {
  vi: {
    navigation: {
      brandEyebrow: 'Phòng khám phá tính cách',
      home: 'Trang chủ',
      types: '16 nhóm tính cách',
      profile: 'Kết quả đã lưu',
      language: 'Ngôn ngữ',
      privacy: 'Quyền riêng tư',
      skipToContent: 'Chuyển đến nội dung chính',
      openMenu: 'Mở trình đơn',
      closeMenu: 'Đóng trình đơn',
      tagline: 'Hiểu mình hơn. Nhìn rõ quy luật.',
      copyright: 'Dựa trên lý thuyết loại hình tâm lý của Jung.',
    },
    common: {
      pageTitle: 'MBTI Master | Trắc nghiệm tính cách 5 ngôn ngữ',
      loadingLanguage: 'Đang tải dữ liệu ngôn ngữ…',
      languageLoadError: 'Không thể tải dữ liệu ngôn ngữ. Hãy làm mới trang và thử lại.',
    },
    home: {
      edition: 'Phiên bản Clay',
      title: 'Giải mã kiểu tính cách của bạn',
      subtitle: 'Chọn bài đánh giá nhanh hoặc chuyên sâu, rồi khám phá 16 nhóm MBTI bằng ngôn ngữ bạn muốn.',
      startTest: 'Bắt đầu bài test',
      browseTypes: 'Xem 16 nhóm',
      personalityCount: '16 nhóm tính cách',
      languageCount: '5 ngôn ngữ',
      savedHistory: 'lưu lịch sử',
      masterLabel: 'MBTI MASTER',
      familyCount: 'Bốn nhóm lớn',
      standardPath: 'Lộ trình tiêu chuẩn',
      start: 'Bắt đầu',
      choosePath: 'Chọn lộ trình',
      chooseTitle: 'Chọn độ sâu phù hợp với hôm nay',
      chooseDescription: 'Các phiên bản dùng cùng mô hình chấm điểm, nhưng khác nhau về lượng dữ liệu dùng để xác định kết quả.',
      versionTags: { quick: 'Nhanh', standard: 'Đề xuất', full: 'Chuyên sâu' },
      archetypesKicker: '16 chân dung',
      archetypesTitle: 'Bốn nhóm lớn, mười sáu sắc thái',
      archetypesDescription: 'Thư viện tính cách luôn theo ngôn ngữ bạn chọn, giúp bạn so sánh trọn bộ ngay trong một nơi.',
      openLibrary: 'Mở thư viện',
      resumeKicker: 'Tiếp tục bài test',
      resumeTitle: 'Tiếp tục',
      resumeDescription: 'Phiên bản này còn tiến độ chưa hoàn thành. Bạn có thể tiếp tục từ câu trước hoặc làm lại từ câu đầu.',
      restart: 'Làm lại',
      resume: 'Tiếp tục',
    },
    aboutLabels: {
      settings: 'Cài đặt',
      language: 'Ngôn ngữ',
      active: 'Đang sử dụng',
      basics: 'Kiến thức MBTI',
      notes: 'Lưu ý',
      activeDescription: 'Ngôn ngữ đã chọn được áp dụng cho câu hỏi, kết quả và toàn bộ thư viện tính cách.',
    },
    profile: {
      kicker: 'Bộ nhớ',
      title: 'Kết quả đã lưu',
      history: 'Lịch sử bài test',
      clearHistory: 'Xóa lịch sử',
      clearConfirm: 'Xóa toàn bộ lịch sử bài test đã lưu? Thao tác này không thể hoàn tác.',
      deleteConfirm: 'Xóa kết quả đã lưu này?',
      empty: 'Chưa có kết quả nào được lưu.',
      startFirstTest: 'Làm bài test đầu tiên',
      viewDetails: 'Xem chi tiết',
      deleteResult: 'Xóa kết quả',
      cancel: 'Hủy',
      confirm: 'Xác nhận',
      versionLabels: { quick: 'Nhanh', standard: 'Tiêu chuẩn', full: 'Đầy đủ' },
    },
    privacy: {
      kicker: 'Quyền riêng tư',
      title: 'Chính sách quyền riêng tư',
      paragraphs: [
        'Ứng dụng lưu tiến độ bài test, lịch sử kết quả và tùy chọn ngôn ngữ ngay trong trình duyệt để bạn có thể tiếp tục bài đang làm và xem lại kết quả cũ.',
        'Phiên bản web này không dùng tài khoản phía máy chủ. Nếu xóa dữ liệu trình duyệt hoặc đổi thiết bị hay trình duyệt, dữ liệu đã lưu cục bộ sẽ không còn.',
        'Kết quả MBTI chỉ phục vụ mục đích tự khám phá và không nên được xem là tư vấn tâm lý lâm sàng hoặc chuyên môn.',
      ],
    },
    result: {
      fallbackCategory: 'Tính cách MBTI',
      chartLabels: ['Hướng ngoại', 'Giác quan', 'Lý trí', 'Nguyên tắc', 'Hướng nội', 'Trực giác', 'Cảm xúc', 'Linh hoạt'],
      chartDataset: 'Điểm theo chiều tính cách',
      scoreRadar: 'Biểu đồ điểm',
      dimensionVerdict: 'Kết quả theo 4 trục',
      coreTraits: 'Đặc điểm cốt lõi',
      notablePeople: 'Nhân vật tiêu biểu',
      openFullProfile: 'Xem hồ sơ đầy đủ',
      retake: 'Làm lại',
      share: 'Chia sẻ',
      shareCopied: 'Đã sao chép liên kết chia sẻ.',
      shareUnsupported: 'Không thể chia sẻ tại đây. Hãy sao chép địa chỉ trên thanh trình duyệt.',
      shareError: 'Không thể chia sẻ kết quả. Vui lòng thử lại.',
    },
    typeDetail: {
      backToLibrary: 'Quay lại thư viện',
      fallbackCategory: 'Nhóm MBTI',
      coreTraits: 'Đặc điểm cốt lõi',
      luckyColors: 'Màu may mắn',
      primaryColor: 'Màu chủ đạo',
      careerDirections: 'Định hướng nghề nghiệp',
      strengths: 'Thế mạnh',
      blindSpots: 'Điểm mù',
      relationships: 'Mối quan hệ',
      bestMatches: 'Nhóm phù hợp',
      gettingAlong: 'Cách hòa hợp',
      potentialFriction: 'Điểm dễ xung đột',
      growthGuide: 'Hướng dẫn phát triển',
      growthPath: 'Lộ trình phát triển',
      practicalTips: 'Gợi ý thực tế',
      notablePeople: 'Nhân vật tiêu biểu cùng nhóm',
    },
    test: {
      loading: 'Đang tải...',
      resultError: 'Đã xảy ra lỗi khi tính kết quả. Vui lòng thử lại sau.',
      progress: 'Tiến độ',
      previous: 'Câu trước',
      shortcuts: 'Phím tắt',
      next: 'Câu tiếp theo',
    },
    aboutTitle: 'Tuỳ chọn ngôn ngữ',
    aboutSubtitle:
      'Chọn ngôn ngữ bạn muốn dùng cho câu hỏi, kết quả và thư viện 16 nhóm tính cách.',
    settingsLanguageTitle: 'Ngôn ngữ hiển thị',
    settingsLanguageSubtitle:
      'Thay đổi ở đây sẽ áp dụng ngay cho dữ liệu bài test và phần mô tả tính cách.',
    aboutAxesTitle: '4 trục MBTI',
    aboutUsageTitle: 'Lưu ý khi sử dụng',
    aboutUsageBody:
      'MBTI là công cụ tự khám phá. Kết quả trong ứng dụng này nên được dùng như một điểm tham chiếu để hiểu bản thân, không thay thế đánh giá chuyên môn.',
    aboutAxes: [
      {
        title: 'Hướng ngoại (E) và Hướng nội (I)',
        body: 'Bạn lấy năng lượng từ tương tác xã hội hay từ không gian riêng và sự tập trung nội tâm.',
      },
      {
        title: 'Giác quan (S) và Trực giác (N)',
        body: 'Bạn ưu tiên dữ kiện cụ thể, trải nghiệm thực tế hay nhìn vào mô hình, ý tưởng và khả năng.',
      },
      {
        title: 'Lý trí (T) và Cảm xúc (F)',
        body: 'Bạn ra quyết định dựa trên logic khách quan hay giá trị cá nhân và tác động tới con người.',
      },
      {
        title: 'Nguyên tắc (J) và Linh hoạt (P)',
        body: 'Bạn thích sự có kế hoạch, kết cấu rõ ràng hay thích thích nghi, mở và thay đổi theo tình huống.',
      },
    ],
    typeLibraryTitle: 'Bản đồ 16 nhóm tính cách',
    typeLibrarySubtitle:
      'Khám phá chân dung, thế mạnh và kiểu hành xử nổi bật của từng nhóm MBTI bằng ngôn ngữ bạn đã chọn.',
    typeLibraryKicker: 'Bản đồ tính cách',
    typeLibraryOpenProfile: 'Mở hồ sơ',
    typeLibraryGroups: {
      analysts: {
        label: 'Nhà phân tích',
        description: 'Tư duy chiến lược, độc lập và thích giải bài toán phức tạp.',
      },
      diplomats: {
        label: 'Nhà ngoại giao',
        description: 'Giàu trực giác, cảm thông và thường dẫn dắt bằng giá trị cá nhân.',
      },
      sentinels: {
        label: 'Người bảo hộ',
        description: 'Thực tế, bền bỉ và đáng tin trong những hệ thống cần ổn định.',
      },
      explorers: {
        label: 'Nhà thám hiểm',
        description: 'Linh hoạt, giàu trải nghiệm và phản ứng nhanh với thế giới thực.',
      },
    },
  },
  en: {
    navigation: {
      brandEyebrow: 'Personality Lab',
      home: 'Home',
      types: 'Types',
      profile: 'Saved results',
      language: 'Language',
      privacy: 'Privacy',
      skipToContent: 'Skip to main content',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      tagline: 'Know yourself. Spot the pattern.',
      copyright: 'Based on Jungian psychological type theory.',
    },
    common: {
      pageTitle: 'MBTI Master | Five-language personality test',
      loadingLanguage: 'Loading language data…',
      languageLoadError: 'Unable to load language data. Please refresh and try again.',
    },
    home: {
      edition: 'Clay Edition',
      title: 'Decode your personality pattern',
      subtitle: 'Run a fast snapshot or a deeper pass, then compare the 16 MBTI types in the language you prefer.',
      startTest: 'Start the test',
      browseTypes: 'Browse types',
      personalityCount: '16 personalities',
      languageCount: '5 languages',
      savedHistory: 'saved history',
      masterLabel: 'MBTI MASTER',
      familyCount: 'Four families',
      standardPath: 'Standard path',
      start: 'Start',
      choosePath: 'Choose your path',
      chooseTitle: 'Pick the test depth that fits today',
      chooseDescription: 'Each version uses the same scoring model, but changes how much evidence the result gets before it resolves.',
      versionTags: { quick: 'Fast', standard: 'Recommended', full: 'Deep dive' },
      archetypesKicker: '16 archetypes',
      archetypesTitle: 'Four groups, sixteen signatures',
      archetypesDescription: 'The type library follows your selected language, so you can compare the full set without switching apps.',
      openLibrary: 'Open the library',
      resumeKicker: 'Resume session',
      resumeTitle: 'Continue',
      resumeDescription: 'There is unfinished progress saved for this test version. Continue where you left off or restart from question one.',
      restart: 'Restart',
      resume: 'Resume',
    },
    aboutLabels: {
      settings: 'Settings',
      language: 'Language',
      active: 'Active',
      basics: 'MBTI basics',
      notes: 'Notes',
      activeDescription: 'The selected language drives the test bank, result details, and the full type library.',
    },
    profile: {
      kicker: 'Memory',
      title: 'Saved results',
      history: 'Test history',
      clearHistory: 'Clear history',
      clearConfirm: 'Clear all saved test history? This cannot be undone.',
      deleteConfirm: 'Delete this saved result?',
      empty: 'No saved results yet.',
      startFirstTest: 'Start your first test',
      viewDetails: 'View details',
      deleteResult: 'Delete result',
      cancel: 'Cancel',
      confirm: 'Confirm',
      versionLabels: { quick: 'Quick', standard: 'Standard', full: 'Full' },
    },
    privacy: {
      kicker: 'Privacy',
      title: 'Privacy policy',
      paragraphs: [
        'This app stores your test progress, result history, and language preference locally in your browser so you can resume unfinished tests and review past results.',
        'This web version does not use a server-side account system. Clearing browser storage or using another device or browser will remove locally saved data from this experience.',
        'MBTI results in this app are for self-exploration only and should not be treated as clinical or professional psychological advice.',
      ],
    },
    result: {
      fallbackCategory: 'MBTI personality',
      chartLabels: ['Extraversion', 'Sensing', 'Thinking', 'Judging', 'Introversion', 'Intuition', 'Feeling', 'Perceiving'],
      chartDataset: 'Dimension scores',
      scoreRadar: 'Score radar',
      dimensionVerdict: 'Dimension verdict',
      coreTraits: 'Core traits',
      notablePeople: 'Notable people',
      openFullProfile: 'Open full profile',
      retake: 'Retake',
      share: 'Share',
      shareCopied: 'Share link copied to clipboard.',
      shareUnsupported: 'Sharing is unavailable here. Copy the URL from your browser bar.',
      shareError: 'Could not share this result. Please try again.',
    },
    typeDetail: {
      backToLibrary: 'Back to library',
      fallbackCategory: 'MBTI type',
      coreTraits: 'Core traits',
      luckyColors: 'Lucky colors',
      primaryColor: 'Primary color',
      careerDirections: 'Career directions',
      strengths: 'Strengths',
      blindSpots: 'Blind spots',
      relationships: 'Relationships',
      bestMatches: 'Best matches',
      gettingAlong: 'Getting along',
      potentialFriction: 'Potential friction',
      growthGuide: 'Growth guide',
      growthPath: 'Growth path',
      practicalTips: 'Practical tips',
      notablePeople: 'Notable people with this type',
    },
    test: {
      loading: 'Loading...',
      resultError: 'Something went wrong while calculating your result. Please try again.',
      progress: 'Progress',
      previous: 'Previous',
      shortcuts: 'Shortcuts',
      next: 'Next',
    },
    aboutTitle: 'Language settings',
    aboutSubtitle: 'Pick the language used for questions, results, and the 16-type library.',
    settingsLanguageTitle: 'Display language',
    settingsLanguageSubtitle:
      'Changes here apply immediately to the test bank and personality content.',
    aboutAxesTitle: 'The four MBTI axes',
    aboutUsageTitle: 'How to use this',
    aboutUsageBody:
      'MBTI is best used as a self-reflection tool. Treat these results as a starting point for understanding yourself, not a replacement for professional assessment.',
    aboutAxes: [
      {
        title: 'Extraversion (E) and Introversion (I)',
        body: 'Do you recharge through social interaction or through private space and inner focus?',
      },
      {
        title: 'Sensing (S) and Intuition (N)',
        body: 'Do you prefer concrete facts and direct experience, or patterns, ideas, and possibilities?',
      },
      {
        title: 'Thinking (T) and Feeling (F)',
        body: 'Do you decide through objective logic or through personal values and human impact?',
      },
      {
        title: 'Judging (J) and Perceiving (P)',
        body: 'Do you prefer structure and planning, or flexibility and adapting as things unfold?',
      },
    ],
    typeLibraryTitle: 'The 16-type atlas',
    typeLibrarySubtitle:
      'Browse the strengths, patterns, and signatures of each MBTI group in your selected language.',
    typeLibraryKicker: 'Type atlas',
    typeLibraryOpenProfile: 'Open profile',
    typeLibraryGroups: {
      analysts: {
        label: 'Analysts',
        description: 'Strategic, independent thinkers who enjoy complex systems and hard problems.',
      },
      diplomats: {
        label: 'Diplomats',
        description: 'Intuitive, empathetic idealists who lead with meaning and human connection.',
      },
      sentinels: {
        label: 'Sentinels',
        description: 'Reliable, steady operators who protect order and follow through.',
      },
      explorers: {
        label: 'Explorers',
        description: 'Adaptive, hands-on personalities who learn by doing and reacting fast.',
      },
    },
  },
  ko: {
    navigation: {
      brandEyebrow: '성격 탐구소',
      home: '홈',
      types: '성격 유형',
      profile: '저장된 결과',
      language: '언어',
      privacy: '개인정보',
      skipToContent: '본문으로 건너뛰기',
      openMenu: '메뉴 열기',
      closeMenu: '메뉴 닫기',
      tagline: '나를 알고, 패턴을 발견하세요.',
      copyright: '융의 심리 유형 이론을 바탕으로 합니다.',
    },
    common: {
      pageTitle: 'MBTI Master | 5개 언어 성격 검사',
      loadingLanguage: '언어 데이터를 불러오는 중…',
      languageLoadError: '언어 데이터를 불러올 수 없습니다. 새로고침 후 다시 시도해 주세요.',
    },
    home: {
      edition: '클레이 에디션',
      title: '나의 성격 패턴을 해석해 보세요',
      subtitle: '빠른 검사부터 심층 검사까지 선택하고, 원하는 언어로 16가지 MBTI 유형을 비교해 보세요.',
      startTest: '검사 시작',
      browseTypes: '유형 둘러보기',
      personalityCount: '16가지 성격',
      languageCount: '5개 언어',
      savedHistory: '결과 저장',
      masterLabel: 'MBTI MASTER',
      familyCount: '네 가지 그룹',
      standardPath: '표준 코스',
      start: '시작',
      choosePath: '검사 선택',
      chooseTitle: '오늘에 맞는 검사 깊이를 선택하세요',
      chooseDescription: '모든 버전은 같은 채점 모델을 사용하며, 결과를 판단하는 질문의 양만 달라집니다.',
      versionTags: { quick: '빠르게', standard: '추천', full: '심층' },
      archetypesKicker: '16가지 유형',
      archetypesTitle: '네 그룹, 열여섯 가지 개성',
      archetypesDescription: '유형 라이브러리도 선택한 언어로 표시되어 한곳에서 모든 유형을 비교할 수 있습니다.',
      openLibrary: '라이브러리 열기',
      resumeKicker: '검사 이어하기',
      resumeTitle: '계속하기',
      resumeDescription: '이 검사에 완료하지 않은 진행 기록이 있습니다. 이어서 하거나 첫 질문부터 다시 시작할 수 있습니다.',
      restart: '처음부터',
      resume: '이어서 하기',
    },
    aboutLabels: {
      settings: '설정',
      language: '언어',
      active: '현재 언어',
      basics: 'MBTI 기초',
      notes: '참고',
      activeDescription: '선택한 언어가 질문, 결과 상세 내용, 전체 유형 라이브러리에 적용됩니다.',
    },
    profile: {
      kicker: '기록',
      title: '저장된 결과',
      history: '검사 기록',
      clearHistory: '기록 삭제',
      clearConfirm: '저장된 검사 기록을 모두 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.',
      deleteConfirm: '이 저장 결과를 삭제할까요?',
      empty: '아직 저장된 결과가 없습니다.',
      startFirstTest: '첫 검사 시작하기',
      viewDetails: '상세 보기',
      deleteResult: '결과 삭제',
      cancel: '취소',
      confirm: '확인',
      versionLabels: { quick: '빠른 검사', standard: '표준 검사', full: '전체 검사' },
    },
    privacy: {
      kicker: '개인정보',
      title: '개인정보 처리 안내',
      paragraphs: [
        '이 앱은 진행 중인 검사, 결과 기록, 언어 설정을 브라우저에만 저장합니다. 덕분에 중단한 검사를 이어가고 이전 결과를 다시 볼 수 있습니다.',
        '웹 버전은 서버 계정을 사용하지 않습니다. 브라우저 저장 데이터를 지우거나 다른 기기 또는 브라우저를 사용하면 로컬에 저장된 데이터는 사라집니다.',
        '이 앱의 MBTI 결과는 자기 탐색을 위한 참고 자료이며 임상 또는 전문 심리 상담을 대신하지 않습니다.',
      ],
    },
    result: {
      fallbackCategory: 'MBTI 성격 유형',
      chartLabels: ['외향', '감각', '사고', '판단', '내향', '직관', '감정', '인식'],
      chartDataset: '성향 점수',
      scoreRadar: '점수 레이더',
      dimensionVerdict: '4가지 축 결과',
      coreTraits: '핵심 특성',
      notablePeople: '대표 인물',
      openFullProfile: '전체 유형 설명 보기',
      retake: '다시 검사',
      share: '공유',
      shareCopied: '공유 링크를 클립보드에 복사했습니다.',
      shareUnsupported: '여기서는 공유할 수 없습니다. 브라우저 주소창의 URL을 복사해 주세요.',
      shareError: '결과를 공유하지 못했습니다. 다시 시도해 주세요.',
    },
    typeDetail: {
      backToLibrary: '라이브러리로 돌아가기',
      fallbackCategory: 'MBTI 유형',
      coreTraits: '핵심 특성',
      luckyColors: '행운의 색',
      primaryColor: '대표 색상',
      careerDirections: '진로 방향',
      strengths: '강점',
      blindSpots: '주의할 점',
      relationships: '관계',
      bestMatches: '잘 맞는 유형',
      gettingAlong: '잘 지내는 법',
      potentialFriction: '갈등 가능성이 있는 유형',
      growthGuide: '성장 가이드',
      growthPath: '성장 방향',
      practicalTips: '실천 팁',
      notablePeople: '같은 유형의 대표 인물',
    },
    test: {
      loading: '불러오는 중...',
      resultError: '결과를 계산하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      progress: '진행률',
      previous: '이전',
      shortcuts: '단축키',
      next: '다음',
    },
    aboutTitle: '언어 설정',
    aboutSubtitle: '질문, 결과, 16가지 성격 라이브러리에 사용할 언어를 선택하세요.',
    settingsLanguageTitle: '표시 언어',
    settingsLanguageSubtitle: '여기서 바꾸면 테스트 질문과 성격 설명 데이터에 바로 반영됩니다.',
    aboutAxesTitle: 'MBTI 네 가지 축',
    aboutUsageTitle: '이 앱을 사용하는 방법',
    aboutUsageBody:
      'MBTI는 자기 이해를 돕는 도구입니다. 이 결과는 출발점으로 활용하고, 전문 평가를 대체하는 용도로 사용하지 마세요.',
    aboutAxes: [
      {
        title: '외향형 (E)과 내향형 (I)',
        body: '사람들과의 상호작용에서 에너지를 얻는지, 아니면 혼자만의 시간과 내적 집중에서 회복하는지 봅니다.',
      },
      {
        title: '감각형 (S)과 직관형 (N)',
        body: '구체적인 사실과 실제 경험을 선호하는지, 아니면 패턴과 아이디어, 가능성에 더 끌리는지 봅니다.',
      },
      {
        title: '사고형 (T)과 감정형 (F)',
        body: '객관적인 논리로 결정하는지, 아니면 개인적 가치와 사람에 대한 영향을 더 중시하는지 봅니다.',
      },
      {
        title: '판단형 (J)과 인식형 (P)',
        body: '계획과 구조를 선호하는지, 아니면 상황에 맞게 유연하게 움직이는 편인지 봅니다.',
      },
    ],
    typeLibraryTitle: '16가지 성격 아틀라스',
    typeLibrarySubtitle: '선택한 언어로 각 MBTI 그룹의 성향과 강점을 살펴보세요.',
    typeLibraryKicker: '성격 유형 지도',
    typeLibraryOpenProfile: '유형 설명 열기',
    typeLibraryGroups: {
      analysts: {
        label: '분석가형',
        description: '전략적이고 독립적이며 복잡한 문제 해결을 즐기는 유형.',
      },
      diplomats: {
        label: '외교관형',
        description: '직관과 공감이 강하고 가치 중심으로 움직이는 유형.',
      },
      sentinels: {
        label: '수호자형',
        description: '안정성과 책임감을 바탕으로 질서를 지키는 유형.',
      },
      explorers: {
        label: '탐험가형',
        description: '유연하고 실전 감각이 뛰어나며 새로운 경험에 빠르게 반응하는 유형.',
      },
    },
  },
  ja: {
    navigation: {
      brandEyebrow: '性格ラボ',
      home: 'ホーム',
      types: '性格タイプ',
      profile: '保存した結果',
      language: '言語',
      privacy: 'プライバシー',
      skipToContent: 'メインコンテンツへ移動',
      openMenu: 'メニューを開く',
      closeMenu: 'メニューを閉じる',
      tagline: '自分を知り、パターンを見つける。',
      copyright: 'ユングの心理学的類型論に基づいています。',
    },
    common: {
      pageTitle: 'MBTI Master | 5言語の性格診断',
      loadingLanguage: '言語データを読み込み中…',
      languageLoadError: '言語データを読み込めませんでした。ページを更新してもう一度お試しください。',
    },
    home: {
      edition: 'クレイ・エディション',
      title: 'あなたの性格パターンを読み解く',
      subtitle: '手軽な診断から詳細版まで選び、好きな言語で16タイプを比較できます。',
      startTest: '診断を始める',
      browseTypes: 'タイプを見る',
      personalityCount: '16タイプ',
      languageCount: '5言語',
      savedHistory: '結果を保存',
      masterLabel: 'MBTI MASTER',
      familyCount: '4つのグループ',
      standardPath: '標準コース',
      start: '始める',
      choosePath: '診断を選ぶ',
      chooseTitle: '今日に合う診断の深さを選ぼう',
      chooseDescription: 'どのバージョンも同じ採点モデルを使い、結果を導くための質問量だけが異なります。',
      versionTags: { quick: '手軽', standard: 'おすすめ', full: 'じっくり' },
      archetypesKicker: '16タイプ',
      archetypesTitle: '4グループ、16の個性',
      archetypesDescription: 'タイプライブラリも選択した言語で表示され、すべてのタイプを一か所で比較できます。',
      openLibrary: 'ライブラリを開く',
      resumeKicker: '診断を再開',
      resumeTitle: '続きから',
      resumeDescription: 'この診断には未完了の進捗があります。続きから再開するか、最初の質問からやり直せます。',
      restart: '最初から',
      resume: '再開する',
    },
    aboutLabels: {
      settings: '設定',
      language: '言語',
      active: '使用中',
      basics: 'MBTIの基本',
      notes: 'ご利用にあたって',
      activeDescription: '選択した言語は、質問、結果の詳細、タイプライブラリ全体に適用されます。',
    },
    profile: {
      kicker: '記録',
      title: '保存した結果',
      history: '診断履歴',
      clearHistory: '履歴を削除',
      clearConfirm: '保存した診断履歴をすべて削除しますか？この操作は元に戻せません。',
      deleteConfirm: 'この保存結果を削除しますか？',
      empty: '保存された結果はまだありません。',
      startFirstTest: '最初の診断を始める',
      viewDetails: '詳細を見る',
      deleteResult: '結果を削除',
      cancel: 'キャンセル',
      confirm: '確認',
      versionLabels: { quick: 'クイック', standard: '標準', full: '完全版' },
    },
    privacy: {
      kicker: 'プライバシー',
      title: 'プライバシーポリシー',
      paragraphs: [
        'このアプリは、診断の進捗、結果履歴、言語設定をブラウザ内に保存します。未完了の診断を再開したり、過去の結果を確認したりできます。',
        'Web版はサーバー上のアカウントを使用しません。ブラウザの保存データを消去した場合や、別の端末・ブラウザを使用した場合、ローカルに保存したデータは失われます。',
        'このアプリのMBTI結果は自己理解のための参考情報であり、臨床的または専門的な心理アドバイスではありません。',
      ],
    },
    result: {
      fallbackCategory: 'MBTI性格タイプ',
      chartLabels: ['外向', '感覚', '思考', '判断', '内向', '直観', '感情', '知覚'],
      chartDataset: '傾向スコア',
      scoreRadar: 'スコアチャート',
      dimensionVerdict: '4軸の結果',
      coreTraits: '主な特徴',
      notablePeople: '代表的な人物',
      openFullProfile: '詳しいタイプ解説を見る',
      retake: 'もう一度診断',
      share: '共有',
      shareCopied: '共有リンクをクリップボードにコピーしました。',
      shareUnsupported: 'ここでは共有できません。ブラウザのアドレスバーからURLをコピーしてください。',
      shareError: '結果を共有できませんでした。もう一度お試しください。',
    },
    typeDetail: {
      backToLibrary: 'ライブラリに戻る',
      fallbackCategory: 'MBTIタイプ',
      coreTraits: '主な特徴',
      luckyColors: 'ラッキーカラー',
      primaryColor: 'メインカラー',
      careerDirections: '向いている仕事',
      strengths: '強み',
      blindSpots: '注意点',
      relationships: '人間関係',
      bestMatches: '相性のよいタイプ',
      gettingAlong: 'うまく付き合うコツ',
      potentialFriction: '摩擦が起きやすいタイプ',
      growthGuide: '成長ガイド',
      growthPath: '成長の方向',
      practicalTips: '実践のヒント',
      notablePeople: '同じタイプの著名人',
    },
    test: {
      loading: '読み込み中...',
      resultError: '結果の計算中にエラーが発生しました。しばらくしてからもう一度お試しください。',
      progress: '進捗',
      previous: '前へ',
      shortcuts: 'ショートカット',
      next: '次へ',
    },
    aboutTitle: '言語設定',
    aboutSubtitle: '質問、結果、16タイプのライブラリに使う言語を選択します。',
    settingsLanguageTitle: '表示言語',
    settingsLanguageSubtitle: 'ここで変更すると、テスト問題と性格データにすぐ反映されます。',
    aboutAxesTitle: 'MBTIの4軸',
    aboutUsageTitle: '使い方',
    aboutUsageBody:
      'MBTIは自己理解のためのツールです。このアプリの結果は参考として使い、専門的な評価の代わりにはしないでください。',
    aboutAxes: [
      {
        title: '外向型 (E) と内向型 (I)',
        body: '人との交流でエネルギーを得るか、それとも一人の時間と内面への集中で回復するかを見ます。',
      },
      {
        title: '感覚型 (S) と直観型 (N)',
        body: '具体的な事実や経験を重視するか、パターンやアイデア、可能性に惹かれるかを見ます。',
      },
      {
        title: '思考型 (T) と感情型 (F)',
        body: '客観的な論理で判断するか、個人の価値観や人への影響を重視するかを見ます。',
      },
      {
        title: '判断型 (J) と知覚型 (P)',
        body: '計画性と構造を好むか、それとも柔軟に対応するほうかを見ます。',
      },
    ],
    typeLibraryTitle: '16タイプ・アトラス',
    typeLibrarySubtitle: '選択した言語で、各MBTIグループの特徴と強みを見比べられます。',
    typeLibraryKicker: 'タイプ図鑑',
    typeLibraryOpenProfile: 'タイプ詳細を開く',
    typeLibraryGroups: {
      analysts: {
        label: '分析家',
        description: '戦略的で独立心が強く、複雑な課題を解くのが得意なタイプ。',
      },
      diplomats: {
        label: '外交官',
        description: '直感と共感に優れ、価値観で人を導くタイプ。',
      },
      sentinels: {
        label: '番人',
        description: '安定性と責任感を大切にし、秩序を支えるタイプ。',
      },
      explorers: {
        label: '探検家',
        description: '柔軟で行動的、実体験から学ぶスピードが速いタイプ。',
      },
    },
  },
  zh: {
    navigation: {
      brandEyebrow: '人格实验室',
      home: '首页',
      types: '人格类型',
      profile: '历史结果',
      language: '语言',
      privacy: '隐私',
      skipToContent: '跳到主要内容',
      openMenu: '打开菜单',
      closeMenu: '关闭菜单',
      tagline: '认识自己，看见模式。',
      copyright: '基于荣格心理类型理论。',
    },
    common: {
      pageTitle: 'MBTI Master｜五语人格测试',
      loadingLanguage: '正在加载语言数据…',
      languageLoadError: '无法加载语言数据，请刷新页面后重试。',
    },
    home: {
      edition: 'CLAY 特别版',
      title: '读懂你的性格模式',
      subtitle: '选择快速测评或深入探索，再用你习惯的语言对照 16 种 MBTI 人格。',
      startTest: '开始测试',
      browseTypes: '浏览人格类型',
      personalityCount: '16 种人格',
      languageCount: '5 种语言',
      savedHistory: '自动保存记录',
      masterLabel: 'MBTI MASTER',
      familyCount: '四大人格组',
      standardPath: '标准测试',
      start: '开始',
      choosePath: '选择测试',
      chooseTitle: '选择今天适合你的测试深度',
      chooseDescription: '所有版本都使用同一套评分模型，区别在于判断结果前收集的信息量。',
      versionTags: { quick: '快速', standard: '推荐', full: '深度' },
      archetypesKicker: '16 型人格',
      archetypesTitle: '四大组别，十六种性格签名',
      archetypesDescription: '人格资料库会跟随你选择的语言，让你在同一处完整比较所有类型。',
      openLibrary: '打开人格资料库',
      resumeKicker: '继续测试',
      resumeTitle: '继续',
      resumeDescription: '这个测试版本还有未完成的进度。你可以从上次的位置继续，也可以从第一题重新开始。',
      restart: '重新开始',
      resume: '继续作答',
    },
    aboutLabels: {
      settings: '设置',
      language: '语言',
      active: '当前语言',
      basics: 'MBTI 基础',
      notes: '使用提示',
      activeDescription: '所选语言会统一用于测试题、结果详情和完整的人格资料库。',
    },
    profile: {
      kicker: '记录',
      title: '历史结果',
      history: '测试历史',
      clearHistory: '清空历史',
      clearConfirm: '确定清空所有已保存的测试历史吗？此操作无法撤销。',
      deleteConfirm: '确定删除这条测试结果吗？',
      empty: '还没有保存过测试结果。',
      startFirstTest: '开始第一次测试',
      viewDetails: '查看详情',
      deleteResult: '删除结果',
      cancel: '取消',
      confirm: '确认',
      versionLabels: { quick: '快速版', standard: '标准版', full: '完整版' },
    },
    privacy: {
      kicker: '隐私',
      title: '隐私政策',
      paragraphs: [
        '本应用会把测试进度、结果历史和语言偏好保存在你的浏览器本地，以便继续未完成的测试并回顾过去的结果。',
        '当前网页版本不使用服务器账号系统。清除浏览器存储，或更换设备、浏览器后，本地保存的数据将无法继续使用。',
        '本应用提供的 MBTI 结果仅用于自我探索，不应被视为临床诊断或专业心理建议。',
      ],
    },
    result: {
      fallbackCategory: 'MBTI 人格类型',
      chartLabels: ['外向', '感觉', '思考', '判断', '内向', '直觉', '情感', '知觉'],
      chartDataset: '维度得分',
      scoreRadar: '得分雷达图',
      dimensionVerdict: '四维倾向',
      coreTraits: '核心特质',
      notablePeople: '代表人物',
      openFullProfile: '查看完整人格档案',
      retake: '重新测试',
      share: '分享',
      shareCopied: '分享链接已复制到剪贴板。',
      shareUnsupported: '当前环境无法直接分享，请从浏览器地址栏复制链接。',
      shareError: '无法分享这条结果，请重试。',
    },
    typeDetail: {
      backToLibrary: '返回人格资料库',
      fallbackCategory: 'MBTI 人格类型',
      coreTraits: '核心特质',
      luckyColors: '幸运色',
      primaryColor: '主色',
      careerDirections: '职业方向',
      strengths: '优势',
      blindSpots: '盲点',
      relationships: '人际关系',
      bestMatches: '契合类型',
      gettingAlong: '相处建议',
      potentialFriction: '潜在摩擦',
      growthGuide: '成长指南',
      growthPath: '成长路径',
      practicalTips: '行动建议',
      notablePeople: '同类型代表人物',
    },
    test: {
      loading: '加载中...',
      resultError: '计算结果时出现错误，请稍后重试。',
      progress: '进度',
      previous: '上一题',
      shortcuts: '快捷键',
      next: '下一题',
    },
    aboutTitle: '语言设置',
    aboutSubtitle: '选择测试题库、结果页和 16 型人格资料库使用的语言。',
    settingsLanguageTitle: '显示语言',
    settingsLanguageSubtitle: '这里的变更会立即作用到题目、结果和人格资料内容。',
    aboutAxesTitle: 'MBTI 四个维度',
    aboutUsageTitle: '使用说明',
    aboutUsageBody:
      'MBTI 更适合作为自我探索工具。应用中的结果应被视为理解自己的参考，而不是专业评估的替代品。',
    aboutAxes: [
      {
        title: '外向 (E) 与内向 (I)',
        body: '你是通过与人互动获得能量，还是通过独处和内在专注来恢复状态？',
      },
      {
        title: '感觉 (S) 与直觉 (N)',
        body: '你更偏好具体事实和现实经验，还是模式、想法与可能性？',
      },
      {
        title: '思考 (T) 与情感 (F)',
        body: '你更常通过客观逻辑做决定，还是更看重个人价值与对他人的影响？',
      },
      {
        title: '判断 (J) 与知觉 (P)',
        body: '你更喜欢结构化与计划性，还是更倾向灵活应变？',
      },
    ],
    typeLibraryTitle: '16 型人格图谱',
    typeLibrarySubtitle: '用你选择的语言浏览每个 MBTI 群组的优势、行为模式与性格签名。',
    typeLibraryKicker: '人格图谱',
    typeLibraryOpenProfile: '打开人格档案',
    typeLibraryGroups: {
      analysts: {
        label: '分析家',
        description: '战略思维强、独立，喜欢复杂系统和高难问题。',
      },
      diplomats: {
        label: '外交家',
        description: '直觉敏锐、富有共情，常常由价值观驱动行动。',
      },
      sentinels: {
        label: '守护者',
        description: '务实、稳定、可靠，擅长守住秩序与责任。',
      },
      explorers: {
        label: '探险家',
        description: '灵活、重体验，擅长在真实情境里快速反应。',
      },
    },
  },
};

export function getStrings(locale: SupportedLocale): LocaleStrings {
  return localeStrings[locale];
}

export function getLanguageName(locale: SupportedLocale): string {
  return languageNames[locale];
}

export function getLanguageShortName(locale: SupportedLocale): string {
  return languageShortNames[locale];
}

export function getIntlLocale(locale: SupportedLocale): string {
  return intlLocales[locale];
}
