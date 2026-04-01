import { shuffleAnswerOptions } from '../utils/practiceFlowUtils.ts';
import { attemptOutcome } from './attemptOutcome.ts';
import { createQuestionCursor, getCurrentQuestion } from './questionCursor.ts';
import type { CurrentQuestionState, Question, SessionComplete } from './types.ts';

type PracticeFlow = CurrentQuestionState | SessionComplete;

const isCurrentQuestion = (flow: PracticeFlow): flow is CurrentQuestionState => flow.kind === 'currentQuestion';

const createAnswerOptions = (table: number, multiplier: number): number[] => {
  const options = Array.from({ length: 10 }, (_, index) => table * (index + 1));

  return shuffleAnswerOptions(options, table * 100 + multiplier);
};

const createCurrentQuestion = (question: Question) => ({
  answerOptions: createAnswerOptions(question.table, question.multiplier),
  canCheckAnswer: false,
  canContinue: false,
  feedbackState: null,
  hasRetriedCurrentQuestion: false,
  multiplier: question.multiplier,
  selectedAnswer: null,
  table: question.table,
});

export const questionAttempt = {
  start(questionSequence: Question[]): PracticeFlow {
    const currentQuestionCursor = createQuestionCursor(questionSequence, 0);

    return {
      kind: 'currentQuestion',
      currentQuestionIndex: 0,
      currentQuestion: {
        ...createCurrentQuestion(getCurrentQuestion(currentQuestionCursor)),
      },
      firstTryCorrectAnswerCount: 0,
      multiplicationErrors: [],
      questionSequence,
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

    const correctAnswer = flow.currentQuestion.multiplier * flow.currentQuestion.table;
    const isCorrect = flow.currentQuestion.selectedAnswer === correctAnswer;

    return isCorrect ? attemptOutcome.correct(flow) : attemptOutcome.incorrect(flow);
  },

  nextQuestion(flow: PracticeFlow): PracticeFlow {
    if (!isCurrentQuestion(flow)) return flow;

    const nextQuestionIndex = flow.currentQuestionIndex + 1;
    const nextQuestionCursor = createQuestionCursor(flow.questionSequence, nextQuestionIndex);

    return {
      ...flow,
      currentQuestionIndex: nextQuestionIndex,
      currentQuestion: {
        ...createCurrentQuestion(getCurrentQuestion(nextQuestionCursor)),
      },
    };
  },

  reset(flow: PracticeFlow): PracticeFlow {
    if (!isCurrentQuestion(flow)) return flow;

    return {
      kind: 'currentQuestion',
      currentQuestionIndex: 0,
      currentQuestion: {
        ...createCurrentQuestion(getCurrentQuestion(createQuestionCursor(flow.questionSequence, 0))),
      },
      firstTryCorrectAnswerCount: 0,
      multiplicationErrors: [],
      questionSequence: flow.questionSequence,
    };
  },
};
