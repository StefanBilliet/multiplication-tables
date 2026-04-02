import type { StateCreator } from 'zustand';
import projectRecentWeaknesses from './projectRecentWeaknesses';
import type { SessionHistorySlice } from './sessionHistorySlice';

const createRecordSessionCompleted = (
  set: Parameters<StateCreator<SessionHistorySlice>>[0],
): Pick<SessionHistorySlice, 'recordSessionCompleted'> => ({
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

export default createRecordSessionCompleted;
