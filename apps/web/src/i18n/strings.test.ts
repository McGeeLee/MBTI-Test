import { describe, expect, it } from 'vitest';

import { getStrings } from './strings';

const locales = ['vi', 'en', 'ko', 'ja', 'zh'] as const;
const mojibakePattern = /\uFFFD|(?:Ã|Â).|â(?:†|‡|€|™|œ|“|”|‘|’|–|—)|ï¼|ðŸ|è¿|ä¸|é¢|å¿|è®|ç®|æ—|é”/u;

const collectStrings = (value: unknown): string[] => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
};

describe('localized UI strings', () => {
  it.each(locales)('provides complete, clean UI copy for %s', (locale) => {
    const values = collectStrings(getStrings(locale));

    expect(values.length).toBeGreaterThan(100);
    expect(values.every(value => value.trim().length > 0)).toBe(true);
    expect(values.join(' ')).not.toMatch(mojibakePattern);
  });
});
