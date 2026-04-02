import type { PracticeFlow } from './practiceFlow';

const REWARD_ELIGIBILITY_THRESHOLD = 14;

export default function hasTestSessionEarnedReward(session: PracticeFlow) {
  return session.kind === 'sessionComplete' && session.firstTryCorrectAnswerCount >= REWARD_ELIGIBILITY_THRESHOLD;
}
