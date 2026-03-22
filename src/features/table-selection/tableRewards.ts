const REWARD_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 2,
  3: 4,
  4: 7,
  5: 11,
  6: 16,
  7: 22,
  8: 29,
  9: 37,
  10: 46,
};

export const getRewardsNeededForTable = (
  currentRewards: number,
  tableId: number,
): number => {
  const threshold = REWARD_THRESHOLDS[tableId] ?? 0;

  return Math.max(0, threshold - currentRewards);
};
