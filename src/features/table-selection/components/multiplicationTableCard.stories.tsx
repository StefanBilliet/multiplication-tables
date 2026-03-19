import { Box } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MultiplicationTableCard from "./multiplicationTableCard";

const meta = {
  title: "Practice/MultiplicationTableCard",
  component: MultiplicationTableCard,
  args: {
    lifetimeRewardTotal: 0,
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
    lifetimeRewardTotal: 4,
    table: { id: 3, label: "3 times table", unlocked: true },
  },
};

export const Locked: Story = {
  args: {
    lifetimeRewardTotal: 4,
    table: { id: 4, label: "4 times table", unlocked: false },
  },
};
