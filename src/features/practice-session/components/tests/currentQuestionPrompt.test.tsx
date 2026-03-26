import { act, screen } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import renderComponent from "../../../../shared/testing/renderComponent";
import CurrentQuestionPrompt from "../currentQuestionPrompt";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("GIVEN the hesitation rule is enabled, WHEN the prompt is shown, THEN the timer is visible and the timeout callback fires after five seconds", () => {
  const onElapsed = vi.fn();

  renderComponent(
    <CurrentQuestionPrompt
      multiplier={1}
      table={3}
      isHesitationRuleEnabled
      onHesitationElapsed={onElapsed}
    />,
  );

  expect(screen.getByLabelText("Hesitation timer")).toBeVisible();
  expect(screen.getByText("0s")).toBeVisible();

  act(() => {
    vi.advanceTimersByTime(5000);
  });

  expect(onElapsed).toHaveBeenCalledTimes(1);
});
