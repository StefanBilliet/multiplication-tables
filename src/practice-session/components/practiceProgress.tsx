import { Progress } from '@mantine/core';
import type { FC } from 'react';

type PracticeProgressProps = {
  currentQuestion: number;
  questionCount: number;
};

const PracticeProgress: FC<PracticeProgressProps> = ({ currentQuestion, questionCount }) => {
  const value =
    questionCount <= 1 ? 100 : Math.round(Math.min(((currentQuestion - 1) / (questionCount - 1)) * 100, 100));

  return <Progress aria-label="Practice progress" value={value} />;
};

export default PracticeProgress;
