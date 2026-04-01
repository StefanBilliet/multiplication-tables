import type { Question } from './types.ts';

export type QuestionCursor = {
  index: number;
  sequence: Question[];
};

export const createQuestionCursor = (sequence: Question[], index: number): QuestionCursor => ({
  index,
  sequence,
});

export const getCurrentQuestion = (cursor: QuestionCursor): Question => cursor.sequence[cursor.index];
