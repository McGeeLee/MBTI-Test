import { SupportedLocale, TestResult, VersionId } from '../types';
import { normalizeLocale } from './localeData';

export interface TestProgress {
  version: VersionId;
  answers: Record<number, 'A' | 'B'>;
  currentIndex: number;
  startTime: number;
  lastUpdate: number;
}

interface LocalStorageData {
  savedTests: Record<string, TestProgress>;
  testHistory: TestResult[];
  userPreferences: {
    language: SupportedLocale;
  };
}

export class LocalStorageManager {
  private static readonly KEY = 'mbti-app-data';

  static save(data: Partial<LocalStorageData>): void {
    const existing = this.load();
    const updated: LocalStorageData = {
      ...existing,
      ...data,
      userPreferences: {
        ...existing.userPreferences,
        ...data.userPreferences,
      },
    };
    localStorage.setItem(this.KEY, JSON.stringify(updated));
  }

  static load(): LocalStorageData {
    const raw = localStorage.getItem(this.KEY);
    if (!raw) return this.getDefaultData();

    try {
      return this.normalize(JSON.parse(raw));
    } catch {
      return this.getDefaultData();
    }
  }

  static clear(): void {
    localStorage.removeItem(this.KEY);
  }

  static getLanguage(): SupportedLocale {
    return this.load().userPreferences.language;
  }

  static saveLanguage(language: SupportedLocale): void {
    this.save({
      userPreferences: {
        language: normalizeLocale(language),
      },
    });
  }

  static saveCurrentTest(version: VersionId, testData: TestProgress): void {
    const data = this.load();
    data.savedTests[version] = testData;
    this.save({ savedTests: data.savedTests });
  }

  static getSavedTest(version: VersionId): TestProgress | undefined {
    const data = this.load();
    return data.savedTests[version];
  }

  static clearCurrentTest(version: VersionId): void {
    const data = this.load();
    delete data.savedTests[version];
    this.save({ savedTests: data.savedTests });
  }

  static addTestResult(result: TestResult): void {
    const data = this.load();
    data.testHistory.unshift(result);
    this.save({ testHistory: data.testHistory });
  }

  static clearHistory(): void {
    this.save({ testHistory: [] });
  }

  static deleteTestResult(id: string): void {
    const data = this.load();
    data.testHistory = data.testHistory.filter((historyItem) => historyItem.id !== id);
    this.save({ testHistory: data.testHistory });
  }

  private static normalize(input: unknown): LocalStorageData {
    const defaults = this.getDefaultData();
    const isRecord = (value: unknown): value is Record<string, unknown> =>
      typeof value === 'object' && value !== null && !Array.isArray(value);

    if (!isRecord(input)) return defaults;

    const out: LocalStorageData = {
      ...defaults,
    };

    if (isRecord(input.userPreferences)) {
      out.userPreferences = {
        language: normalizeLocale(input.userPreferences.language),
      };
    }

    const isTestProgress = (value: unknown): value is TestProgress => {
      if (!isRecord(value)) return false;
      const version = value.version;
      const answers = value.answers;
      const currentIndex = value.currentIndex;
      const startTime = value.startTime;
      const lastUpdate = value.lastUpdate;

      const validVersion = version === 'quick' || version === 'standard' || version === 'full';
      if (!validVersion) return false;
      if (!isRecord(answers)) return false;
      if (
        typeof currentIndex !== 'number' ||
        typeof startTime !== 'number' ||
        typeof lastUpdate !== 'number'
      ) {
        return false;
      }

      for (const answer of Object.values(answers)) {
        if (answer !== 'A' && answer !== 'B') return false;
      }

      return true;
    };

    if (isRecord(input.savedTests)) {
      const savedTests: Record<string, TestProgress> = {};
      for (const [key, value] of Object.entries(input.savedTests)) {
        if (isTestProgress(value)) {
          savedTests[key] = value;
        }
      }
      out.savedTests = savedTests;
    }

    const isTestResult = (value: unknown): value is TestResult => {
      if (!isRecord(value)) return false;
      const id = value.id;
      const timestamp = value.timestamp;
      const version = value.version;
      const scores = value.scores;
      const resultType = value.resultType;
      const dimensions = value.dimensions;

      const validVersion = version === 'quick' || version === 'standard' || version === 'full';
      if (typeof id !== 'string' || typeof timestamp !== 'number' || !validVersion) return false;
      if (typeof resultType !== 'string') return false;
      if (!isRecord(scores) || !isRecord(dimensions)) return false;

      const scoreKeys = ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'] as const;
      for (const key of scoreKeys) {
        if (typeof scores[key] !== 'number') return false;
      }

      const dimensionKeys = ['EI', 'SN', 'TF', 'JP'] as const;
      for (const key of dimensionKeys) {
        if (typeof dimensions[key] !== 'string') return false;
      }

      return true;
    };

    if (Array.isArray(input.testHistory)) {
      out.testHistory = input.testHistory.filter(isTestResult);
    }

    return out;
  }

  private static getDefaultData(): LocalStorageData {
    return {
      savedTests: {},
      testHistory: [],
      userPreferences: {
        language: 'zh',
      },
    };
  }
}
