import { beforeEach, describe, expect, it } from 'vitest';

import { LocalStorageManager } from './LocalStorageManager';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('LocalStorageManager', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('normalizes legacy preferences down to a single supported language field', () => {
    localStorage.setItem(
      'mbti-app-data',
      JSON.stringify({
        userPreferences: {
          theme: 'dark',
          shortcuts: true,
          animations: false,
          language: 'zh-CN',
        },
        favorites: ['INTJ'],
      }),
    );

    const data = LocalStorageManager.load();

    expect(data.userPreferences).toEqual({ language: 'zh' });
  });

  it('persists language changes via dedicated helpers', () => {
    LocalStorageManager.saveLanguage('vi');

    expect(LocalStorageManager.getLanguage()).toBe('vi');
    expect(LocalStorageManager.load().userPreferences).toEqual({ language: 'vi' });
  });
});
