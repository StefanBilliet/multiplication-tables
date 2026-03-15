import { render } from "@testing-library/react";
import App from "./app";
import { AppProviders } from "./providers/appProviders";

describe("App", () => {
  it("renders the scaffold status", () => {
    render(
      <AppProviders>
        <App />
      </AppProviders>,
    );
  });
});
