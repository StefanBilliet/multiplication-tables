import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { AppProviders } from "../../app/providers/appProviders";

function renderComponent(sut: ReactNode) {
  return render(<AppProviders>{sut}</AppProviders>);
}

export default renderComponent;
