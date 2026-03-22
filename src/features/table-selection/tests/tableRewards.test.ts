import { describe, expect, test } from "vitest";
import { getRewardsNeededForTable } from "../tableRewards";

describe("tableRewards", () => {
  test.each([
    { tableId: 1, expected: 0 },
    { tableId: 2, expected: 2 },
    { tableId: 3, expected: 4 },
    { tableId: 4, expected: 7 },
    { tableId: 5, expected: 11 },
    { tableId: 6, expected: 16 },
    { tableId: 7, expected: 22 },
    { tableId: 8, expected: 29 },
    { tableId: 9, expected: 37 },
    { tableId: 10, expected: 46 },
  ])("GIVEN zero current rewards and table $tableId WHEN rewards needed is calculated THEN it returns $expected", ({
    tableId,
    expected,
  }) => {
    const rewardsNeeded = getRewardsNeededForTable(0, tableId);

    expect(rewardsNeeded).toBe(expected);
  });

  test.each([
    { currentRewards: 2, tableId: 4, expected: 5 },
    { currentRewards: 2, tableId: 6, expected: 14 },
    { currentRewards: 2, tableId: 10, expected: 44 },
    { currentRewards: 0, tableId: 2, expected: 2 },
    { currentRewards: 4, tableId: 4, expected: 3 },
    { currentRewards: 7, tableId: 4, expected: 0 },
    { currentRewards: 46, tableId: 10, expected: 0 },
    { currentRewards: 100, tableId: 10, expected: 0 },
  ])("GIVEN $currentRewards current rewards and table $tableId WHEN rewards needed is calculated THEN it returns $expected", ({
    currentRewards,
    tableId,
    expected,
  }) => {
    const rewardsNeeded = getRewardsNeededForTable(currentRewards, tableId);

    expect(rewardsNeeded).toBe(expected);
  });
});
