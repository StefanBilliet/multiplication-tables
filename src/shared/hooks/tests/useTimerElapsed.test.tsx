import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import useTimerElapsed, {
  DEFAULT_TIMER_GRACE_PERIOD_MS,
  DEFAULT_TIMER_UPDATE_INTERVAL_MS,
} from "../useTimerElapsed";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("GIVEN the timer is enabled, WHEN one second passes, THEN the elapsed seconds increase", () => {
  const { result } = renderHook(() => useTimerElapsed(true));

  expect(result.current).toBe(0);

  act(() => {
    vi.advanceTimersByTime(DEFAULT_TIMER_UPDATE_INTERVAL_MS);
  });

  expect(result.current).toBe(1);
});

test("GIVEN the timer is disabled, WHEN time passes, THEN the elapsed seconds stay at zero", () => {
  const { result } = renderHook(() => useTimerElapsed(false));

  act(() => {
    vi.advanceTimersByTime(3000);
  });

  expect(result.current).toBe(0);
});

test("GIVEN a timeout callback is provided, WHEN five seconds and the grace period pass, THEN the callback is called once", () => {
  const onElapsed = vi.fn();

  renderHook(() => useTimerElapsed(true, onElapsed));

  act(() => {
    vi.advanceTimersByTime(5000);
  });

  expect(onElapsed).not.toHaveBeenCalled();

  act(() => {
    vi.advanceTimersByTime(DEFAULT_TIMER_GRACE_PERIOD_MS);
  });

  expect(onElapsed).toHaveBeenCalledTimes(1);
});

test("GIVEN a custom timeout is provided, WHEN that many seconds and the grace period pass, THEN the callback is called", () => {
  const onElapsed = vi.fn();

  renderHook(() => useTimerElapsed(true, onElapsed, 2));

  act(() => {
    vi.advanceTimersByTime(2000);
  });

  expect(onElapsed).not.toHaveBeenCalled();

  act(() => {
    vi.advanceTimersByTime(DEFAULT_TIMER_GRACE_PERIOD_MS);
  });

  expect(onElapsed).toHaveBeenCalledTimes(1);
});

test("GIVEN the timer already timed out once, WHEN a new question starts, THEN it starts counting again", () => {
  const onElapsed = vi.fn();
  const { result, rerender } = renderHook(
    ({ resetSignal }) => useTimerElapsed(true, onElapsed, 1, resetSignal),
    {
      initialProps: { resetSignal: "first-question" },
    },
  );

  act(() => {
    vi.advanceTimersByTime(DEFAULT_TIMER_UPDATE_INTERVAL_MS);
  });

  expect(result.current).toBe(1);

  act(() => {
    vi.advanceTimersByTime(DEFAULT_TIMER_GRACE_PERIOD_MS);
  });

  expect(onElapsed).toHaveBeenCalledTimes(1);

  rerender({ resetSignal: "first-question-reset" });

  expect(result.current).toBe(0);

  act(() => {
    vi.advanceTimersByTime(DEFAULT_TIMER_UPDATE_INTERVAL_MS);
  });

  expect(result.current).toBe(1);
});
