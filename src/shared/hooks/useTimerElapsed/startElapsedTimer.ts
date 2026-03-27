import type { RefObject } from "react";
import clearTimerRefs from "./clearTimerRefs";
import scheduleElapsedCallback from "./scheduleElapsedCallback";
import {
  DEFAULT_TIMER_UPDATE_INTERVAL_MS,
  type TimeoutId,
  type TimerId,
} from "./useTimerElapsed.constants";

const startElapsedTimer = (
  intervalIdRef: RefObject<TimerId | null>,
  timeoutIdRef: RefObject<TimeoutId | null>,
  onElapsedRef: RefObject<(() => void) | undefined>,
  setElapsedSeconds: (
    updater: (currentElapsedSeconds: number) => number,
  ) => void,
  timeoutSeconds: number,
) => {
  let currentElapsedSeconds = 0;

  intervalIdRef.current = setInterval(() => {
    currentElapsedSeconds += 1;

    if (currentElapsedSeconds >= timeoutSeconds) {
      clearTimerRefs(intervalIdRef, timeoutIdRef);
      setElapsedSeconds(() => timeoutSeconds);
      scheduleElapsedCallback(timeoutIdRef, onElapsedRef);
      return;
    }

    setElapsedSeconds(() => currentElapsedSeconds);
  }, DEFAULT_TIMER_UPDATE_INTERVAL_MS);
};

export default startElapsedTimer;
