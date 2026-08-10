import type {
  LocalizedQuestionMetaMap,
  LocalizedQuestionSource,
  PersonalityType,
  QuestionBank,
  SupportedLocale,
} from '../types';

export const supportedLocales = ['vi', 'en', 'ko', 'ja', 'zh'] as const;

interface LocaleBundle {
  questions: LocalizedQuestionSource;
  types: PersonalityType[];
}

type JsonModule<T> = { default: T };

const localeLoaders: Record<SupportedLocale, () => Promise<LocaleBundle>> = {
  vi: () => loadBundle(
    import('../../../../shared/data/locales/questions.vi.json'),
    import('../../../../shared/data/locales/types.vi.json'),
  ),
  en: () => loadBundle(
    import('../../../../shared/data/locales/questions.en.json'),
    import('../../../../shared/data/locales/types.en.json'),
  ),
  ko: () => loadBundle(
    import('../../../../shared/data/locales/questions.ko.json'),
    import('../../../../shared/data/locales/types.ko.json'),
  ),
  ja: () => loadBundle(
    import('../../../../shared/data/locales/questions.ja.json'),
    import('../../../../shared/data/locales/types.ja.json'),
  ),
  zh: () => loadBundle(
    import('../../../../shared/data/locales/questions.zh.json'),
    import('../../../../shared/data/locales/types.zh.json'),
  ),
};

const localeCache = new Map<SupportedLocale, LocaleBundle>();
const pendingLoads = new Map<SupportedLocale, Promise<LocaleBundle>>();

async function loadBundle(
  questionsPromise: Promise<JsonModule<unknown>>,
  typesPromise: Promise<JsonModule<unknown>>,
): Promise<LocaleBundle> {
  const [questions, types] = await Promise.all([questionsPromise, typesPromise]);
  return {
    questions: questions.default as LocalizedQuestionSource,
    types: types.default as PersonalityType[],
  };
}

export function normalizeLocale(input: unknown): SupportedLocale {
  if (typeof input !== 'string') {
    return 'zh';
  }

  const lowered = input.toLowerCase();
  if (lowered === 'zh-cn' || lowered === 'zh_cn' || lowered.startsWith('zh-')) {
    return 'zh';
  }

  return (supportedLocales as readonly string[]).includes(lowered)
    ? (lowered as SupportedLocale)
    : 'zh';
}

export function isLocaleDataLoaded(locale: SupportedLocale): boolean {
  return localeCache.has(normalizeLocale(locale));
}

export async function loadLocaleData(locale: SupportedLocale): Promise<void> {
  const normalized = normalizeLocale(locale);
  if (localeCache.has(normalized)) {
    return;
  }

  let pending = pendingLoads.get(normalized);
  if (!pending) {
    pending = localeLoaders[normalized]();
    pendingLoads.set(normalized, pending);
  }

  try {
    localeCache.set(normalized, await pending);
  } finally {
    pendingLoads.delete(normalized);
  }
}

function getLocaleBundle(locale: SupportedLocale): LocaleBundle {
  const normalized = normalizeLocale(locale);
  const bundle = localeCache.get(normalized);
  if (!bundle) {
    throw new Error(`Locale data for "${normalized}" has not been loaded.`);
  }
  return bundle;
}

export function getLocalizedQuestions(locale: SupportedLocale): QuestionBank {
  return getLocaleBundle(locale).questions.questions;
}

export function getLocalizedQuestionMeta(locale: SupportedLocale): LocalizedQuestionMetaMap {
  return getLocaleBundle(locale).questions.meta;
}

export function getLocalizedTypes(locale: SupportedLocale): PersonalityType[] {
  return getLocaleBundle(locale).types;
}

export function getLocalizedType(
  locale: SupportedLocale,
  typeId: string,
): PersonalityType | undefined {
  return getLocalizedTypes(locale).find((type) => type.id === typeId.toUpperCase());
}
