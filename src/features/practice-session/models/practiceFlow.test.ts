import PracticeFlow, { type CurrentQuestionState } from "./practiceFlow";

test("GIVEN a table is started, WHEN the first practice flow state is created, THEN it exposes the first current question", () => {
  const sut = PracticeFlow.start(3);

  expect(sut).toEqual({
    kind: "currentQuestion",
    currentQuestion: {
      answerOptions: [6, 9, 15, 21, 30, 24, 18, 3, 12, 27],
      canCheckAnswer: false,
      canContinue: false,
      feedbackState: null,
      hasRetriedCurrentQuestion: false,
      multiplier: 1,
      selectedAnswer: null,
      table: 3,
    },
    firstTryCorrectAnswerCount: 0,
  });
});

test("GIVEN a current question is shown, WHEN a correct answer is selected and checked, THEN the flow shows correct feedback", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const flowWithSelectedAnswer = PracticeFlow.selectAnswer(
    sut,
    3,
  ) as CurrentQuestionState;
  const nextFlow = PracticeFlow.checkAnswer(
    flowWithSelectedAnswer,
  ) as CurrentQuestionState;

  expect(nextFlow).toEqual({
    kind: "currentQuestion",
    currentQuestion: {
      answerOptions: [6, 9, 15, 21, 30, 24, 18, 3, 12, 27],
      canCheckAnswer: false,
      canContinue: true,
      feedbackState: "correct",
      hasRetriedCurrentQuestion: false,
      multiplier: 1,
      selectedAnswer: 3,
      table: 3,
    },
    firstTryCorrectAnswerCount: 1,
  });
});

test("GIVEN a current question is shown, WHEN an incorrect answer is selected and checked, THEN the flow shows feedback that the answer was wrong", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const flowWithSelectedAnswer = PracticeFlow.selectAnswer(
    sut,
    6,
  ) as CurrentQuestionState;
  const nextFlow = PracticeFlow.checkAnswer(
    flowWithSelectedAnswer,
  ) as CurrentQuestionState;

  expect(nextFlow).toEqual({
    kind: "currentQuestion",
    currentQuestion: {
      answerOptions: [6, 9, 15, 21, 30, 24, 18, 3, 12, 27],
      canCheckAnswer: false,
      canContinue: false,
      feedbackState: "incorrect",
      hasRetriedCurrentQuestion: true,
      multiplier: 1,
      selectedAnswer: null,
      table: 3,
    },
    firstTryCorrectAnswerCount: 0,
  });
});

test("GIVEN a correct answer was checked, WHEN the user continues to the next question, THEN the next question is shown with multiplier 2", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const flowWithSelectedAnswer = PracticeFlow.selectAnswer(
    sut,
    3,
  ) as CurrentQuestionState;
  const flowWithCheckedAnswer = PracticeFlow.checkAnswer(
    flowWithSelectedAnswer,
  ) as CurrentQuestionState;
  const flowWithNextQuestion = PracticeFlow.nextQuestion(flowWithCheckedAnswer);

  expect(flowWithNextQuestion).toEqual({
    kind: "currentQuestion",
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
  });
});

test("GIVEN an incorrect answer was checked and the user retries, WHEN the correct answer is selected and checked, THEN the question does not count toward first-try correct answers", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const flowWithWrongAnswer = PracticeFlow.selectAnswer(
    sut,
    6,
  ) as CurrentQuestionState;
  const flowWithCheckedWrongAnswer = PracticeFlow.checkAnswer(
    flowWithWrongAnswer,
  ) as CurrentQuestionState;
  const flowWithRetryAnswer = PracticeFlow.selectAnswer(
    flowWithCheckedWrongAnswer,
    3,
  ) as CurrentQuestionState;
  const flowWithCheckedRetryAnswer = PracticeFlow.checkAnswer(
    flowWithRetryAnswer,
  ) as CurrentQuestionState;

  expect(flowWithCheckedRetryAnswer.firstTryCorrectAnswerCount).toBe(0);
});

test.each([
  { correctCount: 0, hasEarnedReward: false },
  { correctCount: 6, hasEarnedReward: false },
  { correctCount: 7, hasEarnedReward: true },
  { correctCount: 10, hasEarnedReward: true },
])("GIVEN $correctCount questions are answered correctly on first try, WHEN the session completes, THEN hasEarnedReward is $hasEarnedReward", ({
  correctCount,
  hasEarnedReward,
}) => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  let flow: CurrentQuestionState = sut;
  const wrongCount = 10 - correctCount;
  const wrongMultipliers = Array.from({ length: wrongCount }, (_, i) => i + 1);

  for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
    const answer = wrongMultipliers.includes(multiplier) ? 999 : multiplier * 3;
    flow = PracticeFlow.selectAnswer(flow, answer) as CurrentQuestionState;
    flow = PracticeFlow.checkAnswer(flow) as CurrentQuestionState;

    if (multiplier < 10) {
      flow = PracticeFlow.nextQuestion(flow) as CurrentQuestionState;
    }
  }

  const completedFlow = PracticeFlow.continueSession(flow);

  expect(completedFlow).toEqual({
    kind: "sessionComplete",
    firstTryCorrectAnswerCount: correctCount,
    hasEarnedReward,
  });
});
