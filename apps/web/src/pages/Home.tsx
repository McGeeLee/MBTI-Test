import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ListChecks, Timer, Zap } from 'lucide-react';

import { Layout } from '../components/Layout';
import { ModalDialog } from '../components/ModalDialog';
import { TypeIcon } from '../components/icons/TypeIcons';
import { useLocale } from '../context/LocaleContext';
import { getStrings } from '../i18n/strings';
import { LocalStorageManager } from '../lib/LocalStorageManager';
import { getLocalizedQuestionMeta } from '../lib/localeData';
import { VersionId } from '../types';

const versionBase = [
  { id: 'quick', questions: 28, icon: Zap, swatch: 'clay-swatch-lemon', accent: 'text-[var(--clay-text)]' },
  { id: 'standard', questions: 93, icon: CheckCircle2, swatch: 'clay-swatch-slushie', accent: 'text-[var(--clay-blueberry)]' },
  { id: 'full', questions: 200, icon: ListChecks, swatch: 'clay-swatch-ube', accent: 'text-[var(--clay-ube-deep)]' },
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

    navigate(`/test/${versionId}`, { viewTransition: true });
  };

  const handleResume = () => {
    if (!resumeDialog.version) return;
    navigate(`/test/${resumeDialog.version}?resume=true`, { viewTransition: true });
    setResumeDialog({ isOpen: false, version: null });
  };

  const handleRestart = () => {
    if (!resumeDialog.version) return;
    LocalStorageManager.clearCurrentTest(resumeDialog.version);
    navigate(`/test/${resumeDialog.version}`, { viewTransition: true });
    setResumeDialog({ isOpen: false, version: null });
  };

  const versions = versionBase.map((item) => ({
    ...item,
    title: questionMeta[item.id].title,
    time: questionMeta[item.id].duration,
    desc: questionMeta[item.id].description,
    tag: strings.home.versionTags[item.id],
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

          <div className="relative z-10 grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_420px] xl:items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <span className="clay-kicker">{strings.home.edition}</span>
              <div className="space-y-4">
                <h1 className="clay-display max-w-4xl text-5xl text-[var(--clay-text)] md:text-7xl">
                  {strings.home.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 clay-muted">
                  {strings.home.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => handleVersionClick('standard')} className="clay-button clay-button-primary">
                  {strings.home.startTest}
                </button>
                <button onClick={() => navigate('/types', { viewTransition: true })} className="clay-button clay-button-secondary">
                  {strings.home.browseTypes}
                </button>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="clay-chip text-sm clay-muted">{strings.home.personalityCount}</span>
                <span className="clay-chip text-sm clay-muted">{strings.home.languageCount}</span>
                <span className="clay-chip text-sm clay-muted">{strings.home.savedHistory}</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-[2rem] border border-[var(--clay-border)] bg-white p-6 shadow-[var(--clay-shadow)]">
              <div className="flex items-center justify-between gap-4">
                <span className="clay-kicker bg-[var(--clay-matcha)] text-[var(--clay-text)]">
                  {strings.home.masterLabel}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.18em] clay-muted">
                  {strings.home.familyCount}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
                {[
                  { type: 'ENFP', tone: 'clay-swatch-matcha' },
                  { type: 'INTJ', tone: 'clay-swatch-ube' },
                  { type: 'ISTP', tone: 'clay-swatch-lemon' },
                  { type: 'ESFJ', tone: 'clay-swatch-slushie' },
                ].map((character) => (
                  <motion.div
                    key={character.type}
                    whileHover={{ y: -4 }}
                    className={`flex min-h-32 items-center justify-center rounded-[1.5rem] border border-black/10 p-3 ${character.tone}`}
                  >
                    <TypeIcon
                      type={character.type}
                      size={94}
                      className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
                    />
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-[var(--clay-border)] bg-[var(--clay-bg)] p-5 shadow-[var(--clay-shadow)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.12em] clay-muted">{strings.home.standardPath}</p>
                    <h2 className="mt-2 text-2xl font-black text-[var(--clay-text)]">
                      {questionMeta.standard.title}
                    </h2>
                  </div>
                  <button onClick={() => handleVersionClick('standard')} className="clay-button clay-button-ghost !px-5 !py-3 text-sm">
                    {strings.home.start}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="space-y-6">
          <motion.div variants={itemVariants} className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="clay-kicker">{strings.home.choosePath}</span>
              <h2 className="mt-4 text-4xl font-black text-[var(--clay-text)]">
                {strings.home.chooseTitle}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 clay-muted">
              {strings.home.chooseDescription}
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
                  {strings.home.startTest}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <motion.div variants={itemVariants} className="clay-shell rounded-[2.5rem] p-8 md:p-10">
            <span className="clay-kicker">{strings.home.archetypesKicker}</span>
            <h2 className="mt-4 text-4xl font-black text-[var(--clay-text)]">
              {strings.home.archetypesTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 clay-muted">
              {strings.home.archetypesDescription}
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

            <button onClick={() => navigate('/types', { viewTransition: true })} className="clay-button clay-button-ghost mt-8">
              {strings.home.openLibrary}
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid auto-rows-max grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-2"
          >
            {[
              { type: 'ENTP', label: 'ENTP', tone: 'clay-swatch-ube' },
              { type: 'INFP', label: 'INFP', tone: 'clay-swatch-matcha' },
              { type: 'ISTJ', label: 'ISTJ', tone: 'clay-swatch-slushie' },
              { type: 'ESFP', label: 'ESFP', tone: 'clay-swatch-lemon' },
            ].map((card) => (
              <div
                key={card.type}
                className="glass-card h-fit rounded-[2rem] p-5 text-center"
              >
                <div className={`flex aspect-square items-center justify-center rounded-[1.5rem] border border-black/10 p-4 ${card.tone}`}>
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

      <ModalDialog
        open={resumeDialog.isOpen && Boolean(resumeDialog.version)}
        onRequestClose={() => setResumeDialog({ isOpen: false, version: null })}
        labelledBy="resume-dialog-title"
      >
        {resumeDialog.version && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full max-w-md rounded-[2rem] border border-[var(--clay-border)] bg-[var(--clay-paper)] p-6 shadow-[var(--clay-shadow-hard)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black clay-swatch-lemon shadow-[var(--clay-shadow)]">
                  <AlertCircle className="h-6 w-6 text-[var(--clay-text)]" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] clay-muted">
                    {strings.home.resumeKicker}
                  </p>
                  <h3 id="resume-dialog-title" className="text-2xl font-black text-[var(--clay-text)]">
                    {strings.home.resumeTitle} {questionMeta[resumeDialog.version].title}
                  </h3>
                </div>
              </div>

              <p className="mt-6 text-base leading-7 clay-muted">
                {strings.home.resumeDescription}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={handleResume} className="clay-button clay-button-primary order-1 w-full justify-center sm:order-2">
                  {strings.home.resume}
                </button>
                <button onClick={handleRestart} className="clay-button clay-button-secondary order-2 w-full justify-center sm:order-1">
                  {strings.home.restart}
                </button>
              </div>
            </motion.div>
        )}
      </ModalDialog>
    </Layout>
  );
};
