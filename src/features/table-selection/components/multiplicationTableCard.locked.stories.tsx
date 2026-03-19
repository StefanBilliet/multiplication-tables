import { Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import TableCardWithRewardMessage from "./multiplicationTableCard.reward-mockup";

const meta = {
  title: "Practice/MultiplicationTableCard/LockedStates",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const StoryWrapper = (props: { tableLabel: string; rewardsNeeded: number }) => (
  <Box maw={320} mx="auto">
    <TableCardWithRewardMessage
      tableLabel={props.tableLabel}
      rewardsNeeded={props.rewardsNeeded}
    />
  </Box>
);

/**
 * US-05 Visual Scenarios: Locked states showing reward-based messages
 *
 * These are STATIC visual mockups only - no logic implemented.
 * Each story shows a table at a different unlock distance.
 */

// Example: User has 2 rewards, table 4 requires 7 → needs 5 more
export const LockedNearUnlock: Story = {
  render: () => <StoryWrapper tableLabel="4 times table" rewardsNeeded={5} />,
  name: "Locked - Near Unlock (5 more rewards)",
};

// Example: User has 2 rewards, table 6 requires 16 → needs 14 more
export const LockedMidProgress: Story = {
  render: () => <StoryWrapper tableLabel="6 times table" rewardsNeeded={14} />,
  name: "Locked - Mid Progress (14 more rewards)",
};

// Example: User has 2 rewards, table 10 requires 46 → needs 44 more
export const LockedFarAway: Story = {
  render: () => <StoryWrapper tableLabel="10 times table" rewardsNeeded={44} />,
  name: "Locked - Far Away (44 more rewards)",
};
