export type AnswerState =
  | { kind: "idle" }
  | { kind: "selected"; answer: number }
  | { kind: "validated"; answer: number; result: "correct" | "incorrect" };

type SelectedAnswerState = Extract<AnswerState, { kind: "selected" }>;
type ValidatedAnswerState = Extract<AnswerState, { kind: "validated" }>;

const AnswerState = {
  selectedAnswer(state: AnswerState): number | null {
    return state.kind === "selected" || state.kind === "validated"
      ? state.answer
      : null;
  },

  canCheck(state: AnswerState): state is SelectedAnswerState {
    return state.kind === "selected";
  },

  isCorrect(state: AnswerState): boolean {
    return state.kind === "validated" && state.result === "correct";
  },

  feedback(state: ValidatedAnswerState): string {
    return state.result === "correct" ? "Correct!" : "Try again.";
  },
};

export default AnswerState;
