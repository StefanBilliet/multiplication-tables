import type { CurrentQuestionState, SessionComplete } from './types.ts';

type PracticeFlow = CurrentQuestionState | SessionComplete;

export const attemptOutcome = {
  correct(flow: CurrentQuestionState): PracticeFlow {
    const firstTryCorrectAnswerCount = flow.currentQuestion.hasRetriedCurrentQuestion
      ? flow.firstTryCorrectAnswerCount
      : flow.firstTryCorrectAnswerCount + 1;

    return {
      ...flow,
      currentQuestion: {
        ...flow.currentQuestion,
        canCheckAnswer: false,
        canContinue: true,
        feedbackState: 'correct',
      },
      firstTryCorrectAnswerCount,
    };
  },

  incorrect(flow: CurrentQuestionState): PracticeFlow {
    return {
      ...flow,
      currentQuestion: {
        ...flow.currentQuestion,
        canCheckAnswer: false,
        canContinue: false,
        feedbackState: 'incorrect',
        selectedAnswer: null,
        hasRetriedCurrentQuestion: true,
      },
      multiplicationErrors: [
        ...flow.multiplicationErrors,
        {
          table: flow.currentQuestion.table,
          multiplier: flow.currentQuestion.multiplier,
        },
      ],
    };
  },
};
