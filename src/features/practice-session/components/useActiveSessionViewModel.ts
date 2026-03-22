import type { PracticeFlow as PracticeFlowType } from "../models/practiceFlow";
import PracticeFlow from "../models/practiceFlow";

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
  answerOptions: PracticeFlow.getAnswerOptions(session),
  canCheck: PracticeFlow.canCheck(session),
  feedbackAnimation: PracticeFlow.feedbackAnimation(session),
  feedbackState: PracticeFlow.feedbackState(session),
  hasCorrectFeedback: PracticeFlow.hasCorrectFeedback(session),
  multiplier:
    session.kind === "currentQuestion" ? session.currentQuestion.multiplier : 1,
  selectedAnswer: PracticeFlow.selectedAnswer(session),
});

export default useActiveSessionViewModel;
