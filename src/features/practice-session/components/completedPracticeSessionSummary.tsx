import type { FC } from "react";
import useLifetimeRewardTotal from "../../../shared/rewards/useLifetimeRewardTotal";
import type { PracticeFlow as PracticeFlowType } from "../models/practiceFlow";
import PracticeFlow from "../models/practiceFlow";
import RewardEarnedSummary from "./rewardEarnedSummary";
import SessionSummary from "./sessionSummary";

type CompletedPracticeSessionSummaryProps = {
  session: PracticeFlowType;
};

const CompletedPracticeSessionSummary: FC<
  CompletedPracticeSessionSummaryProps
> = ({ session }) => {
  const { lifetimeRewardTotal } = useLifetimeRewardTotal();
  const hasEarnedReward = PracticeFlow.hasEarnedReward(session);

  return hasEarnedReward ? (
    <RewardEarnedSummary
      correctAnswerCount={session.firstTryCorrectAnswerCount}
      lifetimeRewardTotal={lifetimeRewardTotal}
    />
  ) : (
    <SessionSummary correctAnswerCount={session.firstTryCorrectAnswerCount} />
  );
};

export default CompletedPracticeSessionSummary;
