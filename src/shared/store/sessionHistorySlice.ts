import type { StateCreator } from 'zustand';

export type SessionCompletedEvent = {
  table: number;
  firstTryCorrectAnswerCount: number;
  hasEarnedReward: boolean;
  multiplicationErrors: { table: number; multiplier: number }[];
};

export type RecentWeakness = {
  table: number;
  multiplier: number;
  mistakeCount: number;
};

export type SessionHistorySlice = {
  sessionCompletedEvents: SessionCompletedEvent[];
  recentWeaknesses: RecentWeakness[];
  recordSessionCompleted: (event: SessionCompletedEvent) => void;
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

const extractMultiplicationErrors = (
  events: SessionCompletedEvent[],
): SessionCompletedEvent['multiplicationErrors'][number][] => {
  return events.flatMap((event) => event.multiplicationErrors);
};

export const createSessionHistorySlice: StateCreator<SessionHistorySlice> = (set) => ({
  sessionCompletedEvents: [],
  recentWeaknesses: [],
  recordSessionCompleted: (event) => {
    set((state) => {
      const sessionCompletedEvents = [...state.sessionCompletedEvents, event].slice(-50);

      return {
        recentWeaknesses: projectRecentWeaknesses(sessionCompletedEvents),
        sessionCompletedEvents,
      };
    });
  },
});
