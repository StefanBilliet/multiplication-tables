import { Temporal } from '@js-temporal/polyfill';
import { sessionCompletedEventFactory } from '../testing/factories/sessionCompletedEventFactory';
import { createAppStore } from './appStore';

test('GIVEN the app store is created, WHEN inspecting its state, THEN legacy multiplication error state is no longer present', () => {
  const store = createAppStore({ persist: false });

  const state = store.getState();

  expect('multiplicationErrors' in state).toBe(false);
  expect('addMultiplicationError' in state).toBe(false);
});

test('GIVEN a completed practice session with repeated mistakes, WHEN it is recorded in the app store, THEN the store appends the completion and projects recent weaknesses', () => {
  const store = createAppStore({ persist: false });
  const sessionNumbers = Array.from({ length: 51 }, (_, index) => index + 1);

  for (const sessionNumber of sessionNumbers) {
    store.getState().recordSessionCompleted({
      id: `session-${sessionNumber}`,
      table: 3,
      firstTryCorrectAnswerCount: sessionNumber,
      hasEarnedReward: sessionNumber === 2,
      timestamp: Temporal.Instant.from('2026-03-27T12:00:00Z'),
      multiplicationErrors:
        sessionNumber === 2
          ? [
              { table: 3, multiplier: 1 },
              { table: 3, multiplier: 1 },
              { table: 3, multiplier: 2 },
            ]
          : [],
    });
  }

  const state = store.getState();

  expect(state.sessionCompletedEvents).toHaveLength(50);
  expect(state.sessionCompletedEvents[0]).toMatchObject({
    firstTryCorrectAnswerCount: 2,
  });
  expect(state.sessionCompletedEvents[49]).toMatchObject({
    firstTryCorrectAnswerCount: 51,
  });
  expect(state.recentWeaknesses).toEqual([
    { table: 3, multiplier: 1, mistakeCount: 2 },
    { table: 3, multiplier: 2, mistakeCount: 1 },
  ]);
});
test('GIVEN persisted session history contains a timestamp string, WHEN the store is rehydrated, THEN the timestamp is exposed as a Temporal.Instant', () => {
  localStorage.setItem(
    'multiplication-app',
    JSON.stringify({
      state: {
        lifetimeRewardTotal: 0,
        recentWeaknesses: [],
        sessionCompletedEvents: [sessionCompletedEventFactory.build()],
        isHesitationRuleEnabled: false,
        questionOrderMode: 'default',
      },
      version: 0,
    }),
  );
  const store = createAppStore();

  const timestamp = store.getState().sessionCompletedEvents[0].timestamp as unknown;
  expect(timestamp).toBeInstanceOf(Temporal.Instant);
});
