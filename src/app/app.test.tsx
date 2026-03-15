import { screen } from "@testing-library/react";
import renderWithRouter from "../shared/testing/renderWithRouter";
import App from "./app";

vi.mock("../features/practice-session/components/practiceScreen", () => ({
  default: () => <div>Practice screen stub</div>,
}));

test("GIVEN the home route is shown, WHEN an available table is selected, THEN the selected table practice screen is shown", async () => {
  const sut = <App />;
  const { user } = renderWithRouter(sut);

  await user.click(
    screen.getAllByRole("button", { name: /start practice/i })[0],
  );

  expect(screen.getByText("Practice screen stub")).toBeVisible();
});

test("GIVEN the home route is shown, WHEN the app is rendered, THEN the table selection screen is shown", () => {
  const sut = <App />;

  renderWithRouter(sut);

  expect(
    screen.getByRole("heading", { name: /choose a table to practice/i }),
  ).toBeVisible();
});
