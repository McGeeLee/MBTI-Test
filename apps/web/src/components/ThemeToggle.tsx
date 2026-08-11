import React from 'react';
import { Moon, Sun } from 'lucide-react';

import type { SupportedLocale } from '../types';

type Theme = 'light' | 'dark';
const storageKey = 'mcgeelee-theme';

const labels: Record<SupportedLocale, { light: string; dark: string }> = {
  zh: { light: '切换到日间模式', dark: '切换到夜间模式' },
  en: { light: 'Switch to light mode', dark: 'Switch to dark mode' },
  ja: { light: 'ライトモードに切り替え', dark: 'ダークモードに切り替え' },
  ko: { light: '라이트 모드로 전환', dark: '다크 모드로 전환' },
  vi: { light: 'Chuyển sang giao diện sáng', dark: 'Chuyển sang giao diện tối' },
};

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute(
    'content',
    theme === 'dark' ? '#141713' : '#faf9f7',
  );
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export const ThemeToggle: React.FC<{ locale: SupportedLocale; mobile?: boolean }> = ({ locale, mobile = false }) => {
  const [theme, setTheme] = React.useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );
  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
  const label = labels[locale][nextTheme];

  React.useEffect(() => applyTheme(theme), [theme]);

  React.useEffect(() => {
    const syncTheme = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    window.addEventListener('themechange', syncTheme);
    return () => window.removeEventListener('themechange', syncTheme);
  }, []);

  return (
    <button
      type="button"
      className={mobile ? 'theme-toggle theme-toggle-mobile' : 'theme-toggle'}
      aria-label={label}
      title={label}
      onClick={() => {
        setTheme(nextTheme);
        localStorage.setItem(storageKey, nextTheme);
      }}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      {mobile && <span>{label}</span>}
    </button>
  );
};
