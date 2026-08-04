import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useLocale } from '../context/LocaleContext';
import { TestEngine } from '../lib/TestEngine';
import { LocalStorageManager } from '../lib/LocalStorageManager';
import { Question, SupportedLocale, VersionId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Keyboard } from 'lucide-react';
import { getStrings } from '../i18n/strings';

export const Test: React.FC = () => {
  const { version } = useParams<{ version: string }>();
  const { locale } = useLocale();

  if (!version || !isVersionId(version)) {
    return <Navigate to="/" replace />;
  }

  return <TestSession key={`${version}:${locale}`} version={version} locale={locale} />;
};

interface TestSessionProps {
  version: VersionId;
  locale: SupportedLocale;
}

interface TestViewState {
  currentQuestion: Question | null;
  progress: number;
  page: number;
  direction: number;
  totalQuestions: number;
  prevAnswer: 'A' | 'B' | undefined;
}

const isVersionId = (value: string): value is VersionId =>
  ['quick', 'standard', 'full'].includes(value);

const createTestEngine = (version: VersionId, locale: SupportedLocale) => {
  const engine = new TestEngine(version, locale);
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('resume') === 'true') {
    engine.loadProgress();
  }
  return engine;
};

const readTestView = (engine: TestEngine, previousPage: number): TestViewState => {
  const currentQuestion = engine.getCurrentQuestion();
  const page = currentQuestion
    ? engine.getQuestions().findIndex((question) => question.id === currentQuestion.id)
    : 0;

  return {
    currentQuestion,
    progress: engine.getProgress(),
    page,
    direction: page > previousPage ? 1 : page < previousPage ? -1 : 0,
    totalQuestions: engine.getQuestions().length,
    prevAnswer: currentQuestion ? engine.getAnswer(currentQuestion.id) : undefined,
  };
};

