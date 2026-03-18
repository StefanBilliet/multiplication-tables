import type { FC } from "react";
import type { PracticeSession as PracticeSessionType } from "../models/practiceSession";
import PracticeSession from "../models/practiceSession";
import RewardEarnedSummary from "./rewardEarnedSummary";
import SessionSummary from "./sessionSummary";
import useLifetimeRewardTotal from "./useLifetimeRewardTotal";

type CompletedPracticeSessionSummaryProps = {
  session: PracticeSessionType;
};

const CompletedPracticeSessionSummary: FC<
  CompletedPracticeSessionSummaryProps
> = ({ session }) => {
  const { lifetimeRewardTotal } = useLifetimeRewardTotal();

  return PracticeSession.hasEarnedReward(session) ? (
    <RewardEarnedSummary
      correctAnswerCount={session.firstTryCorrectAnswerCount}
      lifetimeRewardTotal={lifetimeRewardTotal}
    />
  ) : (
    <SessionSummary correctAnswerCount={session.firstTryCorrectAnswerCount} />
  );
};

export default CompletedPracticeSessionSummary;
