import type { Meta, StoryObj } from "@storybook/react-vite";
import MultiplicationTablesOverview from "./MultiplicationTablesOverview";

const meta = {
  title: "Practice/MultiplicationTablesOverview",
  component: MultiplicationTablesOverview,
} satisfies Meta<typeof MultiplicationTablesOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StartScreen: Story = {};
