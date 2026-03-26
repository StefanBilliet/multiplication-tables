import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AppProviders } from "../../../../app/providers/appProviders";
import type { QuestionOrderMode } from "../../../../shared/models/questionOrderMode";
import { createAppStore } from "../../../../shared/store/appStore";
import PracticeScreen from "../practiceScreen.tsx";

const meta = {
  title: "Practice/PracticeScreen",
  component: PracticeScreen,
} satisfies Meta<typeof PracticeScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderPracticeScreenStory = (questionOrderMode: QuestionOrderMode) => {
  const store = createAppStore({ persist: false });

  store.setState({ questionOrderMode, isHesitationRuleEnabled: true });

  return (
    <AppProviders store={store}>
      <MemoryRouter initialEntries={["/tables/3/practice"]}>
        <Routes>
          <Route
            path="/tables/:tableId/practice"
            element={<PracticeScreen />}
          />
        </Routes>
      </MemoryRouter>
    </AppProviders>
  );
};

export const Structured: Story = {
  render: () => renderPracticeScreenStory("structured"),
};

export const Varied: Story = {
  render: () => renderPracticeScreenStory("varied"),
};
