interface Window {
  ALL_QUESTIONS: any[];
  /**
   * @deprecated try to use local vars
   */
  questions: any[];
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
  getLevelSelector(level: number, onChange: (e: any) => void): any;
  afterRender(): void;
  generateQuestions(level: number): any[];
}

type AnswerType = "radio" | "text" | "number";
