import { useEffect, useState } from "react";
import useLifetimeRewardTotal from "../../../shared/rewards/useLifetimeRewardTotal";
import { useAppStore } from "../../../shared/store/appStore";
import PracticeFlow, {
  type PracticeFlow as PracticeSession,
} from "../models/practiceFlow";

type UsePracticeSessionResult = {
  session: PracticeSession;
  selectAnswer: (answer: number) => void;
  checkAnswer: () => void;
  continueSession: () => void;
  resetSession: () => void;
};

const usePracticeSession = (
  selectedTable: number,
): UsePracticeSessionResult => {
  const questionOrderMode = useAppStore((state) => state.questionOrderMode);
  const [session, setSession] = useState(() =>
    PracticeFlow.start(selectedTable, questionOrderMode),
  );
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

  const selectAnswer = (answer: number) => {
    setSession((currentSession) =>
      PracticeFlow.selectAnswer(currentSession, answer),
    );
  };

  const checkAnswer = () => {
    setSession((currentSession) => PracticeFlow.checkAnswer(currentSession));
  };

  const continueSession = () => {
    setSession((currentSession) =>
      PracticeFlow.continueSession(currentSession),
    );
  };

  const resetSession = () => {
    setSession((currentSession) => PracticeFlow.reset(currentSession));
  };

  return {
    session,
    selectAnswer,
    checkAnswer,
    continueSession,
    resetSession,
  };
};

export default usePracticeSession;
