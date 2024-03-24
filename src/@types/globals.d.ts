interface Window {
  ALL_QUESTIONS: QuizOption[];
  correctAnswers: any;
  submitTest: () => void;
}

// @ts-ignore
declare var window: Window;

declare interface QuizGenerator {
  defaultTitle: string;
  shuffle: boolean;
  displayLimit: number;
  showCorrectAnswers?: boolean;

  ALL_QUESTIONS?: QuizOption[];
  questionsUrl?: string;
  answersUrl?: string;

  init(): Promise<void>;
  reset(): void;
  levelNames?: { [key: string]: string };
  getLevelSelector(level: number, onChange: (e: Event) => void): any;
  afterRender(): void;
  generateQuestions(level: number): Promise<any[]>;
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
  id: string | number;
  level: number;
  text: string;
  readOnly?: boolean;
  shuffle?: boolean;
  answersPriority?: number[]; // TODO implement
  copy?: boolean;
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
