import { createAppStore } from "./appStore";

test("GIVEN the app store is created, WHEN inspecting its state, THEN legacy multiplication error state is no longer present", () => {
  const store = createAppStore({ persist: false });

  const state = store.getState();

  expect("multiplicationErrors" in state).toBe(false);
  expect("addMultiplicationError" in state).toBe(false);
});

test("GIVEN a completed practice session with repeated mistakes, WHEN it is recorded in the app store, THEN the store appends the completion and projects recent weaknesses", () => {
  const store = createAppStore({ persist: false });
  const sessionNumbers = Array.from({ length: 51 }, (_, index) => index + 1);

  for (const sessionNumber of sessionNumbers) {
    store.getState().recordSessionCompleted({
      table: 3,
      firstTryCorrectAnswerCount: sessionNumber,
      hasEarnedReward: sessionNumber === 2,
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
