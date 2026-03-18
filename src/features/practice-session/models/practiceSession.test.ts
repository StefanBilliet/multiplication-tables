import PracticeSession from "./practiceSession";

test("GIVEN a session is started, WHEN answer options are requested, THEN they contain the table answers in a shuffled order", () => {
  const sut = PracticeSession.start(3);

  const answerOptions = PracticeSession.answerOptions(sut);

  expect(answerOptions).toEqual([6, 9, 15, 21, 30, 24, 18, 3, 12, 27]);
});

test("GIVEN fewer than 7 answers were correct on the first try, WHEN reward eligibility is checked, THEN no reward is earned", () => {
  const sut = {
    ...PracticeSession.start(3),
    firstTryCorrectAnswerCount: 6,
  };

  const hasEarnedReward = PracticeSession.hasEarnedReward(sut);

  expect(hasEarnedReward).toBe(false);
});

test("GIVEN at least 7 answers were correct on the first try, WHEN reward eligibility is checked, THEN a reward is earned", () => {
  const sut = {
    ...PracticeSession.start(3),
    firstTryCorrectAnswerCount: 7,
  };

  const hasEarnedReward = PracticeSession.hasEarnedReward(sut);

  expect(hasEarnedReward).toBe(true);
});

test("GIVEN one question needed a retry, WHEN the session is completed, THEN the first-try correct answer count is 9", () => {
  let sut = PracticeSession.start(3);

  sut = PracticeSession.selectAnswer(sut, 6);
  sut = PracticeSession.checkAnswer(sut);
  sut = PracticeSession.selectAnswer(sut, 3);
  sut = PracticeSession.checkAnswer(sut);
  sut = PracticeSession.continueSession(sut);

  for (let multiplier = 2; multiplier <= 10; multiplier += 1) {
    sut = PracticeSession.selectAnswer(sut, multiplier * 3);
    sut = PracticeSession.checkAnswer(sut);

    if (multiplier < 10) {
      sut = PracticeSession.continueSession(sut);
    }
  }

  expect(sut.firstTryCorrectAnswerCount).toBe(9);
});

test("GIVEN all questions are answered correctly on the first try, WHEN the session is completed, THEN the first-try correct answer count is 10", () => {
  let sut = PracticeSession.start(3);

  for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
    sut = PracticeSession.selectAnswer(sut, multiplier * 3);
    sut = PracticeSession.checkAnswer(sut);

    if (multiplier < 10) {
      sut = PracticeSession.continueSession(sut);
    }
  }

  expect(sut.firstTryCorrectAnswerCount).toBe(10);
});
