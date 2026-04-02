import type { Question } from '../models/types';
import useSessionFlow from './useSessionFlow';
import useTestSessionCompletionEffects from './useTestSessionCompletionEffects';

const useTestSession = (questionSequence: Question[]) => {
  const { session, ...sessionFlow } = useSessionFlow(questionSequence);
  useTestSessionCompletionEffects({ session });

  return {
    session,
    ...sessionFlow,
  };
};

export default useTestSession;
