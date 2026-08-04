/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from 'react';

import { SupportedLocale } from '../types';
import { LocalStorageManager } from '../lib/LocalStorageManager';
import { normalizeLocale, supportedLocales } from '../lib/localeData';

interface LocaleContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => LocalStorageManager.getLanguage());

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        const normalized = normalizeLocale(nextLocale);
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

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }

  return context;
}

export { supportedLocales };
