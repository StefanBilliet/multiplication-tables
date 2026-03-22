import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import usePracticeSession from "../usePracticeSession";

const addReward = vi.fn();

vi.mock("../../../../shared/rewards/useLifetimeRewardTotal", () => ({
  default: () => ({
    addReward,
    lifetimeRewardTotal: 0,
  }),
}));

beforeEach(() => {
  addReward.mockClear();
});

test("GIVEN a perfect practice session, WHEN the tenth correct answer is continued, THEN the hook adds exactly one reward", () => {
  const { result } = renderHook(() => usePracticeSession(3));

  act(() => {
    for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
      result.current.selectAnswer(multiplier * 3);
      result.current.checkAnswer();
      result.current.continueSession();
    }
  });

  expect(addReward).toHaveBeenCalledTimes(1);
});
