import { Temporal } from '@js-temporal/polyfill';
import { useEffect } from 'react';
import { useAppStore } from '../../app/store/appStore';
import hasTestSessionEarnedReward from '../models/hasTestSessionEarnedReward';
import type { PracticeFlow as PracticeSession } from '../models/practiceFlow';

type UseTestSessionCompletionEffectsProps = {
  session: PracticeSession;
};

const useTestSessionCompletionEffects = ({ session }: UseTestSessionCompletionEffectsProps) => {
  const recordTestSessionCompleted = useAppStore((state) => state.recordTestSessionCompleted);

  useEffect(() => {
    if (session.kind === 'sessionComplete') {
      recordTestSessionCompleted({
        id: crypto.randomUUID(),
        type: 'test',
        firstTryCorrectAnswerCount: session.firstTryCorrectAnswerCount,
        hasEarnedReward: hasTestSessionEarnedReward(session),
        timestamp: Temporal.Now.instant(),
        multiplicationErrors: session.multiplicationErrors,
      });
    }
  }, [recordTestSessionCompleted, session]);
};

export default useTestSessionCompletionEffects;
