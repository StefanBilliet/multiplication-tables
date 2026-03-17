import PracticeSession from "./practiceSession";

test("GIVEN a session is started, WHEN answer options are requested, THEN they contain the table answers in a shuffled order", () => {
  const sut = PracticeSession.start(3);

  const answerOptions = PracticeSession.answerOptions(sut);

  expect(answerOptions).toEqual([6, 9, 15, 21, 30, 24, 18, 3, 12, 27]);
});
