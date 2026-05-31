import { describe, expect, it } from 'vitest';
import { buildDimensionRows, buildLuckyColorPalette } from './typePresentation';
import { PersonalityType, TestResult } from '../types';

describe('buildDimensionRows', () => {
  it('returns the four MBTI dimension verdicts in display order', () => {
    const result = {
      dimensions: {
        EI: 'E',
        SN: 'N',
        TF: 'X',
        JP: 'P'
      }
    } as TestResult;

    expect(buildDimensionRows(result)).toEqual([
      { label: 'E / I', value: 'E' },
      { label: 'S / N', value: 'N' },
      { label: 'T / F', value: 'X' },
      { label: 'J / P', value: 'P' }
    ]);
  });

  it('falls back to placeholders when no result is available', () => {
    expect(buildDimensionRows(null)).toEqual([
      { label: 'E / I', value: '-' },
      { label: 'S / N', value: '-' },
      { label: 'T / F', value: '-' },
      { label: 'J / P', value: '-' }
    ]);
  });
});

describe('buildLuckyColorPalette', () => {
  it('returns the primary swatch followed by distinct secondary colors', () => {
    const type = {
      luckyColors: {
        primary: '#111111',
        secondary: ['#222222', '#111111', '#333333'],
        meaning: 'Test'
      }
    } as PersonalityType;

    expect(buildLuckyColorPalette(type)).toEqual(['#111111', '#222222', '#333333']);
  });
});
