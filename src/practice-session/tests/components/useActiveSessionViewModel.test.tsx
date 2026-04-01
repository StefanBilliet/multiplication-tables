import { renderHook } from '@testing-library/react';
import useActiveSessionViewModel from '../../components/useActiveSessionViewModel';
import type { PracticeFlow } from '../../models/practiceFlow';

test('GIVEN a current question session, WHEN the hook is created, THEN it returns the active session view model', () => {
  const session: PracticeFlow = {
    kind: 'currentQuestion',
    currentQuestionIndex: 2,
    currentQuestion: {
      answerOptions: [12, 18, 15],
      canCheckAnswer: true,
      canContinue: false,
      feedbackState: 'incorrect',
      hasRetriedCurrentQuestion: true,
      multiplier: 3,
      selectedAnswer: 15,
      table: 6,
    },
    firstTryCorrectAnswerCount: 2,
    multiplicationErrors: [],
    questionSequence: [
      { table: 6, multiplier: 1 },
      { table: 6, multiplier: 2 },
      { table: 6, multiplier: 3 },
      { table: 6, multiplier: 4 },
      { table: 6, multiplier: 5 },
      { table: 6, multiplier: 6 },
      { table: 6, multiplier: 7 },
      { table: 6, multiplier: 8 },
      { table: 6, multiplier: 9 },
      { table: 6, multiplier: 10 },
    ],
  };

  const { result } = renderHook(() => useActiveSessionViewModel(session));

  expect(result.current).toEqual({
    answerOptions: [12, 18, 15],
    canCheck: true,
    feedbackAnimation: 'wobble',
    feedbackState: 'incorrect',
    hasCorrectFeedback: false,
    multiplier: 3,
    selectedAnswer: 15,
  });
});

test('GIVEN a completed session, WHEN the hook is created, THEN it returns fallback values for the active session view model', () => {
  const session: PracticeFlow = {
    kind: 'sessionComplete',
    firstTryCorrectAnswerCount: 8,
    hasEarnedReward: true,
    multiplicationErrors: [],
  };

  const { result } = renderHook(() => useActiveSessionViewModel(session));

  expect(result.current).toEqual({
    answerOptions: [],
    canCheck: false,
    feedbackAnimation: null,
    feedbackState: null,
    hasCorrectFeedback: false,
    multiplier: 1,
    selectedAnswer: null,
  });
});
