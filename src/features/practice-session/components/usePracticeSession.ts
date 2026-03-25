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
};

const usePracticeSession = (
  selectedTable: number,
): UsePracticeSessionResult => {
  const questionOrderMode = useAppStore((state) => state.questionOrderMode);
  const [session, setSession] = useState(() =>
    PracticeFlow.start(selectedTable, questionOrderMode),
  );
  const { addReward } = useLifetimeRewardTotal();
  const addMultiplicationError = useAppStore(
    (state) => state.addMultiplicationError,
  );
  const shouldAddReward =
    PracticeFlow.isComplete(session) && PracticeFlow.hasEarnedReward(session);

  useEffect(() => {
    if (shouldAddReward) {
      addReward();
    }
  }, [addReward, shouldAddReward]);

  useEffect(() => {
    if (PracticeFlow.isComplete(session)) {
      session.multiplicationErrors.forEach((error) => {
        addMultiplicationError(error);
      });
    }
  }, [addMultiplicationError, session]);

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

  return {
    session,
    selectAnswer,
    checkAnswer,
    continueSession,
  };
};

export default usePracticeSession;
