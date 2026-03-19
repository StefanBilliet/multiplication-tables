import { getRewardThreshold } from "./getRewardThreshold";

export const calculateRewardsNeeded = (
  currentRewards: number,
  tableId: number,
): number => {
  const threshold = getRewardThreshold(tableId);
  return Math.max(0, threshold - currentRewards);
};
