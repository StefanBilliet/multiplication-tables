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

test("GIVEN 4 lifetime rewards, WHEN the table selection is rendered, THEN the first three tables are available", () => {
  useLifetimeRewardTotalMock.mockReturnValue({
    addReward: vi.fn(),
    lifetimeRewardTotal: 4,
  });

  renderWithRouter(<TableSelection />);

  expect(
    screen.getAllByRole("button", { name: "Start practice" }),
  ).toHaveLength(3);
  expect(screen.getByRole("heading", { name: "4 times table" })).toBeVisible();
  expect(
    screen.getAllByRole("button", { name: "Locked for now" }),
  ).toHaveLength(7);
});
