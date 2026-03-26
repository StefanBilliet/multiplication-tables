import { questionAttempt } from "./questionAttempt.ts";
import { sessionCompletion } from "./sessionCompletion.ts";
import type { CurrentQuestionState, SessionComplete } from "./types.ts";

type PracticeFlow = CurrentQuestionState | SessionComplete;

export type { PracticeFlow };

const PracticeFlow = {
  start: questionAttempt.start,

  selectAnswer: questionAttempt.selectAnswer,

  checkAnswer: questionAttempt.checkAnswer,

  nextQuestion: questionAttempt.nextQuestion,

  reset: questionAttempt.reset,

  continueSession: sessionCompletion.continueSession,

  isComplete: sessionCompletion.isComplete,

  hasEarnedReward: sessionCompletion.hasEarnedReward,
};

export default PracticeFlow;
