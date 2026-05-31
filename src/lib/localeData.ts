import questionsEn from '../data/locales/questions.en.json';
import questionsJa from '../data/locales/questions.ja.json';
import questionsKo from '../data/locales/questions.ko.json';
import questionsVi from '../data/locales/questions.vi.json';
import questionsZh from '../data/locales/questions.zh.json';
import typesEn from '../data/locales/types.en.json';
import typesJa from '../data/locales/types.ja.json';
import typesKo from '../data/locales/types.ko.json';
import typesVi from '../data/locales/types.vi.json';
import typesZh from '../data/locales/types.zh.json';
import {
  LocalizedQuestionMetaMap,
  LocalizedQuestionSource,
  PersonalityType,
  QuestionBank,
  SupportedLocale,
} from '../types';

export const supportedLocales = ['vi', 'en', 'ko', 'ja', 'zh'] as const;

const questionSources: Record<SupportedLocale, LocalizedQuestionSource> = {
  vi: questionsVi as LocalizedQuestionSource,
  en: questionsEn as LocalizedQuestionSource,
  ko: questionsKo as LocalizedQuestionSource,
  ja: questionsJa as LocalizedQuestionSource,
  zh: questionsZh as LocalizedQuestionSource,
};

const typeSources: Record<SupportedLocale, PersonalityType[]> = {
  vi: typesVi as PersonalityType[],
  en: typesEn as PersonalityType[],
  ko: typesKo as PersonalityType[],
  ja: typesJa as PersonalityType[],
  zh: typesZh as PersonalityType[],
};

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

export function getLocalizedQuestions(locale: SupportedLocale): QuestionBank {
  return questionSources[normalizeLocale(locale)].questions;
}

export function getLocalizedQuestionMeta(locale: SupportedLocale): LocalizedQuestionMetaMap {
  return questionSources[normalizeLocale(locale)].meta;
}

export function getLocalizedTypes(locale: SupportedLocale): PersonalityType[] {
  return typeSources[normalizeLocale(locale)];
}

export function getLocalizedType(
  locale: SupportedLocale,
  typeId: string,
): PersonalityType | undefined {
  return getLocalizedTypes(locale).find((type) => type.id === typeId.toUpperCase());
}
