import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { AppProviders } from "../../app/providers/appProviders";

function renderComponent(sut: ReactNode) {
  const user = userEvent.setup();

  return {
    user,
    ...render(<AppProviders>{sut}</AppProviders>),
  };
}

export default renderComponent;
