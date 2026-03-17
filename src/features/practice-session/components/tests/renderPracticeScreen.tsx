import { Route, Routes } from "react-router-dom";
import renderWithRouter from "../../../../shared/testing/renderWithRouter.tsx";
import PracticeScreen from "../practiceScreen.tsx";
import { practiceScreenPage } from "./practiceScreenPage.tsx";

export const renderPracticeScreen = (
  initialEntries = ["/tables/3/practice"],
) => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, { initialEntries });

  return practiceScreenPage(user);
};
