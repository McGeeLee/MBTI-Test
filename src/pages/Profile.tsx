import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronRight, Clock, Trash2, X } from 'lucide-react';

import { Layout } from '../components/Layout';
import { TypeIcon } from '../components/icons/TypeIcons';
import { LocalStorageManager } from '../lib/LocalStorageManager';
import { TestResult } from '../types';

export const Profile: React.FC = () => {
  const [history, setHistory] = useState<TestResult[]>([]);

  useEffect(() => {
    setHistory(LocalStorageManager.load().testHistory);
  }, []);

  const clearAllHistory = () => {
    if (confirm('Clear all saved test history? This cannot be undone.')) {
      LocalStorageManager.clearHistory();
      setHistory([]);
    }
  };

  const deleteRecord = (id: string) => {
    if (confirm('Delete this saved result?')) {
      LocalStorageManager.deleteTestResult(id);
      setHistory((previous) => previous.filter((item) => item.id !== id));
    }
  };

  return (
    <Layout>
      <div className="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.4),transparent)]"></div>
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full clay-swatch-slushie opacity-[0.15] blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full clay-swatch-ube opacity-[0.15] blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="clay-kicker">Memory</span>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[var(--clay-text)]">
            Saved results
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-[2rem] p-6 md:p-8"
        >
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="flex items-center text-xl font-black text-[var(--clay-text)]">
              <div className="mr-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-black clay-swatch-lemon shadow-[var(--clay-shadow)]">
                <Clock size={20} />
              </div>
              Test history
            </h2>
            {history.length > 0 && (
              <button
                onClick={clearAllHistory}
                className="inline-flex items-center rounded-full border border-black px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--clay-text)] shadow-[var(--clay-shadow)] transition-all hover:-translate-y-1 hover:-rotate-2 hover:shadow-[var(--clay-shadow-hard)]"
                style={{ backgroundColor: 'var(--clay-pomegranate)' }}
              >
                <Trash2 size={14} className="mr-2" /> Clear history
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="clay-dashed rounded-[2rem] bg-white p-12 text-center shadow-[var(--clay-shadow)]">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--clay-border)] bg-[var(--clay-bg)] text-[var(--clay-muted)]">
                <Clock size={32} />
              </div>
              <p className="mb-6 clay-muted">No saved results yet.</p>
              <Link to="/" className="clay-button clay-button-primary">
                Start your first test
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {history.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-[1.75rem] border border-[var(--clay-border)] bg-white p-5 shadow-[var(--clay-shadow)] transition-all hover:-translate-y-1 hover:shadow-[var(--clay-shadow-hard)]"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center">
                        <div className="mr-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.25rem] border border-[var(--clay-border)] bg-[var(--clay-bg)] shadow-[var(--clay-shadow)]">
                          <TypeIcon type={item.resultType} size={56} />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center space-x-3">
                            <span className="text-2xl font-black tracking-[-0.05em] text-[var(--clay-text)]">
                              {item.resultType}
                            </span>
                            <span className="rounded-full border border-[var(--clay-border)] bg-[var(--clay-bg)] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] clay-muted">
                              {item.version}
                            </span>
                          </div>
                          <div className="flex items-center text-xs clay-muted">
                            <Calendar size={12} className="mr-1" />
                            {new Date(item.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/result/${item.resultType}?resultId=${encodeURIComponent(item.id)}`}
                          state={{ resultId: item.id }}
                          className="inline-flex items-center rounded-full border border-black px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--clay-text)] shadow-[var(--clay-shadow)] transition-all hover:-translate-y-1 hover:-rotate-2 hover:shadow-[var(--clay-shadow-hard)]"
                          style={{ backgroundColor: 'var(--clay-matcha)' }}
                        >
                          View details <ChevronRight size={14} className="ml-1" />
                        </Link>
                        <button
                          onClick={() => deleteRecord(item.id)}
                          className="rounded-full border border-[var(--clay-border)] bg-white p-2 text-[var(--clay-muted)] shadow-[var(--clay-shadow)] transition-all hover:-translate-y-1 hover:shadow-[var(--clay-shadow-hard)] hover:text-[var(--clay-text)]"
                          title="Delete result"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};
