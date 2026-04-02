import type { MultiplicationTable } from './useMultiplicationTables.tsx';

export const hasMultipleUnlockedTables = (tables: MultiplicationTable[]): boolean =>
  tables.filter((table) => table.unlockState.unlocked).length > 1;
