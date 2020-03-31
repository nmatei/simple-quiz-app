interface Window {
  ALL_QUESTIONS: any[];
  /**
   * @deprecated
   */
  shuffle: boolean;
  /**
   * @deprecated try to use local vars
   */
  questions: any[];
  correctAnswers: any;
  submitTest: () => void;
}

declare var window: Window;

declare interface QuizGenerator {
  init(): Promise<void>;
  getLevelSelector(level: number, onChange: (e: any) => void): any;
  afterRender(): void;
  generateQuestions(level: number): any[];
}

type AnswerType = "radio" | "text" | "number";
