import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ListChecks, Timer, Zap } from 'lucide-react';

import { Layout } from '../components/Layout';
import { TypeIcon } from '../components/icons/TypeIcons';
import { useLocale } from '../context/LocaleContext';
import { getStrings } from '../i18n/strings';
import { LocalStorageManager } from '../lib/LocalStorageManager';
import { getLocalizedQuestionMeta } from '../lib/localeData';
import { VersionId } from '../types';

const versionBase = [
  { id: 'quick', questions: 28, icon: Zap, swatch: 'clay-swatch-lemon', accent: 'text-[var(--clay-text)]', tag: 'Fast' },
  { id: 'standard', questions: 93, icon: CheckCircle2, swatch: 'clay-swatch-slushie', accent: 'text-[var(--clay-blueberry)]', tag: 'Recommended' },
  { id: 'full', questions: 200, icon: ListChecks, swatch: 'clay-swatch-ube', accent: 'text-[var(--clay-ube-deep)]', tag: 'Deep dive' },
] as const;

const archetypeGroups = [
  { key: 'analysts', tone: 'clay-swatch-ube' },
  { key: 'diplomats', tone: 'clay-swatch-matcha' },
  { key: 'sentinels', tone: 'clay-swatch-slushie' },
  { key: 'explorers', tone: 'clay-swatch-lemon' },
] as const;

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const strings = getStrings(locale);
  const questionMeta = getLocalizedQuestionMeta(locale);
  const [resumeDialog, setResumeDialog] = useState<{ isOpen: boolean; version: VersionId | null }>({
    isOpen: false,
    version: null,
  });

  const handleVersionClick = (versionId: VersionId) => {
    const saved = LocalStorageManager.getSavedTest(versionId);
    if (saved) {
      setResumeDialog({ isOpen: true, version: versionId });
      return;
    }

    navigate(`/test/${versionId}`);
  };

  const handleResume = () => {
    if (!resumeDialog.version) return;
    navigate(`/test/${resumeDialog.version}?resume=true`);
    setResumeDialog({ isOpen: false, version: null });
  };

  const handleRestart = () => {
    if (!resumeDialog.version) return;
    LocalStorageManager.clearCurrentTest(resumeDialog.version);
    navigate(`/test/${resumeDialog.version}`);
    setResumeDialog({ isOpen: false, version: null });
  };

  const versions = versionBase.map((item) => ({
    ...item,
    title: questionMeta[item.id].title,
    time: questionMeta[item.id].duration,
    desc: questionMeta[item.id].description,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-12 md:space-y-16">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-[var(--clay-border)] bg-[rgba(255,253,248,0.88)] px-6 py-10 shadow-[var(--clay-shadow)] md:px-10 md:py-14">
          <div className="clay-grid absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -top-8 right-10 h-36 w-36 rounded-full clay-swatch-slushie blur-3xl opacity-30" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full clay-swatch-ube blur-3xl opacity-25" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_420px] lg:items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <span className="clay-kicker">Clay Edition</span>
              <div className="space-y-4">
                <h1 className="clay-display text-5xl text-[var(--clay-text)] md:text-7xl">
                  Decode your
                  <br />
                  personality pattern
                </h1>
                <p className="max-w-2xl text-lg leading-8 clay-muted">
                  Run a fast snapshot or a deeper pass, then compare the 16 MBTI types in the language you prefer.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleVersionClick('standard')} className="clay-button clay-button-primary">
                  Start the test
                </button>
                <button onClick={() => navigate('/types')} className="clay-button clay-button-secondary">
                  Browse types
                </button>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="clay-chip text-sm clay-muted">16 personalities</span>
                <span className="clay-chip text-sm clay-muted">5 languages</span>
                <span className="clay-chip text-sm clay-muted">saved history</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative min-h-[420px] rounded-[2rem] border border-[var(--clay-border)] bg-white p-6 shadow-[var(--clay-shadow)]">
              <div className="absolute right-6 top-6 clay-kicker bg-[var(--clay-matcha)] text-[var(--clay-text)]">
                MBTI MASTER
              </div>
              <motion.div
                className="absolute -left-2 top-10"
                animate={{ y: [0, -14, 0], rotate: [-4, -7, -4] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <TypeIcon type="ENFP" size={120} className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]" />
              </motion.div>
              <motion.div
                className="absolute right-2 top-24"
                animate={{ y: [0, 12, 0], rotate: [4, 7, 4] }}
                transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <TypeIcon type="INTJ" size={130} className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]" />
              </motion.div>
              <motion.div
                className="absolute bottom-8 left-12"
                animate={{ y: [0, -10, 0], rotate: [3, 0, 3] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              >
                <TypeIcon type="ISTP" size={112} className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]" />
              </motion.div>
              <motion.div
                className="absolute bottom-3 right-10"
                animate={{ y: [0, 14, 0], rotate: [-3, 1, -3] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
              >
                <TypeIcon type="ESFJ" size={116} className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]" />
              </motion.div>

              <div className="absolute inset-x-6 bottom-6 rounded-[1.75rem] border border-[var(--clay-border)] bg-[var(--clay-bg)] p-5 shadow-[var(--clay-shadow)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] clay-muted">Standard path</p>
                    <h2 className="mt-2 text-2xl font-black text-[var(--clay-text)]">
                      {questionMeta.standard.title}
                    </h2>
                  </div>
                  <button onClick={() => handleVersionClick('standard')} className="clay-button clay-button-ghost !px-5 !py-3 text-sm">
                    Start
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="space-y-6">
          <motion.div variants={itemVariants} className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="clay-kicker">Choose your path</span>
              <h2 className="mt-4 text-4xl font-black text-[var(--clay-text)]">
                Pick the test depth that fits today
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 clay-muted">
              Each version uses the same scoring model, but changes how much evidence the result gets before it resolves.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {versions.map((version) => (
              <motion.div
                key={version.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="glass-card group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] p-6"
                onClick={() => handleVersionClick(version.id)}
              >
                <div className={`rounded-[1.5rem] border border-black/10 p-6 ${version.swatch}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-black bg-white shadow-[var(--clay-shadow)]">
                      <version.icon className={`h-7 w-7 ${version.accent}`} />
                    </div>
                    <span className="clay-kicker bg-white text-[var(--clay-text)]">{version.tag}</span>
                  </div>
                  <h3 className="mt-8 text-3xl font-black text-[var(--clay-text)]">{version.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--clay-text)]">
                    <span className="clay-chip">
                      <ListChecks size={14} /> {version.questions}
                    </span>
                    <span className="clay-chip">
                      <Timer size={14} /> {version.time}
                    </span>
                  </div>
                </div>

                <p className="mt-6 flex-grow text-base leading-7 clay-muted">{version.desc}</p>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleVersionClick(version.id);
                  }}
                  className="clay-button clay-button-secondary mt-6 w-full justify-center"
                >
                  Start test
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <motion.div variants={itemVariants} className="clay-shell rounded-[2.5rem] p-8 md:p-10">
            <span className="clay-kicker">16 archetypes</span>
            <h2 className="mt-4 text-4xl font-black text-[var(--clay-text)]">
              Four groups, sixteen signatures
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 clay-muted">
              The type library now follows your selected language, so you can compare the full set without switching apps.
            </p>

            <div className="mt-8 grid gap-4">
              {archetypeGroups.map((group) => {
                const groupText = strings.typeLibraryGroups[group.key];
                return (
                  <div
                    key={group.key}
                    className="flex flex-col gap-3 rounded-[1.75rem] border border-[var(--clay-border)] bg-white p-5 shadow-[var(--clay-shadow)] md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex min-w-[120px] justify-center rounded-full border border-black px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[var(--clay-text)] ${group.tone}`}
                      >
                        {groupText.label}
                      </span>
                      <span className="text-sm leading-6 clay-muted">{groupText.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button onClick={() => navigate('/types')} className="clay-button clay-button-ghost mt-8">
              Open the library
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2">
            {[
              { type: 'ENTP', label: 'ENTP', tone: 'clay-swatch-ube' },
              { type: 'INFP', label: 'INFP', tone: 'clay-swatch-matcha' },
              { type: 'ISTJ', label: 'ISTJ', tone: 'clay-swatch-slushie' },
              { type: 'ESFP', label: 'ESFP', tone: 'clay-swatch-lemon' },
            ].map((card, index) => (
              <div
                key={card.type}
                className={`glass-card rounded-[2rem] p-6 text-center ${index % 2 === 0 ? 'sm:translate-y-6' : ''}`}
              >
                <div className={`rounded-[1.5rem] border border-black/10 px-4 py-6 ${card.tone}`}>
                  <TypeIcon type={card.type} size={92} className="mx-auto" />
                </div>
                <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-[var(--clay-text)]">
                  {card.label}
                </p>
              </div>
            ))}
          </motion.div>
        </section>
      </motion.div>

      <AnimatePresence>
        {resumeDialog.isOpen && resumeDialog.version && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="w-full max-w-md rounded-[2rem] border border-[var(--clay-border)] bg-[var(--clay-paper)] p-6 shadow-[var(--clay-shadow-hard)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black clay-swatch-lemon shadow-[var(--clay-shadow)]">
                  <AlertCircle className="h-6 w-6 text-[var(--clay-text)]" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] clay-muted">
                    Resume session
                  </p>
                  <h3 className="text-2xl font-black text-[var(--clay-text)]">
                    Continue {questionMeta[resumeDialog.version].title}
                  </h3>
                </div>
              </div>

              <p className="mt-6 text-base leading-7 clay-muted">
                There is unfinished progress saved for this test version. You can continue where you left off or restart from question one.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={handleRestart} className="clay-button clay-button-secondary w-full justify-center">
                  Restart
                </button>
                <button onClick={handleResume} className="clay-button clay-button-primary w-full justify-center">
                  Resume
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};
