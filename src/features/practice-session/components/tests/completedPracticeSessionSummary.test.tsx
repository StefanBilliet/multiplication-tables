import { screen } from "@testing-library/react";
import renderComponent from "../../../../shared/testing/renderComponent";
import type { PracticeFlow } from "../../models/practiceFlow";
import CompletedPracticeSessionSummary from "../completedPracticeSessionSummary";

vi.mock("../useLifetimeRewardTotal", () => ({
  default: () => ({
    addReward: vi.fn(),
    lifetimeRewardTotal: 6,
  }),
}));

test("GIVEN a completed qualifying session, WHEN the completed summary is rendered, THEN it shows the earned reward summary", () => {
  const session: PracticeFlow = {
    kind: "sessionComplete",
    firstTryCorrectAnswerCount: 7,
    hasEarnedReward: true,
  };

  renderComponent(<CompletedPracticeSessionSummary session={session} />);

  expect(screen.getByText("You earned 1 reward")).toBeVisible();
  expect(screen.getByText("6 total rewards")).toBeVisible();
});

test("GIVEN a completed non-qualifying session, WHEN the completed summary is rendered, THEN it shows the plain session summary", () => {
  const session: PracticeFlow = {
    kind: "sessionComplete",
    firstTryCorrectAnswerCount: 6,
    hasEarnedReward: false,
  };

  renderComponent(<CompletedPracticeSessionSummary session={session} />);

  expect(screen.queryByText("You earned 1 reward")).not.toBeInTheDocument();
  expect(screen.getByText("6 correct answers")).toBeVisible();
});
