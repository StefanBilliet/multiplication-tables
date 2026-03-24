import type { Meta, StoryObj } from "@storybook/react-vite";
import SettingsScreen from "../../../settings/components/settingsScreen.tsx";

const meta = {
  title: "Practice/SettingsScreen",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SettingsScreen />,
};
