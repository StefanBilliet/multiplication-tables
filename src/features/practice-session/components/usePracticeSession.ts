import { useEffect, useState } from "react";
import useLifetimeRewardTotal from "../../../shared/rewards/useLifetimeRewardTotal";
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
  const [session, setSession] = useState(() =>
    PracticeFlow.start(selectedTable),
  );
  const { addReward } = useLifetimeRewardTotal();
  const shouldAddReward =
    PracticeFlow.isComplete(session) && PracticeFlow.hasEarnedReward(session);

  useEffect(() => {
    if (shouldAddReward) {
      addReward();
    }
  }, [addReward, shouldAddReward]);

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
