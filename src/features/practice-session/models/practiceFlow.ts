import { answerOptions } from "./answerOptions.ts";
import { correctAnswerResult } from "./correctAnswerResult.ts";
import { incorrectAnswerResult } from "./incorrectAnswerResult.ts";
import type { CurrentQuestionState, SessionComplete } from "./types.ts";

type PracticeFlow = CurrentQuestionState | SessionComplete;

export type { PracticeFlow };

const REWARD_ELIGIBILITY_THRESHOLD = 7;

const PracticeFlow = {
  start(table: number): PracticeFlow {
    return {
      kind: "currentQuestion",
      currentQuestion: {
        answerOptions: answerOptions(table, 1),
        canCheckAnswer: false,
        canContinue: false,
        feedbackState: null,
        hasRetriedCurrentQuestion: false,
        multiplier: 1,
        selectedAnswer: null,
        table,
      },
      firstTryCorrectAnswerCount: 0,
      multiplicationErrors: [],
    };
  },

  selectAnswer(flow: PracticeFlow, answer: number): PracticeFlow {
    if (flow.kind === "sessionComplete") return flow;

    return {
      ...flow,
      currentQuestion: {
        ...flow.currentQuestion,
        canCheckAnswer: true,
        selectedAnswer: answer,
      },
    };
  },

  checkAnswer(flow: PracticeFlow): PracticeFlow {
    if (flow.kind === "sessionComplete") return flow;
    if (flow.currentQuestion.selectedAnswer === null) {
      return flow;
    }

    const correctAnswer =
      flow.currentQuestion.multiplier * flow.currentQuestion.table;
    const isCorrect = flow.currentQuestion.selectedAnswer === correctAnswer;

    if (!isCorrect) {
      return incorrectAnswerResult(flow);
    }

    return correctAnswerResult(flow);
  },

  nextQuestion(flow: PracticeFlow): PracticeFlow {
    if (flow.kind === "sessionComplete") return flow;

    const nextMultiplier = flow.currentQuestion.multiplier + 1;

    return {
      ...flow,
      currentQuestion: {
        ...flow.currentQuestion,
        canCheckAnswer: false,
        canContinue: false,
        feedbackState: null,
        hasRetriedCurrentQuestion: false,
        multiplier: nextMultiplier,
        selectedAnswer: null,
        answerOptions: answerOptions(
          flow.currentQuestion.table,
          nextMultiplier,
        ),
      },
    };
  },

  getAnswerOptions(flow: PracticeFlow): number[] {
    return flow.kind === "currentQuestion"
      ? flow.currentQuestion.answerOptions
      : [];
  },

  continueSession(flow: PracticeFlow): PracticeFlow {
    if (flow.kind === "sessionComplete") return flow;
    if (flow.currentQuestion.multiplier >= 10) {
      return {
        kind: "sessionComplete",
        firstTryCorrectAnswerCount: flow.firstTryCorrectAnswerCount,
        hasEarnedReward:
          flow.firstTryCorrectAnswerCount >= REWARD_ELIGIBILITY_THRESHOLD,
        multiplicationErrors: flow.multiplicationErrors,
      };
    }

    return this.nextQuestion(flow);
  },

  hasCorrectFeedback(flow: PracticeFlow): boolean {
    return (
      flow.kind === "currentQuestion" &&
      flow.currentQuestion.feedbackState === "correct"
    );
  },

  selectedAnswer(flow: PracticeFlow): number | null {
    return flow.kind === "currentQuestion"
      ? flow.currentQuestion.selectedAnswer
      : null;
  },

  canCheck(flow: PracticeFlow): boolean {
    return (
      flow.kind === "currentQuestion" && flow.currentQuestion.canCheckAnswer
    );
  },

  feedbackAnimation(flow: PracticeFlow): "pop" | "wobble" | null {
    if (flow.kind !== "currentQuestion") return null;
    if (flow.currentQuestion.feedbackState === null) return null;
    return flow.currentQuestion.feedbackState === "correct" ? "pop" : "wobble";
  },

  isComplete(flow: PracticeFlow): boolean {
    return flow.kind === "sessionComplete";
  },

  hasEarnedReward(flow: PracticeFlow): boolean {
    return flow.kind === "sessionComplete" && flow.hasEarnedReward;
  },

  feedbackState(flow: PracticeFlow): "correct" | "incorrect" | null {
    return flow.kind === "currentQuestion"
      ? flow.currentQuestion.feedbackState
      : null;
  },
};

export default PracticeFlow;
