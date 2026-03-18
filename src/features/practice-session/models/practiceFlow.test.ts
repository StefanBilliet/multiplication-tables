import PracticeFlow, { type CurrentQuestionState } from "./practiceFlow";

function completeSession(
  startFlow: CurrentQuestionState,
  wrongMultipliers: number[] = [],
): PracticeFlow {
  let flow: CurrentQuestionState = startFlow;

  for (let i = 1; i <= 10; i += 1) {
    const answer = wrongMultipliers.includes(i)
      ? 999
      : i * startFlow.currentQuestion.table;
    flow = PracticeFlow.checkAnswer(
      PracticeFlow.selectAnswer(flow, answer) as CurrentQuestionState,
    ) as CurrentQuestionState;
    if (i < 10) {
      flow = PracticeFlow.nextQuestion(flow) as CurrentQuestionState;
    }
  }

  return PracticeFlow.continueSession(flow);
}

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

test("GIVEN a current question state with correct feedback, WHEN hasCorrectFeedback is called, THEN it returns true", () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(3) as CurrentQuestionState,
      3,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = PracticeFlow.hasCorrectFeedback(sut);

  expect(result).toBe(true);
});

test("GIVEN a current question state with incorrect feedback, WHEN hasCorrectFeedback is called, THEN it returns false", () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(3) as CurrentQuestionState,
      6,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = PracticeFlow.hasCorrectFeedback(sut);

  expect(result).toBe(false);
});

test("GIVEN a current question state without checked answer, WHEN hasCorrectFeedback is called, THEN it returns false", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const result = PracticeFlow.hasCorrectFeedback(sut);

  expect(result).toBe(false);
});

test("GIVEN a session with a selected answer, WHEN selectedAnswer is called, THEN it returns that answer", () => {
  const sut = PracticeFlow.selectAnswer(
    PracticeFlow.start(3) as CurrentQuestionState,
    12,
  ) as CurrentQuestionState;

  const result = PracticeFlow.selectedAnswer(sut);

  expect(result).toBe(12);
});

test("GIVEN a session without a selected answer, WHEN selectedAnswer is called, THEN it returns null", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const result = PracticeFlow.selectedAnswer(sut);

  expect(result).toBeNull();
});

test("GIVEN a session with an answer selected, WHEN canCheck is called, THEN it returns true", () => {
  const sut = PracticeFlow.selectAnswer(
    PracticeFlow.start(3) as CurrentQuestionState,
    12,
  ) as CurrentQuestionState;

  const result = PracticeFlow.canCheck(sut);

  expect(result).toBe(true);
});

test("GIVEN a session without an answer selected, WHEN canCheck is called, THEN it returns false", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const result = PracticeFlow.canCheck(sut);

  expect(result).toBe(false);
});

test("GIVEN a session with correct feedback, WHEN feedbackAnimation is called, THEN it returns 'pop'", () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(3) as CurrentQuestionState,
      3,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = PracticeFlow.feedbackAnimation(sut);

  expect(result).toBe("pop");
});

test("GIVEN a session with incorrect feedback, WHEN feedbackAnimation is called, THEN it returns 'wobble'", () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(3) as CurrentQuestionState,
      6,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = PracticeFlow.feedbackAnimation(sut);

  expect(result).toBe("wobble");
});

test("GIVEN a session without feedback, WHEN feedbackAnimation is called, THEN it returns null", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const result = PracticeFlow.feedbackAnimation(sut);

  expect(result).toBeNull();
});

test("GIVEN a session in progress, WHEN isComplete is called, THEN it returns false", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const result = PracticeFlow.isComplete(sut);

  expect(result).toBe(false);
});

test("GIVEN a completed session, WHEN isComplete is called, THEN it returns true", () => {
  const sut = completeSession(PracticeFlow.start(3) as CurrentQuestionState);

  const result = PracticeFlow.isComplete(sut);

  expect(result).toBe(true);
});

test("GIVEN a session in progress, WHEN hasEarnedReward is called, THEN it returns false", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const result = PracticeFlow.hasEarnedReward(sut);

  expect(result).toBe(false);
});

test("GIVEN a completed session with 7+ correct answers, WHEN hasEarnedReward is called, THEN it returns true", () => {
  const sut = completeSession(PracticeFlow.start(3) as CurrentQuestionState);

  const result = PracticeFlow.hasEarnedReward(sut);

  expect(result).toBe(true);
});

test("GIVEN a completed session with 6 correct answers, WHEN hasEarnedReward is called, THEN it returns false", () => {
  const sut = completeSession(
    PracticeFlow.start(3) as CurrentQuestionState,
    [1, 2, 3, 4],
  );

  const result = PracticeFlow.hasEarnedReward(sut);

  expect(result).toBe(false);
});

test("GIVEN a session with correct feedback, WHEN feedbackState is called, THEN it returns 'correct'", () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(3) as CurrentQuestionState,
      3,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = PracticeFlow.feedbackState(sut);

  expect(result).toBe("correct");
});

test("GIVEN a session with incorrect feedback, WHEN feedbackState is called, THEN it returns 'incorrect'", () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(3) as CurrentQuestionState,
      6,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = PracticeFlow.feedbackState(sut);

  expect(result).toBe("incorrect");
});

test("GIVEN a session without feedback, WHEN feedbackState is called, THEN it returns null", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const result = PracticeFlow.feedbackState(sut);

  expect(result).toBeNull();
});

test("GIVEN a current question state, WHEN getAnswerOptions is called, THEN it returns the answer options from the current question", () => {
  const sut = PracticeFlow.start(3) as CurrentQuestionState;

  const result = PracticeFlow.getAnswerOptions(sut);

  expect(result).toEqual([6, 9, 15, 21, 30, 24, 18, 3, 12, 27]);
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
])("GIVEN $correctCount questions are answered correctly on first try, WHEN the session completes, THEN hasEarnedReward is $hasEarnedReward", ({
  correctCount,
  hasEarnedReward,
  wrongMultipliers,
}) => {
  const completedFlow = completeSession(
    PracticeFlow.start(3) as CurrentQuestionState,
    wrongMultipliers,
  );

  expect(completedFlow).toEqual({
    kind: "sessionComplete",
    firstTryCorrectAnswerCount: correctCount,
    hasEarnedReward,
  });
});
