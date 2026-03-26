import { useEffect } from "react";
import useLifetimeRewardTotal from "../../../shared/rewards/useLifetimeRewardTotal";
import { useAppStore } from "../../../shared/store/appStore";
import PracticeFlow, {
  type PracticeFlow as PracticeSession,
} from "../models/practiceFlow";

type UsePracticeSessionCompletionEffectsProps = {
  selectedTable: number;
  session: PracticeSession;
};

const usePracticeSessionCompletionEffects = ({
  selectedTable,
  session,
}: UsePracticeSessionCompletionEffectsProps) => {
  const { addReward } = useLifetimeRewardTotal();
  const recordSessionCompleted = useAppStore(
    (state) => state.recordSessionCompleted,
  );
  const shouldAddReward =
    PracticeFlow.isComplete(session) && PracticeFlow.hasEarnedReward(session);

  useEffect(() => {
    if (shouldAddReward) {
      addReward();
    }
  }, [addReward, shouldAddReward]);

  useEffect(() => {
    if (session.kind === "sessionComplete") {
      recordSessionCompleted({
        table: selectedTable,
        firstTryCorrectAnswerCount: session.firstTryCorrectAnswerCount,
        hasEarnedReward: PracticeFlow.hasEarnedReward(session),
        multiplicationErrors: session.multiplicationErrors,
      });
    }
  }, [recordSessionCompleted, selectedTable, session]);
};

export default usePracticeSessionCompletionEffects;
