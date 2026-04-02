import { Temporal } from '@js-temporal/polyfill';
import { Factory } from 'fishery';
import type { TestSessionCompletedEvent } from '../../../practice-history/state/sessionHistorySlice';

export const testSessionCompletedEventFactory = Factory.define<TestSessionCompletedEvent>(({ sequence }) => ({
  id: `test-session-${sequence}`,
  type: 'test',
  firstTryCorrectAnswerCount: sequence,
  hasEarnedReward: false,
  timestamp: Temporal.Instant.from(`2026-03-${String(sequence).padStart(2, '0')}T12:00:00Z`),
  multiplicationErrors: [],
}));
