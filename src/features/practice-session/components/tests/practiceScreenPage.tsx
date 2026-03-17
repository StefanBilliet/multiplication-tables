import { screen } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event/dist/cjs/index.js";

export const practiceScreenPage = (user: UserEvent) => ({
  answerField: () => screen.getByRole("textbox"),
  answerOption: (answer: number | string) =>
    screen.getByRole("button", { name: String(answer) }),
  backToTablesButton: () =>
    screen.getByRole("button", { name: /back to tables/i }),
  checkAnswerButton: () =>
    screen.getByRole("button", { name: /check answer/i }),
  continueButton: () => screen.getByRole("button", { name: /continue/i }),
  completionMessage: () => screen.getByText("Practice session complete"),
  feedbackMessage: (feedback: string) => screen.getByText(feedback),
  question: (question: string) => screen.getByText(question),
  selectAnswer: async (answer: number) => {
    await user.click(screen.getByRole("button", { name: String(answer) }));
  },
  checkAnswer: async () => {
    await user.click(screen.getByRole("button", { name: /check answer/i }));
  },
  continuePractice: async () => {
    await user.click(screen.getByRole("button", { name: /continue/i }));
  },
  answerQuestion: async (answer: number) => {
    await user.click(screen.getByRole("button", { name: String(answer) }));
    await user.click(screen.getByRole("button", { name: /check answer/i }));
  },
  backToTables: async () => {
    await user.click(screen.getByRole("button", { name: /back to tables/i }));
  },
});
