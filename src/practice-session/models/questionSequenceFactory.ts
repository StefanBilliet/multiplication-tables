import { shuffleAnswerOptions } from '../utils/practiceFlowUtils.ts';
import type { Question } from './types.ts';

const QUESTION_SEQUENCE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const createQuestionSequenceFactory = (table: number, random: () => number = Math.random) => ({
  regular: (): Question[] => QUESTION_SEQUENCE.map((multiplier) => ({ table, multiplier })),
  shuffled: (): Question[] =>
    shuffleAnswerOptions(QUESTION_SEQUENCE, random).map((multiplier) => ({ table, multiplier })),
});
