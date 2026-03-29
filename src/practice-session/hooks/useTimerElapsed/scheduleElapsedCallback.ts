import type { RefObject } from 'react';
import { DEFAULT_TIMER_GRACE_PERIOD_MS, type TimeoutId } from './useTimerElapsed.constants';

const scheduleElapsedCallback = (
  timeoutIdRef: RefObject<TimeoutId | null>,
  onElapsedRef: RefObject<(() => void) | undefined>,
) => {
  timeoutIdRef.current = setTimeout(() => {
    onElapsedRef.current?.();
  }, DEFAULT_TIMER_GRACE_PERIOD_MS);
};

export default scheduleElapsedCallback;
