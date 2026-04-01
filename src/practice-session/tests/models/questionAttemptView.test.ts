import PracticeFlow from '../../models/practiceFlow.ts';
import { questionAttemptView } from '../../models/questionAttemptView.ts';
import { createQuestionSequenceFactory } from '../../models/questionSequenceFactory.ts';
import type { CurrentQuestionState } from '../../models/types.ts';

const regularQuestionSequence = createQuestionSequenceFactory(3).regular();

test('GIVEN a current question state with correct feedback, WHEN hasCorrectFeedback is called, THEN it returns true', () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState,
      3,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = questionAttemptView.hasCorrectFeedback(sut);

  expect(result).toBe(true);
});

test('GIVEN a current question state with incorrect feedback, WHEN hasCorrectFeedback is called, THEN it returns false', () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState,
      6,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = questionAttemptView.hasCorrectFeedback(sut);

  expect(result).toBe(false);
});

test('GIVEN a current question state without checked answer, WHEN hasCorrectFeedback is called, THEN it returns false', () => {
  const sut = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;

  const result = questionAttemptView.hasCorrectFeedback(sut);

  expect(result).toBe(false);
});

test('GIVEN a session with a selected answer, WHEN selectedAnswer is called, THEN it returns that answer', () => {
  const sut = PracticeFlow.selectAnswer(
    PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState,
    12,
  ) as CurrentQuestionState;

  const result = questionAttemptView.selectedAnswer(sut);

  expect(result).toBe(12);
});

test('GIVEN a session without a selected answer, WHEN selectedAnswer is called, THEN it returns null', () => {
  const sut = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;

  const result = questionAttemptView.selectedAnswer(sut);

  expect(result).toBeNull();
});

test('GIVEN a session with an answer selected, WHEN canCheck is called, THEN it returns true', () => {
  const sut = PracticeFlow.selectAnswer(
    PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState,
    12,
  ) as CurrentQuestionState;

  const result = questionAttemptView.canCheck(sut);

  expect(result).toBe(true);
});

test('GIVEN a session without an answer selected, WHEN canCheck is called, THEN it returns false', () => {
  const sut = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;

  const result = questionAttemptView.canCheck(sut);

  expect(result).toBe(false);
});

test("GIVEN a session with correct feedback, WHEN feedbackAnimation is called, THEN it returns 'pop'", () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState,
      3,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = questionAttemptView.feedbackAnimation(sut);

  expect(result).toBe('pop');
});

test("GIVEN a session with incorrect feedback, WHEN feedbackAnimation is called, THEN it returns 'wobble'", () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState,
      6,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = questionAttemptView.feedbackAnimation(sut);

  expect(result).toBe('wobble');
});

test('GIVEN a session without feedback, WHEN feedbackAnimation is called, THEN it returns null', () => {
  const sut = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;

  const result = questionAttemptView.feedbackAnimation(sut);

  expect(result).toBeNull();
});

test("GIVEN a session with correct feedback, WHEN feedbackState is called, THEN it returns 'correct'", () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState,
      3,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = questionAttemptView.feedbackState(sut);

  expect(result).toBe('correct');
});

test("GIVEN a session with incorrect feedback, WHEN feedbackState is called, THEN it returns 'incorrect'", () => {
  const sut = PracticeFlow.checkAnswer(
    PracticeFlow.selectAnswer(
      PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState,
      6,
    ) as CurrentQuestionState,
  ) as CurrentQuestionState;

  const result = questionAttemptView.feedbackState(sut);

  expect(result).toBe('incorrect');
});

test('GIVEN a session without feedback, WHEN feedbackState is called, THEN it returns null', () => {
  const sut = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;

  const result = questionAttemptView.feedbackState(sut);

  expect(result).toBeNull();
});

test('GIVEN a current question state, WHEN getAnswerOptions is called, THEN it returns the answer options from the current question', () => {
  const sut = PracticeFlow.start(regularQuestionSequence) as CurrentQuestionState;

  const result = questionAttemptView.getAnswerOptions(sut);

  expect(result).toEqual([6, 9, 15, 21, 30, 24, 18, 3, 12, 27]);
});
