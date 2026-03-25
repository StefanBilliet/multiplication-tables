import { shuffleAnswerOptions } from "../utils/practiceFlowUtils.ts";

const QUESTION_SEQUENCE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const QUESTION_SEQUENCE_SHUFFLE_RANGE = 233280;

export const createQuestionSequenceFactory = (
  table: number,
  shuffleSeed: number = table * 1000,
) => ({
  regular: () => QUESTION_SEQUENCE,
  shuffled: () => shuffleAnswerOptions(QUESTION_SEQUENCE, shuffleSeed),
});
