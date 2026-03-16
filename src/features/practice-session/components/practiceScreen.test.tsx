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
  expect(screen.getByRole("textbox")).toBeVisible();
  expect(screen.getByRole("button", { name: /back to tables/i })).toBeVisible();
  for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
    expect(screen.getByText(`${multiplier * table}`)).toBeVisible();
  }
});

test("GIVEN a question is shown and no answer is selected, WHEN the practice screen is rendered, THEN the Check answer action is disabled", () => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );

  renderWithRouter(sut, { initialEntries: ["/tables/3/practice"] });

  expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  expect(screen.getByPlaceholderText("Choose a number")).toBeVisible();
  expect(screen.getByRole("button", { name: /check answer/i })).toBeDisabled();
});

test("GIVEN a question is shown, WHEN I select several answers before submitting, THEN the currently selected answer wins", async () => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "9" }));

  expect(screen.getByRole("textbox")).toHaveValue("9");
});

test("GIVEN I have selected an answer, WHEN the practice screen is rendered, THEN the Check answer action is enabled", async () => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: "9" }));

  expect(screen.getByRole("button", { name: /check answer/i })).toBeEnabled();
});

test("GIVEN I have selected the correct answer, WHEN I press Check answer, THEN success feedback is displayed for the current question", async () => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: /check answer/i }));

  expect(screen.getByText("Correct!")).toBeVisible();
});

test("GIVEN I have selected the correct answer, WHEN I press Check answer, THEN Continue replaces the Check answer action", async () => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: /check answer/i }));

  expect(
    screen.queryByRole("button", { name: /check answer/i }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: /continue/i })).toBeVisible();
});

test("GIVEN the question was answered correctly, WHEN the practice screen is shown, THEN the answer buttons are disabled", async () => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: /check answer/i }));

  expect(screen.getByRole("button", { name: "3" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "6" })).toBeDisabled();
});

test("GIVEN I have selected an incorrect answer, WHEN I press Check answer, THEN incorrect feedback is displayed and the same question remains active", async () => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: /check answer/i }));

  expect(screen.getByText("Try again.")).toBeVisible();
  expect(screen.getByText("1 x 3 = ?")).toBeVisible();
});

test("GIVEN I have selected an incorrect answer, WHEN I press Check answer, THEN the selected answer resets so I can try again", async () => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: /check answer/i }));

  expect(screen.queryByText("Selected answer: 6")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: /check answer/i })).toBeDisabled();
});

test("GIVEN correct feedback is visible, WHEN I choose to continue, THEN the app shows the next question for the selected table", async () => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: /check answer/i }));
  await user.click(screen.getByRole("button", { name: /continue/i }));

  expect(screen.getByText("2 x 3 = ?")).toBeVisible();
});

test("GIVEN the next question is shown, WHEN I submit the correct answer for that question, THEN the app evaluates the currently visible answer against the current question", async () => {
  const sut = (
    <Routes>
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut, {
    initialEntries: ["/tables/3/practice"],
  });

  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: /check answer/i }));
  await user.click(screen.getByRole("button", { name: /continue/i }));
  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: /check answer/i }));

  expect(screen.getByText("Correct!")).toBeVisible();
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
