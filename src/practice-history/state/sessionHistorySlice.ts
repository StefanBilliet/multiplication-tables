import type { Temporal } from '@js-temporal/polyfill';
import type { StateCreator } from 'zustand';
import createRecordSessionCompleted from './recordSessionCompleted';
import createRecordTestSessionCompleted from './recordTestSessionCompleted';

export type SessionCompletedEvent = {
  id: string;
  table: number;
  firstTryCorrectAnswerCount: number;
  hasEarnedReward: boolean;
  timestamp: Temporal.Instant;
  multiplicationErrors: { table: number; multiplier: number }[];
};

export type TestSessionCompletedEvent = {
  id: string;
  type: 'test';
  firstTryCorrectAnswerCount: number;
  timestamp: Temporal.Instant;
  multiplicationErrors: { table: number; multiplier: number }[];
};

export type RecentWeakness = {
  table: number;
  multiplier: number;
  mistakeCount: number;
};

export type SessionHistorySlice = {
  sessionCompletedEvents: SessionCompletedEvent[];
  testSessionCompletedEvents: TestSessionCompletedEvent[];
  recentWeaknesses: RecentWeakness[];
  recordSessionCompleted: (event: SessionCompletedEvent) => void;
  recordTestSessionCompleted: (event: TestSessionCompletedEvent) => void;
};

export const createSessionHistorySlice: StateCreator<SessionHistorySlice> = (set) => ({
  sessionCompletedEvents: [],
  testSessionCompletedEvents: [],
  recentWeaknesses: [],
  ...createRecordSessionCompleted(set),
  ...createRecordTestSessionCompleted(set),
});
