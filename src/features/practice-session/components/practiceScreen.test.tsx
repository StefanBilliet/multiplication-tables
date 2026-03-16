import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import renderWithRouter from "../../../shared/testing/renderWithRouter";
import PracticeScreen from "./practiceScreen";

test.each([
  { table: 1, question: "1 x 1 = ?" },
  { table: 3, question: "1 x 3 = ?" },
])("GIVEN table $table is selected, WHEN the practice screen is shown, THEN the initial practice state for that table is displayed", ({
  table,
  question,
}) => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );

  renderWithRouter(sut, { initialEntries: [`/tables/${table}/practice`] });

  expect(screen.getByText(`Practice the ${table} times table`)).toBeVisible();
  expect(screen.getByText(question)).toBeVisible();
  expect(screen.getByText("Answer")).toBeVisible();
  expect(screen.getByRole("button", { name: /back to tables/i })).toBeVisible();
  for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
    expect(screen.getByText(`${multiplier * table}`)).toBeVisible();
  }
});

test("GIVEN the practice screen is shown, WHEN back to tables is selected, THEN the table selection screen is shown", async () => {
  const sut = (
    <Routes>
      <Route path="/" element={<div>Choose a table to practice</div>} />
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: /back to tables/i }));

  expect(screen.getByText("Choose a table to practice")).toBeVisible();
});

test("GIVEN I return to the start screen, WHEN I select the same available table again, THEN the practice session starts for that table again", async () => {
  const sut = (
    <Routes>
      <Route path="/" element={<button type="button">Start practice</button>} />
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: /back to tables/i }));
  await user.click(screen.getByRole("button", { name: /start practice/i }));

  expect(screen.getByRole("button", { name: /start practice/i })).toBeVisible();
});
