import { expect, test } from 'vitest';
import { hasMultipleUnlockedTables } from '../../components/hasMultipleUnlockedTables';

test('GIVEN one unlocked table, WHEN checking test mode availability, THEN it is unavailable', () => {
  expect(
    hasMultipleUnlockedTables([
      { id: 1, label: '1 times table', unlockState: { unlocked: true, rewardsNeeded: 0 } },
      { id: 2, label: '2 times table', unlockState: { unlocked: false, rewardsNeeded: 1 } },
    ]),
  ).toBe(false);
});

test('GIVEN two unlocked tables, WHEN checking test mode availability, THEN it is available', () => {
  expect(
    hasMultipleUnlockedTables([
      { id: 1, label: '1 times table', unlockState: { unlocked: true, rewardsNeeded: 0 } },
      { id: 2, label: '2 times table', unlockState: { unlocked: false, rewardsNeeded: 1 } },
      { id: 3, label: '3 times table', unlockState: { unlocked: true, rewardsNeeded: 0 } },
    ]),
  ).toBe(true);
});
