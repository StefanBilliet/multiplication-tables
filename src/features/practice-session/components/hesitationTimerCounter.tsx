import { RingProgress, Text } from '@mantine/core';
import type { FC } from 'react';
import useTimerElapsed from '../../../shared/hooks/useTimerElapsed';
import { semanticColorVars } from '../../../theme/semanticColors';

type HesitationTimerCounterProps = {
  enabled: boolean;
  onElapsed: () => void;
  resetSignal?: string;
  timeoutSeconds?: number;
};

const HesitationTimerCounter: FC<HesitationTimerCounterProps> = ({
  enabled,
  onElapsed,
  resetSignal,
  timeoutSeconds = 5,
}) => {
  const elapsedSeconds = useTimerElapsed(enabled, onElapsed, timeoutSeconds, resetSignal);
  const progress = Math.min(elapsedSeconds / timeoutSeconds, 1) * 100;

  return (
    <RingProgress
      aria-label="Hesitation timer"
      size={100}
      sections={[{ value: progress, color: semanticColorVars.primary }]}
      transitionDuration={1000}
      label={
        <Text size="xl" ta="center">
          {elapsedSeconds}s
        </Text>
      }
    />
  );
};

export default HesitationTimerCounter;
