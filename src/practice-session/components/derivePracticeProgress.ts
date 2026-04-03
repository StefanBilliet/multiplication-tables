import type { CurrentQuestionState } from '../models/types';

const derivePracticeProgress = (session: CurrentQuestionState) => {
  return {
    currentQuestion: session.currentQuestionIndex + 1,
    questionCount: session.questionSequence.length,
  };
};

export default derivePracticeProgress;
