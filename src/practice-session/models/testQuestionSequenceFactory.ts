import { shuffle } from 'es-toolkit/array';
import type { Question } from './types.ts';

const QUESTION_MULTIPLIERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const createTestQuestionSequenceFactory = (unlockedTables: number[]) => ({
  random: (): Question[] =>
    shuffle(unlockedTables.flatMap((table) => QUESTION_MULTIPLIERS.map((multiplier) => ({ table, multiplier })))).slice(
      0,
      20,
    ),
});
