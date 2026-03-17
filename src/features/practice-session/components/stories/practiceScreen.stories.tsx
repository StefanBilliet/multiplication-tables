import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PracticeScreen from "../practiceScreen.tsx";

const meta = {
  title: "Practice/PracticeScreen",
  component: PracticeScreen,
} satisfies Meta<typeof PracticeScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  render: () => (
    <MemoryRouter initialEntries={["/tables/3/practice"]}>
      <Routes>
        <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
      </Routes>
    </MemoryRouter>
  ),
};
