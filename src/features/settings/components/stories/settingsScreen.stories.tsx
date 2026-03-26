import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SettingsScreen from "../settingsScreen.tsx";

const meta = {
  title: "Settings/SettingsScreen",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={["/settings"]}>
      <Routes>
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </MemoryRouter>
  ),
};
