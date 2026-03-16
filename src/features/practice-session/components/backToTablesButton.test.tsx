import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import renderWithRouter from "../../../shared/testing/renderWithRouter";
import BackToTablesButton from "./backToTablesButton";

test("GIVEN the back to tables action is shown, WHEN I press it, THEN the app navigates to the table selection screen", async () => {
  const sut = (
    <Routes>
      <Route path="/" element={<div>Choose a table to practice</div>} />
      <Route path="/tables/3/practice" element={<BackToTablesButton />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: /back to tables/i }));

  expect(screen.getByText("Choose a table to practice")).toBeVisible();
});
