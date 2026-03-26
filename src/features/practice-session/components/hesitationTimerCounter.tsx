import { Text } from "@mantine/core";
import type { FC } from "react";
import useTimerElapsed from "../../../shared/hooks/useTimerElapsed";

type HesitationTimerCounterProps = {
  enabled: boolean;
  onElapsed: () => void;
  timeoutSeconds?: number;
};

const HesitationTimerCounter: FC<HesitationTimerCounterProps> = ({
  enabled,
  onElapsed,
  timeoutSeconds = 5,
}) => {
  const elapsedSeconds = useTimerElapsed(enabled, onElapsed, timeoutSeconds);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(elapsedSeconds / timeoutSeconds, 1);
  const dashOffset = circumference * (1 - progress);

  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      aria-label="Hesitation timer"
    >
      <circle
        cx="36"
        cy="36"
        r={radius}
        fill="none"
        stroke="var(--mantine-color-gray-3)"
        strokeWidth="6"
      />
      <circle
        cx="36"
        cy="36"
        r={radius}
        fill="none"
        stroke="var(--mantine-color-teal-6)"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        strokeWidth="6"
        style={{ transition: "stroke-dashoffset 1s linear" }}
        transform="rotate(-90 36 36)"
      />
      <Text
        x="36"
        y="41"
        textAnchor="middle"
        size="lg"
        fw={700}
        component="text"
        fill="currentColor"
      >
        {elapsedSeconds}s
      </Text>
    </svg>
  );
};

export default HesitationTimerCounter;
