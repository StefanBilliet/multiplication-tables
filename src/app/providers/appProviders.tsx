import { createTheme, MantineProvider } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";

const theme = createTheme({
  primaryColor: "teal",
  fontFamily: "Inter, system-ui, sans-serif",
  headings: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
});

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};
