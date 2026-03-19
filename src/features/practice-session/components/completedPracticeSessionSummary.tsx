import type { FC } from "react";
import ReactConfetti from "react-confetti";
import { createPortal } from "react-dom";
import useLifetimeRewardTotal from "../../../shared/rewards/useLifetimeRewardTotal";
import type { PracticeFlow as PracticeFlowType } from "../models/practiceFlow";
import PracticeFlow from "../models/practiceFlow";
import RewardEarnedSummary from "./rewardEarnedSummary";
import SessionSummary from "./sessionSummary";

type CompletedPracticeSessionSummaryProps = {
  session: PracticeFlowType;
};

const CONFETTI_COLORS = ["#FFD700", "#20B2AA", "#FFA500"] as const;

const CompletedPracticeSessionSummary: FC<
  CompletedPracticeSessionSummaryProps
> = ({ session }) => {
  const { lifetimeRewardTotal } = useLifetimeRewardTotal();
  const hasEarnedReward = PracticeFlow.hasEarnedReward(session);

  return (
    <>
      {hasEarnedReward &&
        createPortal(
          <ReactConfetti
            recycle={false}
            numberOfPieces={200}
            tweenDuration={8000}
            gravity={0.08}
            colors={[...CONFETTI_COLORS]}
          />,
          document.body,
        )}

      {hasEarnedReward ? (
        <RewardEarnedSummary
          correctAnswerCount={session.firstTryCorrectAnswerCount}
          lifetimeRewardTotal={lifetimeRewardTotal}
        />
      ) : (
        <SessionSummary
          correctAnswerCount={session.firstTryCorrectAnswerCount}
        />
      )}
    </>
  );
};

export default CompletedPracticeSessionSummary;
