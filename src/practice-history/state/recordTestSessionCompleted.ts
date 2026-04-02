import type { StateCreator } from 'zustand';
import type { SessionHistorySlice } from './sessionHistorySlice';

const createRecordTestSessionCompleted = (
  set: Parameters<StateCreator<SessionHistorySlice>>[0],
): Pick<SessionHistorySlice, 'recordTestSessionCompleted'> => ({
  recordTestSessionCompleted: (event) => {
    set((state) => ({
      testSessionCompletedEvents: [...state.testSessionCompletedEvents, event].slice(-50),
      recentWeaknesses: state.recentWeaknesses,
      sessionCompletedEvents: state.sessionCompletedEvents,
    }));
  },
});

export default createRecordTestSessionCompleted;
