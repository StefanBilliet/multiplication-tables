import { useState } from 'react';
import useLifetimeRewardTotal from '../../app/hooks/useLifetimeRewardTotal';
import { useMultiplicationTables } from '../../table-selection/components/useMultiplicationTables';
import { createTestQuestionSequenceFactory } from '../models/testQuestionSequenceFactory';
import type { Question } from '../models/types';

const useTestQuestionSource = (): Question[] => {
  const { lifetimeRewardTotal } = useLifetimeRewardTotal();
  const unlockedTables = useMultiplicationTables(lifetimeRewardTotal)
    .filter((table) => table.unlockState.unlocked)
    .map((table) => table.id);

  const [questionSequence] = useState(() => createTestQuestionSequenceFactory(unlockedTables).random());

  return questionSequence;
};

export default useTestQuestionSource;
