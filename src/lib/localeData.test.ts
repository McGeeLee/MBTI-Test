import { describe, expect, it } from 'vitest';

import {
  getLocalizedQuestions,
  getLocalizedTypes,
  normalizeLocale,
} from './localeData';

describe('localeData', () => {
  it('loads localized question banks for every supported locale', () => {
    expect(getLocalizedQuestions('vi').quick.length).toBeGreaterThan(0);
    expect(getLocalizedQuestions('en').standard.length).toBeGreaterThan(0);
    expect(getLocalizedQuestions('ko').full.length).toBeGreaterThan(0);
    expect(getLocalizedQuestions('ja').quick[0]?.text).not.toBe(
      getLocalizedQuestions('zh').quick[0]?.text,
    );
  });

  it('loads the same 16 MBTI types in each locale', () => {
    expect(getLocalizedTypes('vi')).toHaveLength(16);
    expect(getLocalizedTypes('en')).toHaveLength(16);
    expect(getLocalizedTypes('zh')[0]?.id).toMatch(/^[EI][SN][TF][JP]$/);
  });

  it('normalizes legacy locale codes to supported web locales', () => {
    expect(normalizeLocale('zh-CN')).toBe('zh');
    expect(normalizeLocale('en')).toBe('en');
    expect(normalizeLocale('fr')).toBe('zh');
  });
});
