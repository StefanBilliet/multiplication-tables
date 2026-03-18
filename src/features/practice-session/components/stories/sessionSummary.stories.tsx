import type { Meta, StoryObj } from "@storybook/react-vite";
import type { PracticeFlow } from "../../models/practiceFlow";
import CompletedPracticeSessionSummary from "../completedPracticeSessionSummary";

const meta = {
  title: "Practice/SessionSummary",
} satisfies Meta;

export default meta;

export const RewardEarned: StoryObj = {
  render: () => {
    const session: PracticeFlow = {
      kind: "sessionComplete",
      firstTryCorrectAnswerCount: 8,
      hasEarnedReward: true,
    };
    return <CompletedPracticeSessionSummary session={session} />;
  },
};

export const NoRewardEarned: StoryObj = {
  render: () => {
    const session: PracticeFlow = {
      kind: "sessionComplete",
      firstTryCorrectAnswerCount: 5,
      hasEarnedReward: false,
    };
    return <CompletedPracticeSessionSummary session={session} />;
  },
};
