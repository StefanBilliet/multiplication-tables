import { Temporal } from '@js-temporal/polyfill';
import type {
  SessionCompletedEvent,
  TestSessionCompletedEvent,
} from '../../practice-history/state/sessionHistorySlice';

export type SerializedSessionCompletedEvent = Omit<SessionCompletedEvent, 'timestamp'> & {
  timestamp: string;
};

export type SerializedTestSessionCompletedEvent = Omit<TestSessionCompletedEvent, 'timestamp'> & {
  timestamp: string;
};

export const hydrateSessionCompletedEvent = (event: SerializedSessionCompletedEvent): SessionCompletedEvent => ({
  ...event,
  timestamp: event.timestamp ? Temporal.Instant.from(event.timestamp) : Temporal.Now.instant(),
});

export const hydrateTestSessionCompletedEvent = (
  event: SerializedTestSessionCompletedEvent,
): TestSessionCompletedEvent => ({
  ...event,
  timestamp: event.timestamp ? Temporal.Instant.from(event.timestamp) : Temporal.Now.instant(),
});
