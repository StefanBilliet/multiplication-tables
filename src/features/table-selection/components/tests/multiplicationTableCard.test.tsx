import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import renderComponent from "../../../../shared/testing/renderComponent";
import MultiplicationTableCard from "../multiplicationTableCard";

describe("MultiplicationTableCard", () => {
  test("GIVEN a locked table with rewards needed, WHEN rendered, THEN it displays the rewards needed message", () => {
    renderComponent(
      <MultiplicationTableCard
        table={{ id: 4, label: "4 times table", unlocked: false }}
        lifetimeRewardTotal={2}
        onSelect={() => {}}
      />,
    );

    expect(
      screen.getByText("You need 5 more rewards to unlock this table"),
    ).toBeVisible();
  });

  test("GIVEN a locked table with 14 rewards needed, WHEN rendered, THEN it displays the correct message", () => {
    renderComponent(
      <MultiplicationTableCard
        table={{ id: 6, label: "6 times table", unlocked: false }}
        lifetimeRewardTotal={2}
        onSelect={() => {}}
      />,
    );

    expect(
      screen.getByText("You need 14 more rewards to unlock this table"),
    ).toBeVisible();
  });

  test("GIVEN an unlocked table, WHEN rendered, THEN it does not display a rewards message", () => {
    renderComponent(
      <MultiplicationTableCard
        table={{ id: 4, label: "4 times table", unlocked: true }}
        lifetimeRewardTotal={7}
        onSelect={() => {}}
      />,
    );

    expect(
      screen.queryByText(/You need \d+ more rewards/),
    ).not.toBeInTheDocument();
  });
});
