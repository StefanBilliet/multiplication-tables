import type { PracticeFlow as PracticeFlowType } from "../models/practiceFlow";
import { questionAttemptView } from "../models/questionAttemptView";

type ActiveSessionViewModel = {
  answerOptions: number[];
  canCheck: boolean;
  feedbackAnimation: "pop" | "wobble" | null;
  feedbackState: "correct" | "incorrect" | null;
  hasCorrectFeedback: boolean;
  multiplier: number;
  selectedAnswer: number | null;
};

const useActiveSessionViewModel = (
  session: PracticeFlowType,
): ActiveSessionViewModel => ({
  answerOptions: questionAttemptView.getAnswerOptions(session),
  canCheck: questionAttemptView.canCheck(session),
  feedbackAnimation: questionAttemptView.feedbackAnimation(session),
  feedbackState: questionAttemptView.feedbackState(session),
  hasCorrectFeedback: questionAttemptView.hasCorrectFeedback(session),
  multiplier:
    session.kind === "currentQuestion" ? session.currentQuestion.multiplier : 1,
  selectedAnswer: questionAttemptView.selectedAnswer(session),
});

export default useActiveSessionViewModel;
