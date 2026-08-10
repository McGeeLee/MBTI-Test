import React from 'react';
import { Layout } from '../components/Layout';
import { useLocale } from '../context/LocaleContext';
import { getStrings } from '../i18n/strings';

export const Privacy: React.FC = () => {
  const { locale } = useLocale();
  const strings = getStrings(locale).privacy;

  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-6 rounded-[2rem] border border-[var(--clay-border)] bg-white p-8 shadow-[var(--clay-shadow)]">
        <span className="clay-kicker">{strings.kicker}</span>
        <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--clay-text)]">{strings.title}</h1>
        {strings.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-7 clay-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </Layout>
  );
};
