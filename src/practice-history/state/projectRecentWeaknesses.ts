import type { RecentWeakness, SessionCompletedEvent } from './sessionHistorySlice';

const extractMultiplicationErrors = (
  events: SessionCompletedEvent[],
): SessionCompletedEvent['multiplicationErrors'][number][] => {
  return events.flatMap((event) => event.multiplicationErrors);
};

const projectRecentWeaknesses = (events: SessionCompletedEvent[]): RecentWeakness[] => {
  const counts = new Map<string, RecentWeakness>();
  const multiplicationErrors = extractMultiplicationErrors(events);

  for (const error of multiplicationErrors) {
    const key = `${error.table}:${error.multiplier}`;
    const existing = counts.get(key);

    if (existing) {
      counts.set(key, {
        ...existing,
        mistakeCount: existing.mistakeCount + 1,
      });
      continue;
    }

    counts.set(key, {
      table: error.table,
      multiplier: error.multiplier,
      mistakeCount: 1,
    });
  }

  return [...counts.values()].sort((left, right) => {
    if (right.mistakeCount !== left.mistakeCount) {
      return right.mistakeCount - left.mistakeCount;
    }

    if (left.table !== right.table) {
      return left.table - right.table;
    }

    return left.multiplier - right.multiplier;
  });
};

export default projectRecentWeaknesses;
