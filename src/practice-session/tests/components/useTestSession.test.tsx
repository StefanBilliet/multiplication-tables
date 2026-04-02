import { act, renderHook } from '@testing-library/react';
import { createTestProviders } from '../../../shared/testing/createTestProviders';
import useTestSession from '../../components/useTestSession';
import type { Question } from '../../models/types';

test('GIVEN a test question source, WHEN the hook completes the sequence, THEN it runs through the full session', () => {
  const questionSequence: Question[] = Array.from({ length: 10 }, (_, index) => ({
    table: 3,
    multiplier: index + 1,
  }));
  const { result } = renderHook(() => useTestSession(questionSequence));

  act(() => {
    for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
      result.current.selectAnswer(multiplier * 3);
      result.current.checkAnswer();
      result.current.continueSession();
    }
  });

  expect(result.current.session.kind).toBe('sessionComplete');
});

test('GIVEN a completed test session, WHEN the session ends, THEN a test event is stored in history', () => {
  const { TestProviders, store } = createTestProviders();
  const questionSequence: Question[] = Array.from({ length: 10 }, (_, index) => ({
    table: 3,
    multiplier: index + 1,
  }));
  const { result } = renderHook(() => useTestSession(questionSequence), { wrapper: TestProviders });

  act(() => {
    for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
      result.current.selectAnswer(multiplier * 3);
      result.current.checkAnswer();
      result.current.continueSession();
    }
  });

  expect(store.getState().testSessionCompletedEvents[0]).toMatchObject({
    type: 'test',
  });
});
