import { Factory } from 'fishery';

export type SessionCompletedEventView = {
  table: number;
  firstTryCorrectAnswerCount: number;
  timestamp: string;
  hasEarnedReward: boolean;
};

export const sessionCompletedEventFactory = Factory.define<SessionCompletedEventView>(({ sequence }) => ({
  table: sequence,
  firstTryCorrectAnswerCount: sequence,
  timestamp: `2026-03-${String(sequence).padStart(2, '0')}T12:00:00Z`,
  hasEarnedReward: false,
}));
