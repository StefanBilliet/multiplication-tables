import type { Meta, StoryObj } from "@storybook/react-vite";
import TableSelection from "./tableSelection";

const meta = {
  title: "Practice/TableSelection",
  component: TableSelection,
} satisfies Meta<typeof TableSelection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StartScreen: Story = {};
