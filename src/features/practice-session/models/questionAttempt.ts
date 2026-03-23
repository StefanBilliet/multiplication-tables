import { shuffleAnswerOptions } from "../utils/practiceFlowUtils.ts";
import { attemptOutcome } from "./attemptOutcome.ts";
import type { CurrentQuestionState, SessionComplete } from "./types.ts";

type PracticeFlow = CurrentQuestionState | SessionComplete;

const isCurrentQuestion = (flow: PracticeFlow): flow is CurrentQuestionState =>
  flow.kind === "currentQuestion";

const createAnswerOptions = (table: number, multiplier: number): number[] => {
  const options = Array.from({ length: 10 }, (_, index) => table * (index + 1));

  return shuffleAnswerOptions(options, table * 100 + multiplier);
};

export const questionAttempt = {
  start(table: number): PracticeFlow {
    return {
      kind: "currentQuestion",
      currentQuestion: {
        answerOptions: createAnswerOptions(table, 1),
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
    if (!isCurrentQuestion(flow)) return flow;

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
    if (!isCurrentQuestion(flow)) return flow;
    if (flow.currentQuestion.selectedAnswer === null) {
      return flow;
    }

    const correctAnswer =
      flow.currentQuestion.multiplier * flow.currentQuestion.table;
    const isCorrect = flow.currentQuestion.selectedAnswer === correctAnswer;

    return isCorrect
      ? attemptOutcome.correct(flow)
      : attemptOutcome.incorrect(flow);
  },

  nextQuestion(flow: PracticeFlow): PracticeFlow {
    if (!isCurrentQuestion(flow)) return flow;

    const nextMultiplier = flow.currentQuestion.multiplier + 1;

    return {
      ...flow,
      currentQuestion: {
        ...flow.currentQuestion,
        answerOptions: createAnswerOptions(
          flow.currentQuestion.table,
          nextMultiplier,
        ),
        canCheckAnswer: false,
        canContinue: false,
        feedbackState: null,
        hasRetriedCurrentQuestion: false,
        multiplier: nextMultiplier,
        selectedAnswer: null,
      },
    };
  },
};
