import { describe, expect, test } from "vitest";
import { getRewardThreshold } from "../getRewardThreshold";

describe("getRewardThreshold", () => {
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
  ])("GIVEN table $tableId, WHEN threshold is requested, THEN it returns $expected", ({
    tableId,
    expected,
  }) => {
    const threshold = getRewardThreshold(tableId);
    expect(threshold).toBe(expected);
  });
});
