import { TestResult } from '../types';

export function resolveResultFromHistory(
  history: TestResult[],
  resultType: string,
  resultId?: string
): TestResult | null {
  if (resultId) {
    const exactMatch = history.find(item => item.id === resultId);
    if (exactMatch) {
      return exactMatch;
    }
  }

  return history.find(item => item.resultType === resultType.toUpperCase()) ?? null;
}
