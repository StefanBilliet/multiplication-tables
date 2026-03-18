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

  selectAnswer(flow: CurrentQuestionState, answer: number): PracticeFlow {
    return {
      ...flow,
      currentQuestion: {
        ...flow.currentQuestion,
        canCheckAnswer: true,
        selectedAnswer: answer,
      },
    };
  },

  checkAnswer(flow: CurrentQuestionState): PracticeFlow {
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

  nextQuestion(flow: CurrentQuestionState): PracticeFlow {
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

  continueSession(flow: CurrentQuestionState): PracticeFlow {
    return {
      kind: "sessionComplete",
      firstTryCorrectAnswerCount: flow.firstTryCorrectAnswerCount,
      hasEarnedReward:
        flow.firstTryCorrectAnswerCount >= REWARD_ELIGIBILITY_THRESHOLD,
    };
  },
};

export default PracticeFlow;
