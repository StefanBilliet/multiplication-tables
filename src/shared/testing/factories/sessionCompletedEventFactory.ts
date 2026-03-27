import { Temporal } from '@js-temporal/polyfill';
import { Factory } from 'fishery';

export type SessionCompletedEventView = {
  id: string;
  table: number;
  firstTryCorrectAnswerCount: number;
  timestamp: Temporal.Instant;
  hasEarnedReward: boolean;
  multiplicationErrors: { table: number; multiplier: number }[];
};

export const sessionCompletedEventFactory = Factory.define<SessionCompletedEventView>(({ sequence }) => ({
  id: `session-${sequence}`,
  table: sequence,
  firstTryCorrectAnswerCount: sequence,
  timestamp: Temporal.Instant.from(`2026-03-${String(sequence).padStart(2, '0')}T12:00:00Z`),
  hasEarnedReward: false,
  multiplicationErrors: [],
}));
