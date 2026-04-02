import { Temporal } from '@js-temporal/polyfill';
import { describe, expect, test } from 'vitest';
import { createAppStore } from '../../../app/store/appStoreFactory';

describe('sessionHistorySlice', () => {
  describe('recordTestSessionCompleted', () => {
    test.each([
      [14, true],
      [13, false],
      [20, true],
    ])('GIVEN a test session with %i correct answers WHEN recorded THEN hasEarnedReward is %s', (correctAnswers, expectedHasEarnedReward) => {
      const sut = createAppStore({ persist: false });

      const testEvent = {
        id: 'test-123',
        type: 'test' as const,
        firstTryCorrectAnswerCount: correctAnswers,
        hasEarnedReward: expectedHasEarnedReward,
        timestamp: Temporal.Now.instant(),
        multiplicationErrors: [],
      };

      sut.getState().recordTestSessionCompleted(testEvent);

      expect(sut.getState().testSessionCompletedEvents).toHaveLength(1);
      expect(sut.getState().testSessionCompletedEvents[0].hasEarnedReward).toBe(expectedHasEarnedReward);
    });
  });
});
