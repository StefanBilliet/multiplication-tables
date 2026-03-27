import type { RefObject } from "react";
import type { TimeoutId, TimerId } from "./useTimerElapsed.constants";

const clearTimerRefs = (
  intervalIdRef: RefObject<TimerId | null>,
  timeoutIdRef: RefObject<TimeoutId | null>,
) => {
  if (intervalIdRef.current !== null) {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  }

  if (timeoutIdRef.current !== null) {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = null;
  }
};

export default clearTimerRefs;
