import { useInterval } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

export const DEFAULT_TIMER_GRACE_PERIOD_MS = 1000;
export const DEFAULT_TIMER_UPDATE_INTERVAL_MS = 1000;

const useTimerElapsed = (
  enabled: boolean,
  onElapsed?: () => void,
  timeoutSeconds = 5,
  resetSignal?: string,
) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const previousResetSignalRef = useRef(resetSignal);
  const { start, stop } = useInterval(() => {
    setElapsedSeconds((currentElapsedSeconds) => {
      const nextElapsedSeconds = currentElapsedSeconds + 1;

      return nextElapsedSeconds;
    });
  }, DEFAULT_TIMER_UPDATE_INTERVAL_MS);

  useEffect(() => {
    if (elapsedSeconds < timeoutSeconds) {
      return;
    }

    const timeoutId = setTimeout(() => {
      onElapsed?.();
    }, DEFAULT_TIMER_GRACE_PERIOD_MS);

    stop();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [elapsedSeconds, onElapsed, stop, timeoutSeconds]);

  useEffect(() => {
    if (resetSignal === undefined) {
      return;
    }

    const shouldRestart = previousResetSignalRef.current !== resetSignal;

    previousResetSignalRef.current = resetSignal;
    setElapsedSeconds(0);

    if (!shouldRestart || !enabled) {
      return;
    }

    stop();
    start();
  }, [enabled, resetSignal, start, stop]);

  useEffect(() => {
    setElapsedSeconds(0);

    if (!enabled) {
      stop();
      return;
    }

    start();

    return stop;
  }, [enabled, start, stop]);

  return elapsedSeconds;
};

export default useTimerElapsed;
