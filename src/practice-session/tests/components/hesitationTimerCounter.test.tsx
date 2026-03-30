import { act, screen } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import { DEFAULT_TIMER_GRACE_PERIOD_MS } from '../../../practice-session/hooks/useTimerElapsed';
import renderComponent from '../../../shared/testing/renderComponent';
import HesitationTimerCounter from '../../components/hesitationTimerCounter';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test('GIVEN the hesitation timer counter is enabled, WHEN five seconds pass, THEN it shows 5s before the timeout callback fires', async () => {
  const onElapsed = vi.fn();

  renderComponent(<HesitationTimerCounter enabled onElapsed={onElapsed} timeoutSeconds={5} />);

  await act(async () => {
    await vi.advanceTimersByTimeAsync(5000);
  });

  expect(screen.getByText('5s')).toBeVisible();

  expect(onElapsed).not.toHaveBeenCalled();

  await act(async () => {
    await vi.advanceTimersByTimeAsync(DEFAULT_TIMER_GRACE_PERIOD_MS);
  });

  expect(onElapsed).toHaveBeenCalledTimes(1);
});
