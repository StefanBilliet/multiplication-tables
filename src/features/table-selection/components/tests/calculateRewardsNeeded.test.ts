import { describe, expect, test } from "vitest";
import { calculateRewardsNeeded } from "../calculateRewardsNeeded";

describe("calculateRewardsNeeded", () => {
  test.each([
    { currentRewards: 2, tableId: 4, expected: 5 },
    { currentRewards: 2, tableId: 6, expected: 14 },
    { currentRewards: 2, tableId: 10, expected: 44 },
    { currentRewards: 0, tableId: 2, expected: 2 },
    { currentRewards: 4, tableId: 4, expected: 3 },
    { currentRewards: 7, tableId: 4, expected: 0 },
    { currentRewards: 46, tableId: 10, expected: 0 },
    { currentRewards: 100, tableId: 10, expected: 0 },
  ])("GIVEN $currentRewards current rewards and table $tableId, WHEN rewards needed is calculated, THEN it returns $expected", ({
    currentRewards,
    tableId,
    expected,
  }) => {
    const rewardsNeeded = calculateRewardsNeeded(currentRewards, tableId);
    expect(rewardsNeeded).toBe(expected);
  });
});
