import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";

const useTimerElapsed = (
  enabled: boolean,
  onElapsed?: () => void,
  timeoutSeconds = 5,
) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const { start, stop } = useInterval(() => {
    setElapsedSeconds((currentElapsedSeconds) => {
      const nextElapsedSeconds = currentElapsedSeconds + 1;

      if (nextElapsedSeconds >= timeoutSeconds) {
        stop();
        onElapsed?.();
      }

      return nextElapsedSeconds;
    });
  }, 1000);

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
