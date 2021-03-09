interface Window {
  ALL_QUESTIONS: QuizOption[];
  /**
   * @deprecated try to use local vars
   */
  questions: QuizOption[];
  correctAnswers: any;
  submitTest: () => void;
}

// @ts-ignore
declare var window: Window;

declare interface QuizGenerator {
  shuffle: boolean;
  displayLimit: number;
  init(): Promise<void>;
  reset(): void;
  levelNames?: { [key: string]: string };
  getLevelSelector(level: number, onChange: (e: any) => void): any;
  afterRender(): void;
  generateQuestions(level: number): any[];
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
  copy?: boolean;
  type?: CodeType;
  q?: (() => void) | string;
  answerType: AnswerType;
  answerDisplay?: "inline-block";
  answers?: Answer[];
};
