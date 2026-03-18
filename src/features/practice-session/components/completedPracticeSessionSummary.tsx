import type { FC } from "react";
import type { PracticeFlow as PracticeFlowType } from "../models/practiceFlow";
import PracticeFlow from "../models/practiceFlow";
import RewardEarnedSummary from "./rewardEarnedSummary";
import SessionSummary from "./sessionSummary";
import useLifetimeRewardTotal from "./useLifetimeRewardTotal";

type CompletedPracticeSessionSummaryProps = {
  session: PracticeFlowType;
};

const CompletedPracticeSessionSummary: FC<
  CompletedPracticeSessionSummaryProps
> = ({ session }) => {
  const { lifetimeRewardTotal } = useLifetimeRewardTotal();

  return PracticeFlow.hasEarnedReward(session) ? (
    <RewardEarnedSummary
      correctAnswerCount={session.firstTryCorrectAnswerCount}
      lifetimeRewardTotal={lifetimeRewardTotal}
    />
  ) : (
    <SessionSummary correctAnswerCount={session.firstTryCorrectAnswerCount} />
  );
};

export default CompletedPracticeSessionSummary;
