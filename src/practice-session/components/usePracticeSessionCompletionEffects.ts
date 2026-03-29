import { Temporal } from '@js-temporal/polyfill';
import { useEffect } from 'react';
import useLifetimeRewardTotal from '../../app/hooks/useLifetimeRewardTotal';
import { useAppStore } from '../../app/store/appStore';
import PracticeFlow, { type PracticeFlow as PracticeSession } from '../models/practiceFlow';

type UsePracticeSessionCompletionEffectsProps = {
  selectedTable: number;
  session: PracticeSession;
};

const usePracticeSessionCompletionEffects = ({ selectedTable, session }: UsePracticeSessionCompletionEffectsProps) => {
  const { addReward } = useLifetimeRewardTotal();
  const recordSessionCompleted = useAppStore((state) => state.recordSessionCompleted);
  const shouldAddReward = PracticeFlow.isComplete(session) && PracticeFlow.hasEarnedReward(session);

  useEffect(() => {
    if (shouldAddReward) {
      addReward();
    }
  }, [addReward, shouldAddReward]);

  useEffect(() => {
    if (session.kind === 'sessionComplete') {
      recordSessionCompleted({
        id: crypto.randomUUID(),
        table: selectedTable,
        firstTryCorrectAnswerCount: session.firstTryCorrectAnswerCount,
        hasEarnedReward: PracticeFlow.hasEarnedReward(session),
        timestamp: Temporal.Now.instant(),
        multiplicationErrors: session.multiplicationErrors,
      });
    }
  }, [recordSessionCompleted, selectedTable, session]);
};

export default usePracticeSessionCompletionEffects;
