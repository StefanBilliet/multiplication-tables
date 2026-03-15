import "@mantine/core/styles.css";
import type { Preview } from "@storybook/react-vite";
import { AppProviders } from "../src/providers/AppProviders";
import "../src/index.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
};

export default preview;