const TestSession: React.FC<TestSessionProps> = ({ version, locale }) => {
  const navigate = useNavigate();
  const copy = getStrings(locale).test;
  const [engine] = useState(() => createTestEngine(version, locale));
  const [view, setView] = useState<TestViewState>(() => readTestView(engine, 0));
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const { currentQuestion, progress, page, direction, totalQuestions, prevAnswer } = view;

  const updateState = useCallback((currentEngine: TestEngine) => {
    setView((previous) => readTestView(currentEngine, previous.page));
    setSelectedOption(null);
  }, []);

  const handleAnswer = useCallback((questionId: number, choice: 'A' | 'B') => {
    const idx = engine.getQuestions().findIndex(q => q.id === questionId);
    if (idx === -1) return;

    engine.answerQuestion(idx, choice);

    const currentQ = engine.getCurrentQuestion();
    if (currentQ && currentQ.id === questionId) {
      if (engine.isComplete() && idx === totalQuestions - 1) {
        try {
          const result = engine.calculateScores();
          LocalStorageManager.addTestResult(result);
          LocalStorageManager.clearCurrentTest(engine.getVersion());
          navigate(`/result/${result.resultType}?resultId=${encodeURIComponent(result.id)}`, {
            replace: true,
            state: { resultId: result.id },
          });
        } catch (error) {
          console.error('Error calculating result:', error);
          window.alert(copy.resultError);
        }
      } else {
        const moved = engine.nextQuestion();
        if (!moved && !engine.isComplete()) {
          const questions = engine.getQuestions();
          const firstUnanswered = questions.findIndex(q => !engine.getAnswer(q.id));
          if (firstUnanswered !== -1) {
            engine.jumpToQuestion(firstUnanswered);
          }
        }
        updateState(engine);
      }
    } else {
      updateState(engine);
    }
  }, [copy.resultError, engine, navigate, totalQuestions, updateState]);

  const handleOptionSelect = useCallback((choice: 'A' | 'B') => {
    if (selectedOption || !currentQuestion) return;
    setSelectedOption(choice);
    const qId = currentQuestion.id;
    setTimeout(() => {
      handleAnswer(qId, choice);
      setSelectedOption(null);
    }, 350);
  }, [handleAnswer, selectedOption, currentQuestion]);

  const handlePrev = useCallback(() => {
    engine.previousQuestion();
    updateState(engine);
  }, [engine, updateState]);

  const handleNext = useCallback(() => {
    if (prevAnswer) {
      engine.nextQuestion();
      updateState(engine);
    }
  }, [engine, prevAnswer, updateState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedOption) return;
      if (['a', 'A', '1'].includes(e.key)) handleOptionSelect('A');
      if (['b', 'B', '2'].includes(e.key)) handleOptionSelect('B');
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleOptionSelect, handlePrev, handleNext, selectedOption]);

  const variants = {
    enter: (currentDirection: number) => ({
      x: currentDirection > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (currentDirection: number) => ({
      zIndex: 0,
      x: currentDirection < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  if (!currentQuestion) return <Layout><div>{copy.loading}</div></Layout>;

  return (
    <Layout>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 clay-swatch-slushie rounded-full blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 clay-swatch-ube rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 clay-swatch-lemon rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-3xl mx-auto py-8 md:py-12 px-4">
        <div className="mb-8">
          <div className="mb-3 flex justify-between text-sm font-medium clay-muted">
            <span>{copy.progress} {progress}%</span>
            <span>{page + 1} / {totalQuestions}</span>
          </div>
          <div className="h-3 w-full rounded-full border border-[var(--clay-border)] bg-white p-0.5 shadow-[var(--clay-shadow)]">
            <div className="h-2 rounded-full clay-swatch-matcha border border-black/10 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="glass-card rounded-[2rem] p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 h-2 w-full clay-swatch-slushie"></div>
            <div className="absolute top-6 right-6">
              <span className="rounded-full border border-[var(--clay-border)] bg-white px-3 py-1 text-xs font-mono text-[var(--clay-muted)] shadow-[var(--clay-shadow)]">
                #{currentQuestion.id}
              </span>
            </div>

            <h2 className="mb-12 text-center text-2xl md:text-3xl font-black text-[var(--clay-text)] leading-relaxed">
              {currentQuestion.text}
            </h2>

            <div className="grid gap-5">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.label || (!selectedOption && prevAnswer === option.label);
                const isOtherSelected = (selectedOption && selectedOption !== option.label) || (!selectedOption && prevAnswer && prevAnswer !== option.label);

                return (
                  <motion.button
                    key={option.label}
                    onClick={() => handleOptionSelect(option.label as 'A' | 'B')}
                    whileHover={!selectedOption ? { scale: 1.01 } : {}}
                    whileTap={!selectedOption ? { scale: 0.985 } : {}}
                    animate={isSelected ? {
                      scale: 1.02,
                      borderColor: '#000000',
                      backgroundColor: 'rgba(193, 176, 255, 0.32)',
                      boxShadow: 'rgb(0,0,0) -7px 7px'
                    } : {
                      opacity: isOtherSelected ? 0.6 : 1,
                      scale: isOtherSelected ? 0.985 : 1,
                      backgroundColor: 'rgba(255,255,255,0.92)'
                    }}
                    transition={{ duration: 0.2 }}
                    className={`group relative flex w-full items-center rounded-[1.5rem] border-2 p-5 text-left transition-all md:p-6 ${
                      isSelected
                        ? 'border-black'
                        : 'border-[var(--clay-border)] shadow-[var(--clay-shadow)] hover:-translate-y-1 hover:-rotate-1 hover:shadow-[var(--clay-shadow-hard)]'
                    }`}
                  >
                    <div
                      className={`mr-5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-black text-lg font-bold transition-all ${
                        isSelected
                          ? 'clay-swatch-ube text-[var(--clay-text)]'
                          : 'bg-white text-[var(--clay-muted)] group-hover:bg-[var(--clay-lemon)] group-hover:text-[var(--clay-text)]'
                      }`}
                    >
                      {option.label}
                    </div>
                    <span className="flex-1 text-lg font-medium text-[var(--clay-text)]">{option.text}</span>
                    <span
                      className={`absolute right-4 hidden text-xs font-mono transition-colors md:block ${
                        isSelected ? 'text-[var(--clay-muted)]' : 'text-[#b8b1a4] group-hover:text-[var(--clay-muted)]'
                      }`}
                    >
                      [{option.label === 'A' ? 'A / 1' : 'B / 2'}]
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between text-[var(--clay-muted)]">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className={`flex items-center space-x-2 rounded-full border px-6 py-4 transition-all ${
              page === 0
                ? 'cursor-not-allowed opacity-40'
                : 'border-[var(--clay-border)] bg-white shadow-[var(--clay-shadow)] hover:-translate-y-1 hover:-rotate-3 hover:shadow-[var(--clay-shadow-hard)] active:scale-95'
            }`}
          >
            <ArrowLeft size={18} />
            <span className="font-medium">{copy.previous}</span>
          </button>

          <div className="hidden items-center space-x-3 rounded-full border border-[var(--clay-border)] bg-white px-4 py-2 text-xs clay-muted shadow-[var(--clay-shadow)] md:flex">
            <span className="flex items-center font-medium text-[var(--clay-text)]">
              <Keyboard size={14} className="mr-1.5" /> {copy.shortcuts}
            </span>
            <span className="rounded border border-[var(--clay-border)] bg-[var(--clay-bg)] px-2 py-0.5">1 / A</span>
            <span className="rounded border border-[var(--clay-border)] bg-[var(--clay-bg)] px-2 py-0.5">2 / B</span>
            <span className="rounded border border-[var(--clay-border)] bg-[var(--clay-bg)] px-2 py-0.5">←</span>
            <span className="rounded border border-[var(--clay-border)] bg-[var(--clay-bg)] px-2 py-0.5">→</span>
          </div>

          <button
            onClick={handleNext}
            disabled={!prevAnswer || page === totalQuestions - 1}
            className={`flex items-center space-x-2 rounded-full border px-6 py-4 transition-all ${
              !prevAnswer || page === totalQuestions - 1
                ? 'cursor-not-allowed opacity-40'
                : 'border-black clay-swatch-lemon text-[var(--clay-text)] shadow-[var(--clay-shadow)] hover:-translate-y-1 hover:-rotate-3 hover:shadow-[var(--clay-shadow-hard)] active:scale-95'
            }`}
          >
            <span className="font-medium">{copy.next}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </Layout>
  );
};
