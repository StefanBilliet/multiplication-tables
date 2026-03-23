import type PracticeFlow from "./practiceFlow.ts";

export const correctAnswerResult = (flow: PracticeFlow): PracticeFlow => {
  if (flow.kind === "sessionComplete") return flow;

  return {
    ...flow,
    currentQuestion: {
      ...flow.currentQuestion,
      canCheckAnswer: false,
      canContinue: true,
      feedbackState: "correct",
    },
    firstTryCorrectAnswerCount: !flow.currentQuestion.hasRetriedCurrentQuestion
      ? flow.firstTryCorrectAnswerCount + 1
      : flow.firstTryCorrectAnswerCount,
  };
};
