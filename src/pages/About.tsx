import React from 'react';

import { Layout } from '../components/Layout';
import { useLocale, supportedLocales } from '../context/LocaleContext';
import { getLanguageName, getStrings } from '../i18n/strings';

export const About: React.FC = () => {
  const { locale, setLocale } = useLocale();
  const strings = getStrings(locale);

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        <section className="rounded-[2.5rem] border border-[var(--clay-border)] bg-[rgba(255,253,248,0.88)] px-8 py-10 shadow-[var(--clay-shadow)] md:px-10">
          <span className="clay-kicker">Settings</span>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[var(--clay-text)] md:text-6xl">
            {strings.aboutTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 clay-muted">{strings.aboutSubtitle}</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="glass-card rounded-[2rem] p-8">
            <span className="clay-kicker">Language</span>
            <h2 className="mt-4 text-3xl font-black text-[var(--clay-text)]">
              {strings.settingsLanguageTitle}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 clay-muted">
              {strings.settingsLanguageSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {supportedLocales.map((item) => {
                const isActive = item === locale;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLocale(item)}
                    className={`rounded-full border px-5 py-3 text-sm font-black uppercase tracking-[0.12em] transition-all ${
                      isActive
                        ? 'border-black clay-swatch-matcha text-[var(--clay-text)] shadow-[var(--clay-shadow)]'
                        : 'border-[var(--clay-border)] bg-white text-[var(--clay-muted)] shadow-[var(--clay-shadow)] hover:-translate-y-1 hover:-rotate-2 hover:text-[var(--clay-text)] hover:shadow-[var(--clay-shadow-hard)]'
                    }`}
                  >
                    {getLanguageName(item)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="clay-shell rounded-[2rem] p-8">
            <span className="clay-kicker">Active</span>
            <h2 className="mt-4 text-3xl font-black text-[var(--clay-text)]">
              {getLanguageName(locale)}
            </h2>
            <p className="mt-4 leading-7 clay-muted">
              The selected language now drives the test bank, result details, and type library.
            </p>
          </div>
        </section>

        <section className="glass-card rounded-[2rem] p-8">
          <span className="clay-kicker">MBTI Basics</span>
          <h2 className="mt-4 text-3xl font-black text-[var(--clay-text)]">
            {strings.aboutAxesTitle}
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {strings.aboutAxes.map((axis) => (
              <article
                key={axis.title}
                className="rounded-[1.75rem] border border-[var(--clay-border)] bg-white p-6 shadow-[var(--clay-shadow)]"
              >
                <h3 className="text-lg font-black text-[var(--clay-text)]">{axis.title}</h3>
                <p className="mt-3 leading-7 clay-muted">{axis.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="clay-shell rounded-[2rem] p-8">
          <span className="clay-kicker">Notes</span>
          <h2 className="mt-4 text-3xl font-black text-[var(--clay-text)]">
            {strings.aboutUsageTitle}
          </h2>
          <p className="mt-4 max-w-3xl leading-8 clay-muted">{strings.aboutUsageBody}</p>
        </section>
      </div>
    </Layout>
  );
};
