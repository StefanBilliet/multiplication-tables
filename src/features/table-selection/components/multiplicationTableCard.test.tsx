import { screen } from "@testing-library/react";
import renderComponent from "../../../shared/testing/renderComponent";
import MultiplicationTableCard from "./multiplicationTableCard";

test("GIVEN a table is available, WHEN the card is clicked, THEN the available state is shown and it notifies that table was selected", async () => {
  const onSelect = vi.fn();
  const sut = (
    <MultiplicationTableCard
      onSelect={onSelect}
      table={{ id: 3, label: "3 times table", unlocked: true }}
    />
  );
  const { user } = renderComponent(sut);

  await user.click(screen.getByRole("button", { name: /start practice/i }));

  expect(screen.getByText("Available")).toBeVisible();
  expect(screen.getByText("3 times table")).toBeVisible();
  expect(screen.getByText("Ready to practice")).toBeVisible();
  expect(screen.getByRole("button", { name: /start practice/i })).toBeEnabled();
  expect(onSelect).toHaveBeenCalledWith(3);
});

test("GIVEN a table is locked, WHEN the card is clicked, THEN the locked state is shown and it does not notify that table was selected", async () => {
  const onSelect = vi.fn();
  const sut = (
    <MultiplicationTableCard
      table={{ id: 4, label: "4 times table", unlocked: false }}
      onSelect={onSelect}
    />
  );
  const { user } = renderComponent(sut);

  await user.click(screen.getByRole("button", { name: /locked for now/i }));

  expect(screen.getByText("Locked")).toBeVisible();
  expect(screen.getByText("4 times table")).toBeVisible();
  expect(screen.getByText("Unlock this table next")).toBeVisible();
  expect(screen.getByRole("button", { name: /locked for now/i })).toBeDisabled();
  expect(onSelect).not.toHaveBeenCalled();
});
