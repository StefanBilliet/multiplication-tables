import { shuffleAnswerOptions } from "../utils/practiceFlowUtils.ts";

export const answerOptions = (table: number, multiplier: number): number[] => {
  const answerOptions = Array.from(
    { length: 10 },
    (_, index) => table * (index + 1),
  );

  return shuffleAnswerOptions(answerOptions, table * 100 + multiplier);
};
