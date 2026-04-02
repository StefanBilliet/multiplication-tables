import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { createTestProviders } from '../../../shared/testing/createTestProviders';
import usePracticeSession from '../../components/usePracticeSession';
import PracticeFlow from '../../models/practiceFlow';
import { createQuestionSequenceFactory } from '../../models/questionSequenceFactory';
import type { Question } from '../../models/types';

const addReward = vi.fn();

vi.mock('../../../app/hooks/useLifetimeRewardTotal', () => ({
  default: () => ({
    addReward,
    lifetimeRewardTotal: 0,
  }),
}));

beforeEach(() => {
  addReward.mockClear();
});

test('GIVEN a perfect practice session, WHEN the tenth correct answer is continued, THEN the hook adds exactly one reward', () => {
  const { TestProviders } = createTestProviders();
  const { result } = renderHook(() => usePracticeSession(3), {
    wrapper: TestProviders,
  });

  act(() => {
    for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
      result.current.selectAnswer(multiplier * 3);
      result.current.checkAnswer();
      result.current.continueSession();
    }
  });

  expect(addReward).toHaveBeenCalledTimes(1);
});

test('GIVEN a wrong answer during a practice session, WHEN the session completes, THEN the app store records the completed session', () => {
  const { TestProviders, store } = createTestProviders();
  const { result } = renderHook(() => usePracticeSession(3), {
    wrapper: TestProviders,
  });

  act(() => {
    result.current.selectAnswer(4);
    result.current.checkAnswer();
    result.current.continueSession();

    for (let multiplier = 2; multiplier <= 10; multiplier += 1) {
      result.current.selectAnswer(multiplier * 3);
      result.current.checkAnswer();
      result.current.continueSession();
    }
  });

  expect(store.getState().sessionCompletedEvents).toEqual([
    {
      id: expect.any(String),
      table: 3,
      firstTryCorrectAnswerCount: 9,
      hasEarnedReward: true,
      timestamp: expect.any(Object),
      multiplicationErrors: [{ table: 3, multiplier: 1 }],
    },
  ]);
});

test('GIVEN a practice session starts, WHEN the hook initializes the model, THEN it passes the generated question sequence into the session model', () => {
  const questionSequence = createQuestionSequenceFactory(3).regular();
  const session = PracticeFlow.start(questionSequence);
  const startSpy = vi.spyOn(PracticeFlow, 'start').mockReturnValue(session);
  const { TestProviders } = createTestProviders();

  renderHook(() => usePracticeSession(3), {
    wrapper: TestProviders,
  });

  expect(startSpy).toHaveBeenCalledWith(questionSequence);
});

test('GIVEN a custom question source, WHEN the hook initializes the model, THEN it uses the provided question source', () => {
  const questionSequence: Question[] = [{ table: 3, multiplier: 7 }];
  const questionSource = vi.fn(() => questionSequence);
  const session = PracticeFlow.start(questionSequence);
  const startSpy = vi.spyOn(PracticeFlow, 'start').mockReturnValue(session);
  const { TestProviders } = createTestProviders();

  renderHook(() => usePracticeSession(3, questionSource), {
    wrapper: TestProviders,
  });

  expect(questionSource).toHaveBeenCalledWith(3);
  expect(startSpy).toHaveBeenCalledWith(questionSequence);
});

test('GIVEN a practice session is in progress, WHEN the session is reset, THEN it returns to question 1', () => {
  const { TestProviders } = createTestProviders();
  const { result } = renderHook(() => usePracticeSession(3), {
    wrapper: TestProviders,
  });

  act(() => {
    result.current.selectAnswer(3);
    result.current.checkAnswer();
    result.current.continueSession();
    result.current.resetSession();
  });

  expect(result.current.session.kind).toBe('currentQuestion');

  if (result.current.session.kind === 'currentQuestion') {
    expect(result.current.session.currentQuestion.multiplier).toBe(1);
  }
});

test('GIVEN a practice session is reset, WHEN the reset action is used, THEN it delegates to PracticeFlow.reset', () => {
  const resetSpy = vi.spyOn(PracticeFlow, 'reset');
  const { TestProviders } = createTestProviders();
  const { result } = renderHook(() => usePracticeSession(3), {
    wrapper: TestProviders,
  });

  act(() => {
    result.current.resetSession();
  });

  expect(resetSpy).toHaveBeenCalled();
});
