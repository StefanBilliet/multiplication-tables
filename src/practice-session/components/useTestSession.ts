import type { Question } from '../models/types';
import useSessionFlow from './useSessionFlow';
import useTestSessionCompletionEffects from './useTestSessionCompletionEffects';

export type TestQuestionSource = () => Question[];

const useTestSession = (questionSource: TestQuestionSource) => {
  const { session, ...sessionFlow } = useSessionFlow(questionSource());
  useTestSessionCompletionEffects({ session });

  return {
    session,
    ...sessionFlow,
  };
};

export default useTestSession;
