import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Layout } from '../components/Layout';
import { TypeIcon } from '../components/icons/TypeIcons';
import { useLocale } from '../context/LocaleContext';
import { getStrings } from '../i18n/strings';
import { getLocalizedTypes } from '../lib/localeData';
import { PersonalityType } from '../types';

const typeGroups = [
  { key: 'analysts', ids: ['INTJ', 'INTP', 'ENTJ', 'ENTP'], tone: 'clay-swatch-ube' },
  { key: 'diplomats', ids: ['INFJ', 'INFP', 'ENFJ', 'ENFP'], tone: 'clay-swatch-matcha' },
  { key: 'sentinels', ids: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'], tone: 'clay-swatch-slushie' },
  { key: 'explorers', ids: ['ISTP', 'ISFP', 'ESTP', 'ESFP'], tone: 'clay-swatch-lemon' },
] as const;

export const TypeLibrary: React.FC = () => {
  const { locale } = useLocale();
  const strings = getStrings(locale);
  const types = getLocalizedTypes(locale);
  const typeMap = new Map(types.map((type) => [type.id, type] as const));

  return (
    <Layout>
      <div className="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full clay-swatch-slushie opacity-[0.15] blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full clay-swatch-ube opacity-[0.15] blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-8">
        <div className="rounded-[2.5rem] border border-[var(--clay-border)] bg-[var(--clay-surface)] p-8 shadow-[var(--clay-shadow)] md:p-10">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="clay-kicker"
          >
            {strings.typeLibraryKicker}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-4xl font-black tracking-[-0.05em] text-[var(--clay-text)] md:text-6xl"
          >
            {strings.typeLibraryTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-3xl text-lg leading-8 clay-muted"
          >
            {strings.typeLibrarySubtitle}
          </motion.p>
        </div>

        {typeGroups.map((group) => {
          const groupText = strings.typeLibraryGroups[group.key];
          const groupTypes = group.ids
            .map((id) => typeMap.get(id))
            .filter((type): type is PersonalityType => Boolean(type));

          return (
            <section key={group.key} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
              >
                <h2 className="text-3xl font-black text-[var(--clay-text)]">{groupText.label}</h2>
                <span
                  className={`inline-flex w-fit max-w-3xl rounded-2xl border border-black px-4 py-2 text-sm leading-6 text-[var(--clay-text)] shadow-[var(--clay-shadow)] lg:justify-self-end ${group.tone}`}
                >
                  {groupText.description}
                </span>
              </motion.div>

              <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {groupTypes.map((type, index) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="h-full"
                  >
                    <Link
                      to={`/type/${type.id}`}
                      viewTransition
                      className="flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[2rem] border border-[var(--clay-border)] bg-white shadow-[var(--clay-shadow)] transition-all hover:-rotate-1 hover:shadow-[var(--clay-shadow-hard)] lg:min-h-[29rem] xl:min-h-[31rem]"
                    >
                      <div className={`h-3 w-full shrink-0 ${group.tone}`}></div>
                      <div className="flex flex-1 flex-col p-5 text-center xl:p-6">
                        <div className="mb-5 flex h-40 shrink-0 items-center justify-center rounded-[1.5rem] border border-[var(--clay-border)] bg-[var(--clay-bg)] px-4 py-4 xl:mb-6 xl:h-44 xl:py-5">
                          <TypeIcon type={type.id} size={132} className="mx-auto" />
                        </div>
                        <h3 className="text-3xl font-black tracking-[-0.05em] text-[var(--clay-text)]">
                          {type.id}
                        </h3>
                        <h4 className="mt-1 flex min-h-10 items-center justify-center text-lg font-bold leading-7 clay-muted">
                          {type.name}
                        </h4>
                        <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 clay-muted">
                          {type.summary}
                        </p>
                        <div className="flex-1" aria-hidden="true"></div>
                      </div>
                      <div className="shrink-0 border-t border-[var(--clay-border)] bg-[var(--clay-bg)] px-6 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-[var(--clay-text)]">
                        {strings.typeLibraryOpenProfile}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Layout>
  );
};
