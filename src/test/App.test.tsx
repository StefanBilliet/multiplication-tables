import { render, screen } from "@testing-library/react";
import App from "../App";
import { AppProviders } from "../providers/AppProviders";

describe("App", () => {
  it("renders the scaffold status", () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>,
    );

    expect(
      screen.getByRole("heading", { name: "Multiplication Tables" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/scaffold ready/i)).toBeInTheDocument();
  });
});
