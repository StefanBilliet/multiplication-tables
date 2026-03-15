import { screen } from "@testing-library/react";
import renderComponent from "../../../shared/testing/renderComponent";
import MultiplicationTableCard from "./multiplicationTableCard";

test("GIVEN a table is locked, WHEN the card is rendered, THEN the action is disabled", () => {
  const sut = (
    <MultiplicationTableCard
      table={{ id: 4, label: "4 times table", unlocked: false }}
    />
  );

  renderComponent(sut);

  expect(
    screen.getByRole("button", { name: /locked for now/i }),
  ).toBeDisabled();
});
