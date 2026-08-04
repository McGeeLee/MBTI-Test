import { Question, SupportedLocale, TestResult, VersionId } from '../types';
import { LocalStorageManager } from './LocalStorageManager';
import { getLocalizedQuestions } from './localeData';

export class TestEngine {
  private questions: Question[];
  private questionMap: Map<number, Question>;
  private currentIndex: number;
  private answers: Map<number, 'A' | 'B'>;
  private version: VersionId;
  private startTime: number;

  constructor(version: VersionId, locale: SupportedLocale = LocalStorageManager.getLanguage()) {
    this.version = version;
    this.questions = getLocalizedQuestions(locale)[version];
    this.questionMap = new Map(this.questions.map((question) => [question.id, question]));
    this.currentIndex = 0;
    this.answers = new Map();
    this.startTime = Date.now();
  }

  public getQuestions(): Question[] {
    return this.questions;
  }

  public getVersion(): VersionId {
    return this.version;
  }

  public answerQuestion(index: number, choice: 'A' | 'B'): void {
    const question = this.questions[index];
    if (question) {
      this.answers.set(question.id, choice);
      this.saveProgress();
    }
  }

  public getCurrentQuestion(): Question | null {
    return this.questions[this.currentIndex] || null;
  }

  public nextQuestion(): boolean {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.saveProgress();
      return true;
    }

    return false;
  }

  public previousQuestion(): boolean {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.saveProgress();
      return true;
    }

    return false;
  }

  public jumpToQuestion(index: number): boolean {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
      this.saveProgress();
      return true;
    }

    return false;
  }

  public getProgress(): number {
    return Math.round((this.answers.size / this.questions.length) * 100);
  }

  public getAnswer(questionId: number): 'A' | 'B' | undefined {
    return this.answers.get(questionId);
  }

  public isComplete(): boolean {
    return this.answers.size === this.questions.length;
  }

  private generateUUID(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (token) => {
      const random = (Math.random() * 16) | 0;
      const value = token === 'x' ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  public calculateScores(): TestResult {
    const scores = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };

    this.answers.forEach((choice, id) => {
      const question = this.questionMap.get(id);
      if (!question) return;

      const selectedOption = question.options.find((option) => option.label === choice);
      if (!selectedOption) return;

      const value = selectedOption.value;
      if (scores[value] !== undefined) {
        scores[value]++;
      }
    });

    const resultType = [
      scores.E >= scores.I ? 'E' : 'I',
      scores.S >= scores.N ? 'S' : 'N',
      scores.T >= scores.F ? 'T' : 'F',
      scores.J >= scores.P ? 'J' : 'P',
    ].join('');

    const thresholds = { quick: 1, standard: 3, full: 5 } as const;
    const threshold = thresholds[this.version];

    const dimensions = {
      EI: Math.abs(scores.E - scores.I) <= threshold ? 'X' : scores.E > scores.I ? 'E' : 'I',
      SN: Math.abs(scores.S - scores.N) <= threshold ? 'X' : scores.S > scores.N ? 'S' : 'N',
      TF: Math.abs(scores.T - scores.F) <= threshold ? 'X' : scores.T > scores.F ? 'T' : 'F',
      JP: Math.abs(scores.J - scores.P) <= threshold ? 'X' : scores.J > scores.P ? 'J' : 'P',
    } as TestResult['dimensions'];

    return {
      id: this.generateUUID(),
      timestamp: Date.now(),
      version: this.version,
      scores,
      resultType,
      dimensions,
    };
  }

  public saveProgress(): void {
    const answersObj: Record<number, 'A' | 'B'> = {};
    this.answers.forEach((value, key) => {
      answersObj[key] = value;
    });

    LocalStorageManager.saveCurrentTest(this.version, {
      version: this.version,
      answers: answersObj,
      currentIndex: this.currentIndex,
      startTime: this.startTime,
      lastUpdate: Date.now(),
    });
  }

  public loadProgress(): void {
    const data = LocalStorageManager.getSavedTest(this.version);
    if (data && data.version === this.version) {
      this.currentIndex = data.currentIndex;
      this.startTime = data.startTime;
      this.answers = new Map();
      Object.entries(data.answers).forEach(([key, value]) => {
        this.answers.set(Number(key), value);
      });
    }
  }
}
