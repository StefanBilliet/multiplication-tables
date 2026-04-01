export type Question = {
  table: number;
  multiplier: number;
};

type CurrentQuestion = {
  answerOptions: number[];
  canCheckAnswer: boolean;
  canContinue: boolean;
  feedbackState: 'correct' | 'incorrect' | null;
  hasRetriedCurrentQuestion: boolean;
  multiplier: number;
  selectedAnswer: number | null;
  table: number;
};

export type SessionComplete = {
  kind: 'sessionComplete';
  firstTryCorrectAnswerCount: number;
  hasEarnedReward: boolean;
  multiplicationErrors: { table: number; multiplier: number }[];
};

export type CurrentQuestionState = {
  kind: 'currentQuestion';
  currentQuestionIndex: number;
  currentQuestion: CurrentQuestion;
  firstTryCorrectAnswerCount: number;
  multiplicationErrors: { table: number; multiplier: number }[];
  questionSequence: Question[];
};
