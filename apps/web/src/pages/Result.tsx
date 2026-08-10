import React, { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { BookOpen, RefreshCw, Share2 } from 'lucide-react';

import { Layout } from '../components/Layout';
import { TypeIcon } from '../components/icons/TypeIcons';
import { useLocale } from '../context/LocaleContext';
import { getStrings } from '../i18n/strings';
import { LocalStorageManager } from '../lib/LocalStorageManager';
import { getLocalizedType } from '../lib/localeData';
import { resolveResultFromHistory } from '../lib/resultLookup';
import { buildDimensionRows } from '../lib/typePresentation';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const Result: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useLocale();
  const strings = getStrings(locale).result;
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'unsupported' | 'error'>('idle');
  const typeData = type ? getLocalizedType(locale, type) : null;
  const result = React.useMemo(() => {
    if (!type) return null;
    const history = LocalStorageManager.load().testHistory;
    const stateResultId = (location.state as { resultId?: string } | null)?.resultId ?? null;
    const searchParams = new URLSearchParams(location.search);
    const queryResultId = searchParams.get('resultId');
    return resolveResultFromHistory(
      history,
      type,
      queryResultId ?? stateResultId ?? undefined,
    ) ?? null;
  }, [location.search, location.state, type]);

  const handleShare = async () => {
    if (!typeData) return;

    const shareUrl = new URL(window.location.href);
    if (result?.id) {
      shareUrl.searchParams.set('resultId', result.id);
    }

    const title = `${typeData.id} - ${typeData.name}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: typeData.summary,
          url: shareUrl.toString(),
        });
        setShareState('idle');
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl.toString());
        setShareState('copied');
        return;
      }

      setShareState('unsupported');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setShareState('error');
    }
  };

  if (!typeData) {
    return <Navigate to="/" replace />;
  }

  const themeColor = typeData.luckyColors?.primary || '#2563eb';
  const categoryName = typeData.category || strings.fallbackCategory;
  const dimensionRows = buildDimensionRows(result);

  const chartData = {
    labels: strings.chartLabels,
    datasets: [
      {
        label: strings.chartDataset,
        data: result
          ? [
              result.scores.E,
              result.scores.S,
              result.scores.T,
              result.scores.J,
              result.scores.I,
              result.scores.N,
              result.scores.F,
              result.scores.P,
            ]
          : [50, 50, 50, 50, 50, 50, 50, 50],
        backgroundColor: `${themeColor}33`,
        borderColor: themeColor,
        borderWidth: 2,
        pointBackgroundColor: themeColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: themeColor,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        pointLabels: {
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Layout>
      <div className="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        <div className="absolute right-0 top-0 h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.45),transparent)]"></div>
        <div className="absolute right-1/4 top-20 h-96 w-96 rounded-full clay-swatch-slushie opacity-20 blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 left-1/4 h-96 w-96 rounded-full clay-swatch-ube opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass-card overflow-hidden rounded-[2.25rem]"
        >
          <div
            className="relative overflow-hidden p-8 text-center md:p-12"
            style={{ backgroundColor: themeColor }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),transparent_60%)]"></div>
            <div className="absolute right-[-3rem] top-[-4rem] opacity-20">
              <TypeIcon type={typeData.id} size={360} color="white" />
            </div>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-10"
            >
              <div className="inline-flex rounded-full border border-black bg-white/85 px-5 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--clay-text)] shadow-[var(--clay-shadow)]">
                {categoryName}
              </div>
              <h1 className="mt-6 text-6xl font-black tracking-[-0.06em] text-white md:text-8xl">
                {typeData.id}
              </h1>
              <h2 className="mt-3 text-2xl font-black text-white/95 md:text-3xl">{typeData.name}</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90">
                {typeData.summary}
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 bg-[rgba(255,253,248,0.78)] p-8 md:grid-cols-2 md:p-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-[2rem] border border-[var(--clay-border)] bg-white p-6 shadow-[var(--clay-shadow)]"
            >
              <h3 className="mb-6 flex items-center text-lg font-black text-[var(--clay-text)]">
                <span
                  className="mr-3 h-7 w-2 rounded-full"
                  style={{ backgroundColor: themeColor }}
                ></span>
                {strings.scoreRadar}
              </h3>
              <div className="relative mx-auto aspect-square w-full max-w-md">
                <Radar data={chartData} options={chartOptions} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="rounded-[2rem] border border-[var(--clay-border)] bg-white p-6 shadow-[var(--clay-shadow)]">
                <h3 className="font-black text-[var(--clay-text)]">{strings.dimensionVerdict}</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {dimensionRows.map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-[var(--clay-border)] bg-[var(--clay-bg)] p-4"
                    >
                      <div className="text-xs uppercase tracking-[0.18em] clay-muted">{label}</div>
                      <div className="mt-2 text-2xl font-black text-[var(--clay-text)]">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[var(--clay-border)] bg-white p-6 shadow-[var(--clay-shadow)]">
                <h3 className="mb-4 flex items-center font-black text-[var(--clay-text)]">
                  <BookOpen size={20} className="mr-2" style={{ color: themeColor }} />
                  {strings.coreTraits}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {typeData.description.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-[var(--clay-border)] bg-[var(--clay-bg)] px-3 py-1.5 text-sm text-[var(--clay-text)] shadow-[var(--clay-shadow)]"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {typeData.famousPeople && typeData.famousPeople.length > 0 && (
                <div className="rounded-[2rem] border border-[var(--clay-border)] bg-white p-6 shadow-[var(--clay-shadow)]">
                  <h3 className="mb-4 flex items-center text-sm font-black uppercase tracking-[0.18em] text-[var(--clay-text)]">
                    <span
                      className="mr-2 h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: themeColor }}
                    ></span>
                    {strings.notablePeople}
                  </h3>
                  <div className="flex items-center gap-4">
                    {typeData.famousPeople.slice(0, 3).map((person, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-black text-sm font-black text-white shadow-[var(--clay-shadow)]"
                          style={{ backgroundColor: themeColor }}
                        >
                          {person.name.charAt(0)}
                        </div>
                        <div className="w-16 truncate text-xs clay-muted">{person.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Link
                  to={`/type/${typeData.id}`}
                  className="col-span-2 flex items-center justify-center rounded-full border border-black px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-[var(--clay-text)] shadow-[var(--clay-shadow)] transition-all hover:-translate-y-1 hover:-rotate-2 hover:shadow-[var(--clay-shadow-hard)]"
                  style={{ backgroundColor: themeColor }}
                >
                  {strings.openFullProfile}
                </Link>
                <button
                  className="clay-button clay-button-secondary !w-full !justify-center !px-4 !py-3"
                  onClick={() => navigate('/')}
                >
                  <RefreshCw size={18} className="mr-1" /> {strings.retake}
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="clay-button clay-button-ghost !w-full !justify-center !px-4 !py-3"
                >
                  <Share2 size={18} className="mr-1" /> {strings.share}
                </button>
              </div>
              {shareState !== 'idle' && (
                <p className="text-sm clay-muted">
                  {shareState === 'copied' && strings.shareCopied}
                  {shareState === 'unsupported' && strings.shareUnsupported}
                  {shareState === 'error' && strings.shareError}
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
