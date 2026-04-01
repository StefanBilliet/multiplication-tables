import { useState } from 'react';
import PracticeFlow, { type PracticeFlow as PracticeSession } from '../models/practiceFlow';
import usePracticeSessionCompletionEffects from './usePracticeSessionCompletionEffects';
import useQuestionSource, { type QuestionSource } from './useQuestionSource';

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
  const [session, setSession] = useState(() => PracticeFlow.start(questionSequence));
  const [hesitationTimerResetKey, setHesitationTimerResetKey] = useState(0);
  usePracticeSessionCompletionEffects({ selectedTable, session });

  const triggerHesitationTimerReset = () => {
    setHesitationTimerResetKey((currentHesitationTimerResetKey) => currentHesitationTimerResetKey + 1);
  };

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
    triggerHesitationTimerReset();
    setSession((currentSession) => PracticeFlow.reset(currentSession));
  };

  return {
    session,
    selectAnswer,
    checkAnswer,
    continueSession,
    resetSession,
    hesitationTimerResetSignal: String(hesitationTimerResetKey),
  };
};

export default usePracticeSession;
