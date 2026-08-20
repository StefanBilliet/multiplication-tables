import { vi } from 'vitest';
import PracticeFlow from '../../models/practiceFlow.ts';
import { createQuestionSequenceFactory } from '../../models/questionSequenceFactory.ts';
import type { CurrentQuestionState } from '../../models/types.ts';

const regularQuestionSequence = createQuestionSequenceFactory(3).regular();
const twentyQuestionSequence = Array.from({ length: 20 }, (_, index) => ({
  table: 3,
  multiplier: index + 1,
}));

const startSessionWithControlledAnswerOrder = (): CurrentQuestionState => {
  const random = vi.spyOn(Math, 'random').mockReturnValue(301 / 233280);
  const session = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;
  random.mockRestore();

  return session;
};

function completeSession(startFlow: CurrentQuestionState, wrongMultipliers: number[] = []): PracticeFlow {
  let flow: CurrentQuestionState = startFlow;
  const questionCount = startFlow.questionSequence.length;

  for (let i = 1; i <= questionCount; i += 1) {
    const answer = wrongMultipliers.includes(i) ? 999 : i * startFlow.currentQuestion.table;
    flow = PracticeFlow.checkAnswer(
      PracticeFlow.selectAnswer(flow, answer) as CurrentQuestionState,
    ) as CurrentQuestionState;
    if (i < questionCount) {
      flow = PracticeFlow.nextQuestion(flow) as CurrentQuestionState;
    }
  }

  return PracticeFlow.continueSession(flow);
}

test('GIVEN a table is started, WHEN the first practice flow state is created, THEN it exposes the first current question', () => {
  const sut = startSessionWithControlledAnswerOrder();

  expect(sut).toEqual({
    kind: 'currentQuestion',
    currentQuestionIndex: 0,
    currentQuestion: {
      answerOptions: [6, 9, 12, 15, 18, 21, 24, 27, 30, 3],
      canCheckAnswer: false,
      canContinue: false,
      feedbackState: null,
      hasRetriedCurrentQuestion: false,
      multiplier: 1,
      selectedAnswer: null,
      table: 3,
    },
    firstTryCorrectAnswerCount: 0,
    multiplicationErrors: [],
    questionSequence: regularQuestionSequence,
  });
});

test('GIVEN a current question is shown, WHEN a correct answer is selected and checked, THEN the flow shows correct feedback', () => {
  const sut = startSessionWithControlledAnswerOrder();

  const flowWithSelectedAnswer = PracticeFlow.selectAnswer(sut, 3) as CurrentQuestionState;
  const nextFlow = PracticeFlow.checkAnswer(flowWithSelectedAnswer) as CurrentQuestionState;

  expect(nextFlow).toEqual({
    kind: 'currentQuestion',
    currentQuestionIndex: 0,
    currentQuestion: {
      answerOptions: [6, 9, 12, 15, 18, 21, 24, 27, 30, 3],
      canCheckAnswer: false,
      canContinue: true,
      feedbackState: 'correct',
      hasRetriedCurrentQuestion: false,
      multiplier: 1,
      selectedAnswer: 3,
      table: 3,
    },
    firstTryCorrectAnswerCount: 1,
    multiplicationErrors: [],
    questionSequence: regularQuestionSequence,
  });
});

test('GIVEN a current question is shown, WHEN an incorrect answer is selected and checked, THEN the flow shows feedback that the answer was wrong', () => {
  const sut = startSessionWithControlledAnswerOrder();

  const flowWithSelectedAnswer = PracticeFlow.selectAnswer(sut, 6) as CurrentQuestionState;
  const nextFlow = PracticeFlow.checkAnswer(flowWithSelectedAnswer) as CurrentQuestionState;

  expect(nextFlow).toEqual({
    kind: 'currentQuestion',
    currentQuestionIndex: 0,
    currentQuestion: {
      answerOptions: [6, 9, 12, 15, 18, 21, 24, 27, 30, 3],
      canCheckAnswer: false,
      canContinue: false,
      feedbackState: 'incorrect',
      hasRetriedCurrentQuestion: true,
      multiplier: 1,
      selectedAnswer: null,
      table: 3,
    },
    firstTryCorrectAnswerCount: 0,
    multiplicationErrors: [{ table: 3, multiplier: 1 }],
    questionSequence: regularQuestionSequence,
  });
});

test('GIVEN a current question is shown, WHEN an incorrect answer is selected and checked, THEN the flow tracks that multiplication error', () => {
  const sut = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;

  const flowWithSelectedAnswer = PracticeFlow.selectAnswer(sut, 6) as CurrentQuestionState;
  const nextFlow = PracticeFlow.checkAnswer(flowWithSelectedAnswer) as CurrentQuestionState;

  expect(nextFlow.multiplicationErrors).toEqual([{ table: 3, multiplier: 1 }]);
});

