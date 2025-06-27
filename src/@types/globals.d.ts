interface Window {
  ALL_QUESTIONS: QuizOption[];
  correctAnswers: CorrectAnswers;
  LOAD_QUESTIONS: (defaultLevel: number | null | undefined, question: QuizOption[]) => void;
}

// @ts-ignore
declare var window: Window;

type ShuffleType = "none" | "questions" | "answers" | "both" | "0" | "a" | "q";

declare interface QuizGenerator {
  domain: string;
  defaultTitle: string;
  shuffle: ShuffleType;
  displayLimit: number;
  pointsDigits: number;
  header?: string;
  showCorrectAnswers?: boolean;
  defaultLevels?: number[];

  ALL_QUESTIONS?: QuizOption[];
  questionsUrl?: string;
  answersUrl?: string | string[];

  init(): Promise<void>;
  reset(): void;
  levelNames?: { [key: string]: string };
  getLevelSelector(level: number[], onChange: (levels: number[]) => void): any;
  toolbarRendered?(toolbar: HTMLDivElement);
  afterRender(): void;
  load?(levels: number[]): Promise<QuizOption[]>;
  generateQuestions(levels: number[]): Promise<any[]>;
  getOptions?(): BaseLevel[];
  [key: string]: any;
}

type AnswerType = "radio" | "text" | "number" | "checkbox";

type CodeType = "js" | "html" | "css" | "mixed" | "code";

type BaseLevel = {
  value: number;
  text: string;
  short?: string;
  [key: string]: any;
};

type Answer = {
  id: string | number;
  text: string | number;
  type?: CodeType;
  correct?: boolean | number;
};

type CorrectAnswers = {
  [level: string]: {
    [id: string]: number | number[];
  };
};

type QuizOption = {
  id: number;
  groupId?: string;
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
