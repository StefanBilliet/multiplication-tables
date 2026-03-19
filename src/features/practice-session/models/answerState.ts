export type AnswerState =
  | { kind: "idle" }
  | { kind: "selected"; answer: number }
  | { kind: "validated"; answer: number; result: "correct" | "incorrect" };

const AnswerState = {
  selectedAnswer(state: AnswerState): number | null {
    return state.kind === "selected" ||
      (state.kind === "validated" && state.result === "correct")
      ? state.answer
      : null;
  },
};

export default AnswerState;
