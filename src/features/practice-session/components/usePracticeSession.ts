import { useState } from "react";
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

  const selectAnswer = (answer: number) => {
    setSession((currentSession) =>
      PracticeFlow.selectAnswer(currentSession, answer),
    );
  };

  const checkAnswer = () => {
    setSession((currentSession) => PracticeFlow.checkAnswer(currentSession));
  };

  const continueSession = () => {
    setSession((currentSession) => {
      const nextSession = PracticeFlow.continueSession(currentSession);

      if (
        PracticeFlow.isComplete(nextSession) &&
        PracticeFlow.hasEarnedReward(nextSession)
      ) {
        addReward();
      }

      return nextSession;
    });
  };

  return {
    session,
    selectAnswer,
    checkAnswer,
    continueSession,
  };
};

export default usePracticeSession;
