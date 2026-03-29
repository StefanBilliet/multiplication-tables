import { useEffect, useRef, useState } from 'react';
import clearTimerRefs from './clearTimerRefs';
import startElapsedTimer from './startElapsedTimer';
import type { TimeoutId, TimerId } from './useTimerElapsed.constants';

export {
  DEFAULT_TIMER_GRACE_PERIOD_MS,
  DEFAULT_TIMER_UPDATE_INTERVAL_MS,
} from './useTimerElapsed.constants';

const useTimerElapsed = (enabled: boolean, onElapsed?: () => void, timeoutSeconds = 5, resetSignal?: string) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const previousResetSignalRef = useRef(resetSignal);
  const onElapsedRef = useRef(onElapsed);
  const intervalIdRef = useRef<TimerId | null>(null);
  const timeoutIdRef = useRef<TimeoutId | null>(null);

  useEffect(() => {
    onElapsedRef.current = onElapsed;
  }, [onElapsed]);

  useEffect(() => {
    const hasResetSignalChanged = previousResetSignalRef.current !== resetSignal;

    previousResetSignalRef.current = resetSignal;

    setElapsedSeconds(0);
    clearTimerRefs(intervalIdRef, timeoutIdRef);

    if (!enabled) {
      return;
    }

    if (hasResetSignalChanged) {
      setElapsedSeconds(0);
    }

    startElapsedTimer(intervalIdRef, timeoutIdRef, onElapsedRef, setElapsedSeconds, timeoutSeconds);

    return () => {
      clearTimerRefs(intervalIdRef, timeoutIdRef);
    };
  }, [enabled, resetSignal, timeoutSeconds]);

  return elapsedSeconds;
};

export default useTimerElapsed;
