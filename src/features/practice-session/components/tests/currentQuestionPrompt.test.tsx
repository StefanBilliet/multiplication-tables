import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { AppProviders } from "../../../../app/providers/appProviders";
import { DEFAULT_TIMER_GRACE_PERIOD_MS } from "../../../../shared/hooks/useTimerElapsed";
import renderComponent from "../../../../shared/testing/renderComponent";
import CurrentQuestionPrompt from "../currentQuestionPrompt";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("GIVEN the hesitation rule is enabled, WHEN the prompt is shown, THEN the timer is visible and the timeout callback fires after five seconds and the grace period", async () => {
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

  await act(async () => {
    await vi.advanceTimersByTimeAsync(5000);
  });

  expect(onElapsed).not.toHaveBeenCalled();

  await act(async () => {
    await vi.advanceTimersByTimeAsync(DEFAULT_TIMER_GRACE_PERIOD_MS);
  });

  expect(onElapsed).toHaveBeenCalledTimes(1);
});

test("GIVEN the hesitation rule is enabled and the question changes, WHEN five seconds pass for the new question, THEN the timeout callback fires only after that new question reaches five seconds and the grace period", async () => {
  const onElapsed = vi.fn();
  const { rerender } = render(
    <AppProviders>
      <CurrentQuestionPrompt
        multiplier={1}
        table={3}
        isHesitationRuleEnabled
        onHesitationElapsed={onElapsed}
      />
    </AppProviders>,
  );

  await act(async () => {
    await vi.advanceTimersByTimeAsync(4000);
  });

  rerender(
    <AppProviders>
      <CurrentQuestionPrompt
        multiplier={2}
        table={3}
        isHesitationRuleEnabled
        onHesitationElapsed={onElapsed}
      />
    </AppProviders>,
  );

  await act(async () => {
    await vi.advanceTimersByTimeAsync(4000);
  });

  expect(onElapsed).not.toHaveBeenCalled();

  await act(async () => {
    await vi.advanceTimersByTimeAsync(DEFAULT_TIMER_GRACE_PERIOD_MS);
  });

  expect(onElapsed).not.toHaveBeenCalled();

  await act(async () => {
    await vi.advanceTimersByTimeAsync(DEFAULT_TIMER_GRACE_PERIOD_MS);
  });

  expect(onElapsed).toHaveBeenCalledTimes(1);
});
