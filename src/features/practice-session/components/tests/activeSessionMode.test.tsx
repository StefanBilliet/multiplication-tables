import renderComponent from "../../../../shared/testing/renderComponent";
import type { PracticeFlow } from "../../models/practiceFlow";
import ActiveSessionMode from "../activeSessionMode";
import BackToTablesButton from "../backToTablesButton";
import CurrentQuestionPrompt from "../currentQuestionPrompt";

vi.mock("../currentQuestionPrompt", () => ({
  default: vi.fn(() => <div data-testid="current-question-prompt" />),
}));

vi.mock("../backToTablesButton", () => ({
  default: vi.fn(() => <div data-testid="back-to-tables-button" />),
}));

test("GIVEN the active session mode is rendered, WHEN a hesitation callback is provided, THEN it forwards the timer props to the current question prompt", () => {
  const onHesitationElapsed = vi.fn();
  const session: PracticeFlow = {
    kind: "currentQuestion",
    currentQuestionIndex: 0,
    currentQuestion: {
      answerOptions: [3, 6, 9],
      canCheckAnswer: false,
      canContinue: false,
      feedbackState: null,
      hasRetriedCurrentQuestion: false,
      multiplier: 1,
      selectedAnswer: null,
      table: 3,
    },
    firstTryCorrectAnswerCount: 0,
    multiplicationErrors: [],
    questionSequence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

  renderComponent(
    <ActiveSessionMode
      session={session}
      selectedTable={3}
      onCheckAnswer={vi.fn()}
      onContinue={vi.fn()}
      onSelectAnswer={vi.fn()}
      isHesitationRuleEnabled
      onHesitationElapsed={onHesitationElapsed}
    />,
  );

  expect(CurrentQuestionPrompt).toHaveBeenCalledWith(
    expect.objectContaining({
      isHesitationRuleEnabled: true,
      onHesitationElapsed,
    }),
    undefined,
  );

  expect(BackToTablesButton).toHaveBeenCalled();
});

test("GIVEN the current question has correct feedback, WHEN the active session mode is rendered, THEN it disables the hesitation timer", () => {
  const session: PracticeFlow = {
    kind: "currentQuestion",
    currentQuestionIndex: 0,
    currentQuestion: {
      answerOptions: [3, 6, 9],
      canCheckAnswer: false,
      canContinue: true,
      feedbackState: "correct",
      hasRetriedCurrentQuestion: false,
      multiplier: 1,
      selectedAnswer: 3,
      table: 3,
    },
    firstTryCorrectAnswerCount: 1,
    multiplicationErrors: [],
    questionSequence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

  renderComponent(
    <ActiveSessionMode
      session={session}
      selectedTable={3}
      onCheckAnswer={vi.fn()}
      onContinue={vi.fn()}
      onSelectAnswer={vi.fn()}
      isHesitationRuleEnabled
      onHesitationElapsed={vi.fn()}
    />,
  );

  expect(CurrentQuestionPrompt).toHaveBeenLastCalledWith(
    expect.objectContaining({
      isHesitationRuleEnabled: false,
    }),
    undefined,
  );
});
