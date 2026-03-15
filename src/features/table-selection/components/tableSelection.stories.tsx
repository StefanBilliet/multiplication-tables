import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import TableSelection from "./tableSelection";

const meta = {
  title: "Practice/TableSelection",
  component: TableSelection,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof TableSelection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StartScreen: Story = {};
