import { act, screen } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import renderComponent from "../../../../shared/testing/renderComponent";
import HesitationTimerCounter from "../hesitationTimerCounter";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("GIVEN the hesitation timer counter is enabled, WHEN five seconds pass, THEN it calls the timeout callback", () => {
  const onElapsed = vi.fn();

  renderComponent(
    <HesitationTimerCounter enabled onElapsed={onElapsed} timeoutSeconds={5} />,
  );

  act(() => {
    vi.advanceTimersByTime(5000);
  });

  expect(onElapsed).toHaveBeenCalledTimes(1);
  expect(screen.getByText("5s")).toBeVisible();
});
