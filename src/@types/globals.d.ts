interface Window {
  ALL_QUESTIONS: QuizOption[];
  correctAnswers: any;
  submitTest: () => void;
}

// @ts-ignore
declare var window: Window;

type ShuffleType = "none" | "questions" | "answers" | "both" | "0" | "a" | "q";

declare interface QuizGenerator {
  domain: string;
  defaultTitle: string;
  shuffle: ShuffleType;
  displayLimit: number;
  showCorrectAnswers?: boolean;

  ALL_QUESTIONS?: QuizOption[];
  questionsUrl?: string;
  answersUrl?: string;

  init(): Promise<void>;
  reset(): void;
  levelNames?: { [key: string]: string };
  getLevelSelector(level: number[], onChange: (levels: number[]) => void): any;
  afterRender(): void;
  load?(levels: number[]): Promise<QuizOption[]>;
  generateQuestions(levels: number[]): Promise<any[]>;
}

type AnswerType = "radio" | "text" | "number" | "checkbox";

type CodeType = "js" | "html" | "css" | "mixed" | "code";

type Answer = {
  id: string | number;
  text: string | number;
  type?: CodeType;
  correct?: boolean | number;
};

type QuizOption = {
  id: number;
  level: number;
  text: string;
  readOnly?: boolean;
  shuffle?: boolean;
  answersPriority?: number[]; // TODO implement
  copy?: boolean;
  disabled?: boolean;
  type?: CodeType;
  q?: (() => void) | string;
  answerType: AnswerType;
  answerDisplay?: "inline-block";
  answers?: Answer[];
};

type Localization = {
  questions: {
    [key: string]:
      | string
      | {
          text: string;
          answers?: Answer[];
        };
  };
  common: {
    [key: string]: string;
  };
};
