import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import renderComponent from "../../../../shared/testing/renderComponent";
import MultiplicationTableCard from "../multiplicationTableCard";

describe("MultiplicationTableCard", () => {
  test("GIVEN a locked table view model, WHEN rendered, THEN it displays the rewards needed message", () => {
    renderComponent(
      <MultiplicationTableCard
        table={{
          id: 4,
          label: "4 times table",
          unlockState: { unlocked: false, rewardsNeeded: 5 },
        }}
        onSelect={() => {}}
      />,
    );

    expect(
      screen.getByText("You need 5 more rewards to unlock this table"),
    ).toBeVisible();
  });

  test("GIVEN a locked table view model with 14 rewards needed, WHEN rendered, THEN it displays the correct message", () => {
    renderComponent(
      <MultiplicationTableCard
        table={{
          id: 6,
          label: "6 times table",
          unlockState: { unlocked: false, rewardsNeeded: 14 },
        }}
        onSelect={() => {}}
      />,
    );

    expect(
      screen.getByText("You need 14 more rewards to unlock this table"),
    ).toBeVisible();
  });

  test("GIVEN an unlocked table view model, WHEN rendered, THEN it does not display a rewards message", () => {
    renderComponent(
      <MultiplicationTableCard
        table={{
          id: 4,
          label: "4 times table",
          unlockState: { unlocked: true, rewardsNeeded: 0 },
        }}
        onSelect={() => {}}
      />,
    );

    expect(
      screen.queryByText(/You need \d+ more rewards/),
    ).not.toBeInTheDocument();
  });

  test("GIVEN a table is available, WHEN the card is clicked, THEN the available state is shown and it notifies that table was selected", async () => {
    const onSelect = vi.fn();
    const sut = (
      <MultiplicationTableCard
        onSelect={onSelect}
        table={{
          id: 3,
          label: "3 times table",
          unlockState: { unlocked: true, rewardsNeeded: 0 },
        }}
      />
    );
    const { user } = renderComponent(sut);

    await user.click(screen.getByRole("button", { name: /start practice/i }));

    expect(screen.getByText("Available")).toBeVisible();
    expect(screen.getByText("3 times table")).toBeVisible();
    expect(screen.getByText("Ready to practice")).toBeVisible();
    expect(
      screen.getByRole("button", { name: /start practice/i }),
    ).toBeEnabled();
    expect(onSelect).toHaveBeenCalledWith(3);
  });

  test("GIVEN a table is locked, WHEN the card is clicked, THEN the locked state is shown and it does not notify that table was selected", async () => {
    const onSelect = vi.fn();
    const sut = (
      <MultiplicationTableCard
        table={{
          id: 4,
          label: "4 times table",
          unlockState: { unlocked: false, rewardsNeeded: 3 },
        }}
        onSelect={onSelect}
      />
    );
    const { user } = renderComponent(sut);

    await user.click(screen.getByRole("button", { name: /locked for now/i }));

    expect(screen.getByText("Locked")).toBeVisible();
    expect(screen.getByText("4 times table")).toBeVisible();
    expect(screen.getByText("Unlock this table next")).toBeVisible();
    expect(
      screen.getByRole("button", { name: /locked for now/i }),
    ).toBeDisabled();
    expect(onSelect).not.toHaveBeenCalled();
  });
});
