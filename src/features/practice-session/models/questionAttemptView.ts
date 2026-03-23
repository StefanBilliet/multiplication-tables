import type { CurrentQuestionState, SessionComplete } from "./types.ts";

type PracticeFlow = CurrentQuestionState | SessionComplete;

const isCurrentQuestion = (flow: PracticeFlow): flow is CurrentQuestionState =>
  flow.kind === "currentQuestion";

export const questionAttemptView = {
  getAnswerOptions(flow: PracticeFlow): number[] {
    return isCurrentQuestion(flow) ? flow.currentQuestion.answerOptions : [];
  },

  hasCorrectFeedback(flow: PracticeFlow): boolean {
    return (
      isCurrentQuestion(flow) &&
      flow.currentQuestion.feedbackState === "correct"
    );
  },

  selectedAnswer(flow: PracticeFlow): number | null {
    return isCurrentQuestion(flow) ? flow.currentQuestion.selectedAnswer : null;
  },

  canCheck(flow: PracticeFlow): boolean {
    return isCurrentQuestion(flow) && flow.currentQuestion.canCheckAnswer;
  },

  feedbackAnimation(flow: PracticeFlow): "pop" | "wobble" | null {
    if (!isCurrentQuestion(flow)) return null;
    if (flow.currentQuestion.feedbackState === null) return null;

    return flow.currentQuestion.feedbackState === "correct" ? "pop" : "wobble";
  },

  feedbackState(flow: PracticeFlow): "correct" | "incorrect" | null {
    return isCurrentQuestion(flow) ? flow.currentQuestion.feedbackState : null;
  },
};
