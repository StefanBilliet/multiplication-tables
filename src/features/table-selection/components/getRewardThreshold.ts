const REWARD_THRESHOLDS: Map<number, number> = new Map([
  [1, 0],
  [2, 2],
  [3, 4],
  [4, 7],
  [5, 11],
  [6, 16],
  [7, 22],
  [8, 29],
  [9, 37],
  [10, 46],
]);

export const getRewardThreshold = (tableId: number): number => {
  return REWARD_THRESHOLDS.get(tableId) ?? 0;
};
