import { describe, expect, it } from 'vitest';
import { resolveResultFromHistory } from './resultLookup';
import { TestResult } from '../types';

describe('resolveResultFromHistory', () => {
  it('prefers an explicit result id over resultType', () => {
    const history = [
      { id: 'old', resultType: 'INTJ', timestamp: 1 } as TestResult,
      { id: 'new', resultType: 'INTJ', timestamp: 2 } as TestResult
    ];

    expect(resolveResultFromHistory(history, 'INTJ', 'old')?.id).toBe('old');
  });

  it('falls back to the first matching result type when no id is provided', () => {
    const history = [
      { id: 'new', resultType: 'INTJ', timestamp: 2 } as TestResult,
      { id: 'other', resultType: 'ENFP', timestamp: 3 } as TestResult
    ];

    expect(resolveResultFromHistory(history, 'intj')?.id).toBe('new');
  });

  it('returns null when nothing matches', () => {
    const history = [
      { id: 'only', resultType: 'ENFP', timestamp: 3 } as TestResult
    ];

    expect(resolveResultFromHistory(history, 'INTJ')).toBeNull();
  });
});
