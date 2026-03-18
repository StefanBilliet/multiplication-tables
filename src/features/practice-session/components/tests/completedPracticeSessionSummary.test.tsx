import { screen } from "@testing-library/react";
import renderComponent from "../../../../shared/testing/renderComponent";
import type { PracticeSession } from "../../models/practiceSession";
import CompletedPracticeSessionSummary from "../completedPracticeSessionSummary";

vi.mock("../useLifetimeRewardTotal", () => ({
  default: () => ({
    addReward: vi.fn(),
    lifetimeRewardTotal: 6,
  }),
}));

test("GIVEN a completed qualifying session, WHEN the completed summary is rendered, THEN it shows the earned reward summary", () => {
  const session: PracticeSession = {
    selectedTable: 3,
    currentMultiplier: 10,
    firstTryCorrectAnswerCount: 7,
    hasRetriedCurrentQuestion: false,
    isComplete: true,
    answerState: { kind: "idle" },
  };

  renderComponent(<CompletedPracticeSessionSummary session={session} />);

  expect(screen.getByText("You earned 1 reward")).toBeVisible();
  expect(screen.getByText("6 total rewards")).toBeVisible();
});

test("GIVEN a completed non-qualifying session, WHEN the completed summary is rendered, THEN it shows the plain session summary", () => {
  const session: PracticeSession = {
    selectedTable: 3,
    currentMultiplier: 10,
    firstTryCorrectAnswerCount: 6,
    hasRetriedCurrentQuestion: false,
    isComplete: true,
    answerState: { kind: "idle" },
  };

  renderComponent(<CompletedPracticeSessionSummary session={session} />);

  expect(screen.queryByText("You earned 1 reward")).not.toBeInTheDocument();
  expect(screen.getByText("6 correct answers")).toBeVisible();
});
