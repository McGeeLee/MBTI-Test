export type VersionId = 'quick' | 'standard' | 'full';

export type SupportedLocale = 'vi' | 'en' | 'ko' | 'ja' | 'zh';

export interface Option {
  label: string;
  text: string;
  value: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface QuestionBank {
  quick: Question[];
  standard: Question[];
  full: Question[];
}

export interface LocalizedQuestionMeta {
  title: string;
  duration: string;
  description: string;
}

export type LocalizedQuestionMetaMap = Record<VersionId, LocalizedQuestionMeta>;

export interface LocalizedQuestionSource {
  meta: LocalizedQuestionMetaMap;
  questions: QuestionBank;
}

export interface PersonalityType {
  id: string;
  name: string;
  category: string;
  summary: string;
  description: {
    traits: string[];
    strengths: string[];
    weaknesses: string[];
    careers: string[];
  };
  luckyColors: {
    primary: string;
    secondary: string[];
    meaning: string;
  };
  relationships: {
    compatible: string[];
    challenging: string[];
    advice: string;
  };
  development: {
    growthPath: string[];
    tips: string[];
  };
  famousPeople: {
    name: string;
    title: string;
  }[];
}

export interface TestResult {
  id: string;
  timestamp: number;
  version: VersionId;
  scores: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
  resultType: string;
  dimensions: {
    EI: 'E' | 'I' | 'X';
    SN: 'S' | 'N' | 'X';
    TF: 'T' | 'F' | 'X';
    JP: 'J' | 'P' | 'X';
  };
}
