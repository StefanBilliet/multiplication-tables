import { useAppStore } from '../../app/store/appStore';
import type { SessionCompletedEvent, TestSessionCompletedEvent } from '../state/sessionHistorySlice';

export type PracticeHistoryRecord =
  | (SessionCompletedEvent & { kind: 'practice' })
  | (TestSessionCompletedEvent & { kind: 'test' });

const usePracticeHistoryRecords = (): PracticeHistoryRecord[] => {
  const sessionCompletedEvents = useAppStore((state) => state.sessionCompletedEvents);
  const testSessionCompletedEvents = useAppStore((state) => state.testSessionCompletedEvents);

  return [
    ...sessionCompletedEvents.map((event) => ({ ...event, kind: 'practice' as const })),
    ...testSessionCompletedEvents.map((event) => ({ ...event, kind: 'test' as const })),
  ].toSorted((left, right) => right.timestamp.toString().localeCompare(left.timestamp.toString()));
};

export default usePracticeHistoryRecords;
