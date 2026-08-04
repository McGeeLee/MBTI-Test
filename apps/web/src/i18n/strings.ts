import { SupportedLocale } from '../types';

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

export interface LocaleStrings {
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
  typeLibraryGroups: Record<'analysts' | 'diplomats' | 'sentinels' | 'explorers', TypeGroupText>;
  test: TestPageText;
}

const languageNames: Record<SupportedLocale, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  ko: '한국어',
  ja: '日本語',
  zh: '简体中文',
};

const localeStrings: Record<SupportedLocale, LocaleStrings> = {
  vi: {
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
