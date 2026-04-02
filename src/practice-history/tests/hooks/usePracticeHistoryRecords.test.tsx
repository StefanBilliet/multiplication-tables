import { Temporal } from '@js-temporal/polyfill';
import { renderHook } from '@testing-library/react';
import { getAppStore, resetAppStore } from '../../../app/store/appStore';
import { sessionCompletedEventFactory } from '../../../shared/testing/factories/sessionCompletedEventFactory';
import { testSessionCompletedEventFactory } from '../../../shared/testing/factories/testSessionCompletedEventFactory';
import usePracticeHistoryRecords from '../../hooks/usePracticeHistoryRecords';

beforeEach(() => {
  resetAppStore();
});

test('GIVEN practice and test sessions exist WHEN the hook runs THEN it returns newest items first', () => {
  getAppStore().setState({
    sessionCompletedEvents: [
      sessionCompletedEventFactory.build({
        table: 3,
        timestamp: Temporal.Instant.from('2026-03-25T16:45:00Z'),
      }),
    ],
    testSessionCompletedEvents: [
      testSessionCompletedEventFactory.build({
        timestamp: Temporal.Instant.from('2026-03-26T14:30:00Z'),
      }),
    ],
  });

  const { result } = renderHook(() => usePracticeHistoryRecords());

  expect(result.current).toHaveLength(2);
  expect(result.current[0].kind).toBe('test');
  expect(result.current[1].kind).toBe('practice');
});
