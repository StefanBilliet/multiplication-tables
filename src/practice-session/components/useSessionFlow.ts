import { useState } from 'react';
import PracticeFlow, { type PracticeFlow as PracticeSession } from '../models/practiceFlow';
import type { Question } from '../models/types';

type UseSessionFlowResult = {
  session: PracticeSession;
  selectAnswer: (answer: number) => void;
  checkAnswer: () => void;
  continueSession: () => void;
  resetSession: () => void;
};

const useSessionFlow = (questionSequence: Question[]): UseSessionFlowResult => {
  const [session, setSession] = useState(() => PracticeFlow.start(questionSequence));

  const selectAnswer = (answer: number) => {
    setSession((currentSession) => PracticeFlow.selectAnswer(currentSession, answer));
  };

  const checkAnswer = () => {
    setSession((currentSession) => PracticeFlow.checkAnswer(currentSession));
  };

  const continueSession = () => {
    setSession((currentSession) => PracticeFlow.continueSession(currentSession));
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

export default useSessionFlow;
