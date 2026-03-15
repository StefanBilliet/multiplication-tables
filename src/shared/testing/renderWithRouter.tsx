import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import renderComponent from "./renderComponent";

type RenderWithRouterOptions = {
  initialEntries?: string[];
};

function renderWithRouter(
  sut: ReactNode,
  { initialEntries = ["/"] }: RenderWithRouterOptions = {},
) {
  return renderComponent(
    <MemoryRouter initialEntries={initialEntries}>{sut}</MemoryRouter>,
  );
}

export default renderWithRouter;
