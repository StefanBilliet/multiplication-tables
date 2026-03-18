import { shuffleAnswerOptions } from "../utils/practiceFlowUtils";

type CurrentQuestion = {
  answerOptions: number[];
  canCheckAnswer: boolean;
  canContinue: boolean;
  feedbackState: "correct" | "incorrect" | null;
  hasRetriedCurrentQuestion: boolean;
  multiplier: number;
  selectedAnswer: number | null;
  table: number;
};

type SessionComplete = {
  kind: "sessionComplete";
  firstTryCorrectAnswerCount: number;
  hasEarnedReward: boolean;
};

type PracticeFlow = CurrentQuestionState | SessionComplete;

export type { PracticeFlow };

export type CurrentQuestionState = {
  kind: "currentQuestion";
  currentQuestion: CurrentQuestion;
  firstTryCorrectAnswerCount: number;
};

const REWARD_ELIGIBILITY_THRESHOLD = 7;

const PracticeFlow = {
  start(table: number): PracticeFlow {
    return {
      kind: "currentQuestion",
      currentQuestion: {
        answerOptions: this.answerOptions(table, 1),
        canCheckAnswer: false,
        canContinue: false,
        feedbackState: null,
        hasRetriedCurrentQuestion: false,
        multiplier: 1,
        selectedAnswer: null,
        table,
      },
      firstTryCorrectAnswerCount: 0,
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

    const earnedFirstTryPoint =
      isCorrect && !flow.currentQuestion.hasRetriedCurrentQuestion;

    return {
      ...flow,
      currentQuestion: {
        ...flow.currentQuestion,
        canCheckAnswer: false,
        canContinue: isCorrect,
        feedbackState: isCorrect ? "correct" : "incorrect",
        selectedAnswer: isCorrect ? flow.currentQuestion.selectedAnswer : null,
        hasRetriedCurrentQuestion:
          !isCorrect || flow.currentQuestion.hasRetriedCurrentQuestion,
      },
      firstTryCorrectAnswerCount: earnedFirstTryPoint
        ? flow.firstTryCorrectAnswerCount + 1
        : flow.firstTryCorrectAnswerCount,
    };
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
        answerOptions: this.answerOptions(
          flow.currentQuestion.table,
          nextMultiplier,
        ),
      },
    };
  },

  answerOptions(table: number, multiplier: number): number[] {
    const answerOptions = Array.from(
      { length: 10 },
      (_, index) => table * (index + 1),
    );

    return shuffleAnswerOptions(answerOptions, table * 100 + multiplier);
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
