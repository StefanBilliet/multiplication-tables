import { screen } from "@testing-library/react";
import { vi } from "vitest";
import i18n from "../../../../shared/i18n";
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

test("GIVEN Dutch is the active language, WHEN the table selection is rendered, THEN visible table-selection text is shown in Dutch", async () => {
  await i18n.changeLanguage("nl");

  renderWithRouter(<TableSelection />);

  expect(
    screen.getByRole("heading", { name: "Kies een tafel om te oefenen" }),
  ).toBeVisible();
  expect(screen.getAllByRole("button", { name: "Start oefenen" })).toHaveLength(
    10,
  );
  expect(screen.queryByText("1 times table")).not.toBeInTheDocument();
});
