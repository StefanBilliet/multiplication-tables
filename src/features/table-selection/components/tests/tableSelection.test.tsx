import { screen } from "@testing-library/react";
import { vi } from "vitest";
import renderWithRouter from "../../../../shared/testing/renderWithRouter";
import TableSelection from "../tableSelection";

const useLifetimeRewardTotalMock = vi.fn();

vi.mock("../../../../shared/rewards/useLifetimeRewardTotal", () => ({
  default: () => useLifetimeRewardTotalMock(),
}));

beforeEach(() => {
  useLifetimeRewardTotalMock.mockReturnValue({
    addReward: vi.fn(),
    lifetimeRewardTotal: 46,
  });
});

test("GIVEN 46 lifetime rewards, WHEN the table selection is rendered, THEN all tables are available", () => {
  renderWithRouter(<TableSelection />);

  expect(
    screen.getAllByRole("button", { name: "Start practice" }),
  ).toHaveLength(10);
});

test("GIVEN 4 lifetime rewards, WHEN the table selection is rendered, THEN table 5 is locked and shows the remaining rewards needed", () => {
  useLifetimeRewardTotalMock.mockReturnValue({
    addReward: vi.fn(),
    lifetimeRewardTotal: 4,
  });

  renderWithRouter(<TableSelection />);

  expect(
    screen.getAllByRole("button", { name: "Start practice" }),
  ).toHaveLength(3);
  expect(screen.getByRole("heading", { name: "5 times table" })).toBeVisible();
  expect(
    screen.getByText("You need 7 more rewards to unlock this table"),
  ).toBeVisible();
});

test("GIVEN 6 lifetime rewards, WHEN the table selection is rendered, THEN table 4 is locked and shows 1 more reward needed", () => {
  useLifetimeRewardTotalMock.mockReturnValue({
    addReward: vi.fn(),
    lifetimeRewardTotal: 6,
  });

  renderWithRouter(<TableSelection />);

  expect(
    screen.getAllByRole("button", { name: "Start practice" }),
  ).toHaveLength(3);
  expect(screen.getByRole("heading", { name: "4 times table" })).toBeVisible();
  expect(
    screen.getByText("You need 1 more rewards to unlock this table"),
  ).toBeVisible();
});
