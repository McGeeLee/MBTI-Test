/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from 'react';

import { SupportedLocale } from '../types';
import { LocalStorageManager } from '../lib/LocalStorageManager';
import {
  isLocaleDataLoaded,
  loadLocaleData,
  normalizeLocale,
  supportedLocales,
} from '../lib/localeData';

interface LocaleContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => LocalStorageManager.getLanguage());
  const [loadedLocale, setLoadedLocale] = useState<SupportedLocale | null>(() =>
    isLocaleDataLoaded(LocalStorageManager.getLanguage()) ? LocalStorageManager.getLanguage() : null,
  );
  const [loadError, setLoadError] = useState(false);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        const normalized = normalizeLocale(nextLocale);
        setLoadedLocale(isLocaleDataLoaded(normalized) ? normalized : null);
        setLoadError(false);
        setLocaleState(normalized);
        LocalStorageManager.saveLanguage(normalized);
        document.documentElement.lang = normalized;
      },
    }),
    [locale],
  );

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  React.useEffect(() => {
    let isCurrent = true;
    void loadLocaleData(locale)
      .then(() => {
        if (isCurrent) setLoadedLocale(locale);
      })
      .catch(() => {
        if (isCurrent) setLoadError(true);
      });

    return () => {
      isCurrent = false;
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>
      {loadedLocale === locale ? children : <LocaleLoadingState hasError={loadError} />}
    </LocaleContext.Provider>
  );
};

const LocaleLoadingState: React.FC<{ hasError: boolean }> = ({ hasError }) => (
  <main className="flex min-h-screen items-center justify-center bg-[var(--clay-bg)] px-6 text-center">
    <div aria-live="polite" className="clay-shell max-w-md p-8">
      <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[var(--clay-border)] border-t-[var(--clay-blueberry)]" />
      <p className="font-semibold text-[var(--clay-text)]">
        {hasError ? 'Unable to load language data. Please refresh and try again.' : 'Loading language data…'}
      </p>
    </div>
  </main>
);

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }

  return context;
}

export { supportedLocales };
