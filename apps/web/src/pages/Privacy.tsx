import React from 'react';
import { Layout } from '../components/Layout';

export const Privacy: React.FC = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-6 rounded-[2rem] border border-[var(--clay-border)] bg-white p-8 shadow-[var(--clay-shadow)]">
        <span className="clay-kicker">Privacy</span>
        <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--clay-text)]">Privacy Policy</h1>
        <p className="text-base leading-7 clay-muted">
          This app stores your test progress, result history, and future preference settings locally in your browser
          so you can resume unfinished tests and review past results.
        </p>
        <p className="text-base leading-7 clay-muted">
          No server-side account system is used in this web version. Clearing browser storage or using a different
          device/browser will remove locally saved data from this experience.
        </p>
        <p className="text-base leading-7 clay-muted">
          MBTI results in this app are intended for self-exploration only and should not be treated as clinical or
          professional psychological advice.
        </p>
      </div>
    </Layout>
  );
};
