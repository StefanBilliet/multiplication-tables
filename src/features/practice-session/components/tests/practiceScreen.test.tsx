import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import renderWithRouter from "../../../../shared/testing/renderWithRouter.tsx";
import PracticeScreen from "../practiceScreen.tsx";
import { practiceScreenPage } from "./practiceScreenPage.tsx";
import { renderPracticeScreen } from "./renderPracticeScreen.tsx";

test.each([
  { table: 1, question: "1 x 1 = ?" },
  { table: 3, question: "1 x 3 = ?" },
])("GIVEN table $table is selected, WHEN the practice screen is shown, THEN the initial practice state for that table is displayed", ({
  table,
  question,
}) => {
  const page = renderPracticeScreen([`/tables/${table}/practice`]);

  expect(screen.getByText(`Practice the ${table} times table`)).toBeVisible();
  expect(page.question(question)).toBeVisible();
  expect(page.answerField()).toBeVisible();
  expect(page.backToTablesButton()).toBeVisible();
  for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
    expect(screen.getByText(`${multiplier * table}`)).toBeVisible();
  }
});

test("GIVEN a question is shown and no answer is selected, WHEN the practice screen is rendered, THEN the Check answer action is disabled", () => {
  const page = renderPracticeScreen();

  expect(page.answerField()).toHaveAttribute("readonly");
  expect(screen.getByPlaceholderText("Choose a number")).toBeVisible();
  expect(page.checkAnswerButton()).toBeDisabled();
});

test("GIVEN a question is shown, WHEN I select several answers before submitting, THEN the currently selected answer wins", async () => {
  const page = renderPracticeScreen();

  await page.selectAnswer(6);
  await page.selectAnswer(9);

  expect(page.answerField()).toHaveValue("9");
});

test("GIVEN I have selected an answer, WHEN the practice screen is rendered, THEN the Check answer action is enabled", async () => {
  const page = renderPracticeScreen();

  await page.selectAnswer(9);

  expect(page.checkAnswerButton()).toBeEnabled();
});

test("GIVEN I have selected the correct answer, WHEN I press Check answer, THEN success feedback is displayed for the current question", async () => {
  const page = renderPracticeScreen();

  await page.answerQuestion(3);

  expect(page.feedbackMessage("Correct!")).toBeVisible();
});

test("GIVEN I have selected the correct answer, WHEN I press Check answer, THEN Continue replaces the Check answer action", async () => {
  const page = renderPracticeScreen();

  await page.answerQuestion(3);

  expect(
    screen.queryByRole("button", { name: /check answer/i }),
  ).not.toBeInTheDocument();
  expect(page.continueButton()).toBeVisible();
});

test("GIVEN the question was answered correctly, WHEN the practice screen is shown, THEN the answer buttons are disabled", async () => {
  const page = renderPracticeScreen();

  await page.answerQuestion(3);

  expect(page.answerOption(3)).toBeDisabled();
  expect(page.answerOption(6)).toBeDisabled();
});

test("GIVEN I have selected an incorrect answer, WHEN I press Check answer, THEN incorrect feedback is displayed and the same question remains active", async () => {
  const page = renderPracticeScreen();

  await page.answerQuestion(6);

  expect(page.feedbackMessage("Try again.")).toBeVisible();
  expect(page.question("1 x 3 = ?")).toBeVisible();
});

test("GIVEN I have selected an incorrect answer, WHEN I press Check answer, THEN the selected answer resets so I can try again", async () => {
  const page = renderPracticeScreen();

  await page.answerQuestion(6);

  expect(page.answerField()).toHaveValue("");
  expect(page.checkAnswerButton()).toBeDisabled();
});

test("GIVEN correct feedback is visible, WHEN I choose to continue, THEN the app shows the next question for the selected table", async () => {
  const page = renderPracticeScreen();

  await page.answerQuestion(3);
  await page.continuePractice();

  expect(page.question("2 x 3 = ?")).toBeVisible();
});

test("GIVEN I have answered the tenth question correctly, WHEN I choose to continue, THEN the practice session is completed instead of showing an eleventh question", async () => {
  const page = renderPracticeScreen();

  for (let multiplier = 1; multiplier < 10; multiplier += 1) {
    await page.answerQuestion(multiplier * 3);
    await page.continuePractice();
  }

  await page.answerQuestion(30);
  await page.continuePractice();

  expect(page.completionMessage()).toBeVisible();
  expect(screen.queryByText("11 x 3 = ?")).not.toBeInTheDocument();
});

test("GIVEN one question needs a retry, WHEN the summary screen is shown, THEN it displays how many questions were answered correctly on the first try", async () => {
  const page = renderPracticeScreen();

  await page.answerQuestion(6);
  await page.answerQuestion(3);
  await page.continuePractice();

  for (let multiplier = 2; multiplier <= 10; multiplier += 1) {
    await page.answerQuestion(multiplier * 3);

    if (multiplier < 10) {
      await page.continuePractice();
    }
  }

  await page.continuePractice();

  expect(page.completionMessage()).toBeVisible();
  expect(screen.getByText("Session summary")).toBeVisible();
  expect(screen.getByText("9 correct answers")).toBeVisible();
  expect(
    screen.getByText("You've completed this practice session."),
  ).toBeVisible();
  expect(
    screen.queryByText(
      "Solve each question one by one. Keep going until all 10 are done.",
    ),
  ).not.toBeInTheDocument();
  expect(
    screen.getByText(
      "Great work. You answered 9 out of 10 questions correctly.",
    ),
  ).toBeVisible();
});

test("GIVEN all questions are answered correctly on the first try, WHEN the summary screen is shown, THEN it displays 10 correct answers", async () => {
  const page = renderPracticeScreen();

  for (let multiplier = 1; multiplier <= 10; multiplier += 1) {
    await page.answerQuestion(multiplier * 3);

    if (multiplier < 10) {
      await page.continuePractice();
    }
  }

  await page.continuePractice();

  expect(page.completionMessage()).toBeVisible();
  expect(screen.getByText("10 correct answers")).toBeVisible();
});

test("GIVEN the next question is shown, WHEN I submit the correct answer for that question, THEN the app evaluates the currently visible answer against the current question", async () => {
  const page = renderPracticeScreen();

  await page.answerQuestion(3);
  await page.continuePractice();
  await page.answerQuestion(6);

  expect(page.feedbackMessage("Correct!")).toBeVisible();
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
  const page = practiceScreenPage(user);

  await page.backToTables();

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
  const page = practiceScreenPage(user);

  await page.backToTables();
  await user.click(screen.getByRole("button", { name: /start practice/i }));

  expect(screen.getByRole("button", { name: /start practice/i })).toBeVisible();
});
