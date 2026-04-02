import { useState } from 'react';
import type { PracticeFlow as PracticeSession } from '../models/practiceFlow';
import usePracticeSessionCompletionEffects from './usePracticeSessionCompletionEffects';
import useQuestionSource, { type QuestionSource } from './useQuestionSource';
import useSessionFlow from './useSessionFlow';

type UsePracticeSessionResult = {
  session: PracticeSession;
  hesitationTimerResetSignal: string;
  selectAnswer: (answer: number) => void;
  checkAnswer: () => void;
  continueSession: () => void;
  resetSession: () => void;
};

const usePracticeSession = (
  selectedTable: number,
  questionSource: QuestionSource = useQuestionSource,
): UsePracticeSessionResult => {
  const questionSequence = questionSource(selectedTable);
  const { session, selectAnswer, checkAnswer, continueSession, resetSession } = useSessionFlow(questionSequence);
  const [hesitationTimerResetKey, setHesitationTimerResetKey] = useState(0);
  usePracticeSessionCompletionEffects({ selectedTable, session });

  const triggerHesitationTimerReset = () => {
    setHesitationTimerResetKey((currentHesitationTimerResetKey) => currentHesitationTimerResetKey + 1);
  };

  const resetPracticeSession = () => {
    triggerHesitationTimerReset();
    resetSession();
  };

  return {
    session,
    selectAnswer,
    checkAnswer,
    continueSession,
    resetSession: resetPracticeSession,
    hesitationTimerResetSignal: String(hesitationTimerResetKey),
  };
};

export default usePracticeSession;
