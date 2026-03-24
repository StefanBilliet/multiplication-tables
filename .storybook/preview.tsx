import "@mantine/core/styles.css";
import type { Preview } from "@storybook/react-vite";
import { AppProviders } from "../src/app/providers/appProviders";
import "../src/app/styles/index.css";
import "../src/shared/i18n";

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
