import type PracticeFlow from "./practiceFlow.ts";

export const incorrectAnswerResult = (flow: PracticeFlow): PracticeFlow => {
  if (flow.kind === "sessionComplete") return flow;

  return {
    ...flow,
    currentQuestion: {
      ...flow.currentQuestion,
      canCheckAnswer: false,
      canContinue: false,
      feedbackState: "incorrect",
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
};
