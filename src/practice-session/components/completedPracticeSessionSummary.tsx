import type { FC } from 'react';
import useLifetimeRewardTotal from '../../app/hooks/useLifetimeRewardTotal';
import type { PracticeFlow as PracticeFlowType } from '../models/practiceFlow';
import PracticeFlow from '../models/practiceFlow';
import RewardEarnedSummary from './rewardEarnedSummary';
import SessionSummary from './sessionSummary';

type CompletedPracticeSessionSummaryProps = {
  session: PracticeFlowType;
  totalQuestionCount?: number;
};

const CompletedPracticeSessionSummary: FC<CompletedPracticeSessionSummaryProps> = ({ session, totalQuestionCount }) => {
  const { lifetimeRewardTotal } = useLifetimeRewardTotal();
  const hasEarnedReward = PracticeFlow.hasEarnedReward(session);

  return hasEarnedReward ? (
    <RewardEarnedSummary
      correctAnswerCount={session.firstTryCorrectAnswerCount}
      lifetimeRewardTotal={lifetimeRewardTotal}
      totalQuestionCount={totalQuestionCount}
    />
  ) : (
    <SessionSummary correctAnswerCount={session.firstTryCorrectAnswerCount} totalQuestionCount={totalQuestionCount} />
  );
};

export default CompletedPracticeSessionSummary;
