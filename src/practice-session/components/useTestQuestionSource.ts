import useLifetimeRewardTotal from '../../app/hooks/useLifetimeRewardTotal';
import { useMultiplicationTables } from '../../table-selection/components/useMultiplicationTables';
import { createTestQuestionSequenceFactory } from '../models/testQuestionSequenceFactory';
import type { Question } from '../models/types';

type TestQuestionSource = () => Question[];

const useTestQuestionSource = (): TestQuestionSource => {
  const { lifetimeRewardTotal } = useLifetimeRewardTotal();
  const unlockedTables = useMultiplicationTables(lifetimeRewardTotal)
    .filter((table) => table.unlockState.unlocked)
    .map((table) => table.id);

  return () => createTestQuestionSequenceFactory(unlockedTables).random();
};

export default useTestQuestionSource;
