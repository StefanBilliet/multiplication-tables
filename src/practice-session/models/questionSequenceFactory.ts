import { shuffleAnswerOptions } from '../utils/practiceFlowUtils.ts';
import type { Question } from './types.ts';

const QUESTION_SEQUENCE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const QUESTION_SEQUENCE_SHUFFLE_RANGE = 233280;

export const createQuestionSequenceFactory = (table: number, shuffleSeed: number = table * 1000) => ({
  regular: (): Question[] => QUESTION_SEQUENCE.map((multiplier) => ({ table, multiplier })),
  shuffled: (): Question[] =>
    shuffleAnswerOptions(QUESTION_SEQUENCE, shuffleSeed).map((multiplier) => ({ table, multiplier })),
});
