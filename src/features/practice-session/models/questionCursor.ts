export type QuestionCursor = {
  index: number;
  sequence: number[];
};

export const createQuestionCursor = (
  sequence: number[],
  index: number,
): QuestionCursor => ({
  index,
  sequence,
});

export const getCurrentMultiplier = (cursor: QuestionCursor) =>
  cursor.sequence[cursor.index];