test('GIVEN a correct answer was checked, WHEN the user continues to the next question, THEN the next question is shown with multiplier 2', () => {
  const sut = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;

  const flowWithSelectedAnswer = PracticeFlow.selectAnswer(sut, 3) as CurrentQuestionState;
  const flowWithCheckedAnswer = PracticeFlow.checkAnswer(flowWithSelectedAnswer) as CurrentQuestionState;
  const flowWithNextQuestion = PracticeFlow.nextQuestion(flowWithCheckedAnswer);

  expect(flowWithNextQuestion).toEqual({
    kind: 'currentQuestion',
    currentQuestionIndex: 1,
    currentQuestion: {
      answerOptions: expect.any(Array),
      canCheckAnswer: false,
      canContinue: false,
      feedbackState: null,
      hasRetriedCurrentQuestion: false,
      multiplier: 2,
      selectedAnswer: null,
      table: 3,
    },
    firstTryCorrectAnswerCount: 1,
    multiplicationErrors: [],
    questionSequence: regularQuestionSequence,
  });
});

test('GIVEN an incorrect answer was checked and the user retries, WHEN the correct answer is selected and checked, THEN the question does not count toward first-try correct answers', () => {
  const sut = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;

  const flowWithWrongAnswer = PracticeFlow.selectAnswer(sut, 6) as CurrentQuestionState;
  const flowWithCheckedWrongAnswer = PracticeFlow.checkAnswer(flowWithWrongAnswer) as CurrentQuestionState;
  const flowWithRetryAnswer = PracticeFlow.selectAnswer(flowWithCheckedWrongAnswer, 3) as CurrentQuestionState;
  const flowWithCheckedRetryAnswer = PracticeFlow.checkAnswer(flowWithRetryAnswer) as CurrentQuestionState;

  expect(flowWithCheckedRetryAnswer.firstTryCorrectAnswerCount).toBe(0);
});

test('GIVEN a session in progress, WHEN isComplete is called, THEN it returns false', () => {
  const sut = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;

  const result = PracticeFlow.isComplete(sut);

  expect(result).toBe(false);
});

test('GIVEN a completed session, WHEN isComplete is called, THEN it returns true', () => {
  const sut = completeSession(PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState);

  const result = PracticeFlow.isComplete(sut);

  expect(result).toBe(true);
});

test('GIVEN a session in progress, WHEN hasEarnedReward is called, THEN it returns false', () => {
  const sut = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;

  const result = PracticeFlow.hasEarnedReward(sut);

  expect(result).toBe(false);
});

test('GIVEN a shuffled question sequence is started, WHEN the session is created, THEN it preserves the provided sequence', () => {
  const shuffledQuestionSequence = createQuestionSequenceFactory(3, () => 0.1).shuffled();

  const sut = PracticeFlow.start(shuffledQuestionSequence) as CurrentQuestionState;

  expect(sut.questionSequence).toEqual(shuffledQuestionSequence);
});

test('GIVEN the same multiplication, WHEN two sessions start, THEN they can have different answer orders', () => {
  const random = vi.spyOn(Math, 'random').mockReturnValueOnce(0.1).mockReturnValueOnce(0.9);

  const firstSession = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;
  const secondSession = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;
  random.mockRestore();

  expect(firstSession.currentQuestion.answerOptions).not.toEqual(secondSession.currentQuestion.answerOptions);
});

test('GIVEN a completed session with 7+ correct answers, WHEN hasEarnedReward is called, THEN it returns true', () => {
  const sut = completeSession(PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState);

  const result = PracticeFlow.hasEarnedReward(sut);

  expect(result).toBe(true);
});

test('GIVEN a completed session with 6 correct answers, WHEN hasEarnedReward is called, THEN it returns false', () => {
  const sut = completeSession(PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState, [1, 2, 3, 4]);

  const result = PracticeFlow.hasEarnedReward(sut);

  expect(result).toBe(false);
});

test.each([
  { correctCount: 13, hasEarnedReward: false, wrongMultipliers: [1, 2, 3, 4, 5, 6, 7] },
  { correctCount: 14, hasEarnedReward: true, wrongMultipliers: [1, 2, 3, 4, 5, 6] },
])('GIVEN a completed 20-question session with $correctCount correct answers, WHEN hasEarnedReward is called, THEN it is $hasEarnedReward', ({
  correctCount,
  hasEarnedReward,
  wrongMultipliers,
}) => {
  const sut = completeSession(PracticeFlow.start(twentyQuestionSequence) as CurrentQuestionState, wrongMultipliers);

  expect(sut.firstTryCorrectAnswerCount).toBe(correctCount);
  expect(PracticeFlow.hasEarnedReward(sut)).toBe(hasEarnedReward);
});

test.each([
  {
    correctCount: 0,
    hasEarnedReward: false,
    wrongMultipliers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  { correctCount: 6, hasEarnedReward: false, wrongMultipliers: [1, 2, 3, 4] },
  { correctCount: 7, hasEarnedReward: true, wrongMultipliers: [1, 2, 3] },
  { correctCount: 10, hasEarnedReward: true, wrongMultipliers: [] },
])('GIVEN $correctCount questions are answered correctly on first try, WHEN the session completes, THEN hasEarnedReward is $hasEarnedReward', ({
  correctCount,
  hasEarnedReward,
  wrongMultipliers,
}) => {
  const completedFlow = completeSession(
    PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState,
    wrongMultipliers,
  );

  expect(completedFlow).toEqual({
    kind: 'sessionComplete',
    firstTryCorrectAnswerCount: correctCount,
    hasEarnedReward,
    multiplicationErrors: wrongMultipliers.map((multiplier) => ({
      table: 3,
      multiplier,
    })),
  });
});
