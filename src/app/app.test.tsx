import { screen } from "@testing-library/react";
import renderWithRouter from "../shared/testing/renderWithRouter";
import App from "./app";

const useLifetimeRewardTotalMock = vi.fn();

vi.mock("../features/practice-session/components/practiceScreen", () => ({
  default: () => <div>Practice screen stub</div>,
}));

vi.mock("../shared/rewards/useLifetimeRewardTotal", () => ({
  default: () => useLifetimeRewardTotalMock(),
}));

beforeEach(() => {
  useLifetimeRewardTotalMock.mockReturnValue({
    addReward: vi.fn(),
    lifetimeRewardTotal: 46,
  });
});

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

test("GIVEN the home route is shown, WHEN the app is rendered, THEN table options from 1 to 10 are shown", () => {
  const sut = <App />;

  renderWithRouter(sut);

  for (let table = 1; table <= 10; table += 1) {
    expect(screen.getByText(`${table} times table`)).toBeVisible();
  }
});
