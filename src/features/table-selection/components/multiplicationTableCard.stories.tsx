import { Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MultiplicationTableCard from "./multiplicationTableCard";

const meta = {
  title: "Practice/MultiplicationTableCard",
  component: MultiplicationTableCard,
  args: {
    onSelect: () => {},
  },
  decorators: [
    (Story) => (
      <Box maw={320} mx="auto">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof MultiplicationTableCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Available: Story = {
  args: {
    table: {
      id: 3,
      label: "3 times table",
      unlockState: { unlocked: true, rewardsNeeded: 0 },
    },
  },
};

export const Locked: Story = {
  args: {
    table: {
      id: 4,
      label: "4 times table",
      unlockState: { unlocked: false, rewardsNeeded: 3 },
    },
  },
};
