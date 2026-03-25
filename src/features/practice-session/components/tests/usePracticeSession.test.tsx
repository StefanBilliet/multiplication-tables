import { act, renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { vi } from "vitest";
import { AppProviders } from "../../../../app/providers/appProviders";
import { createAppStore } from "../../../../shared/store/appStore";
import PracticeFlow from "../../models/practiceFlow";
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

const createPracticeSessionTestProviders = () => {
  const store = createAppStore({ persist: false });

  const TestProviders = ({ children }: PropsWithChildren) => (
    <AppProviders store={store}>{children}</AppProviders>
  );

  return { TestProviders, store };
};

test("GIVEN a perfect practice session, WHEN the tenth correct answer is continued, THEN the hook adds exactly one reward", () => {
  const { TestProviders } = createPracticeSessionTestProviders();
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

test("GIVEN a wrong answer during a practice session, WHEN the session completes, THEN the app store records the completed session", () => {
  const { TestProviders, store } = createPracticeSessionTestProviders();
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
      table: 3,
      firstTryCorrectAnswerCount: 9,
      hasEarnedReward: true,
      multiplicationErrors: [{ table: 3, multiplier: 1 }],
    },
  ]);
});

test("GIVEN question order is varied, WHEN the practice session starts, THEN it passes the order mode into the session model", () => {
  const session = PracticeFlow.start(3);
  const startSpy = vi.spyOn(PracticeFlow, "start").mockReturnValue(session);
  const { TestProviders, store } = createPracticeSessionTestProviders();
  store.setState({ questionOrderMode: "varied" });

  renderHook(() => usePracticeSession(3), {
    wrapper: TestProviders,
  });

  expect(startSpy).toHaveBeenCalledWith(3, "varied");
});
