import { describe, expect, it } from 'vitest';

import { getStrings } from './strings';

const locales = ['vi', 'en', 'ko', 'ja', 'zh'] as const;
const mojibakePattern = /\uFFFD|(?:Ã|Â).|â(?:†|‡|€|™|œ|“|”|‘|’|–|—)|ï¼|ðŸ|è¿|ä¸|é¢|å¿|è®|ç®|æ—|é”/u;

describe('localized UI strings', () => {
  it.each(locales)('provides clean test controls for %s', (locale) => {
    const values = Object.values(getStrings(locale).test);

    expect(values).toHaveLength(6);
    expect(values.every(value => value.trim().length > 0)).toBe(true);
    expect(values.join(' ')).not.toMatch(mojibakePattern);
  });
});
