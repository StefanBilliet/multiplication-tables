import { renderHook } from '@testing-library/react';
import { createTestProviders } from '../../../shared/testing/createTestProviders';
import useQuestionSource from '../../components/useQuestionSource';

test('GIVEN a selected table and structured order, WHEN the question source is read, THEN it returns the regular question sequence for that table', () => {
  const { TestProviders } = createTestProviders();

  const { result } = renderHook(() => useQuestionSource(3), {
    wrapper: TestProviders,
  });

  expect(result.current).toEqual([
    { table: 3, multiplier: 1 },
    { table: 3, multiplier: 2 },
    { table: 3, multiplier: 3 },
    { table: 3, multiplier: 4 },
    { table: 3, multiplier: 5 },
    { table: 3, multiplier: 6 },
    { table: 3, multiplier: 7 },
    { table: 3, multiplier: 8 },
    { table: 3, multiplier: 9 },
    { table: 3, multiplier: 10 },
  ]);
});
