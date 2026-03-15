import { render } from "@testing-library/react";
import App from "../App";
import { AppProviders } from "../providers/AppProviders";

describe("App", () => {
  it("renders the scaffold status", () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>,
    );
  });
});
