import { questionAttempt } from './questionAttempt.ts';
import type { CurrentQuestionState, SessionComplete } from './types.ts';

type PracticeFlow = CurrentQuestionState | SessionComplete;

const REWARD_ELIGIBILITY_THRESHOLD = 7;

export const sessionCompletion = {
  continueSession(flow: PracticeFlow): PracticeFlow {
    if (flow.kind === 'sessionComplete') return flow;
    if (flow.currentQuestionIndex >= flow.questionSequence.length - 1) {
      return {
        kind: 'sessionComplete',
        firstTryCorrectAnswerCount: flow.firstTryCorrectAnswerCount,
        hasEarnedReward: flow.firstTryCorrectAnswerCount >= REWARD_ELIGIBILITY_THRESHOLD,
        multiplicationErrors: flow.multiplicationErrors,
      };
    }

    return questionAttempt.nextQuestion(flow);
  },

  isComplete(flow: PracticeFlow): boolean {
    return flow.kind === 'sessionComplete';
  },

  hasEarnedReward(flow: PracticeFlow): boolean {
    return flow.kind === 'sessionComplete' && flow.hasEarnedReward;
  },
};
