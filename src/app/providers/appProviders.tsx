import { Card, createTheme, MantineProvider } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";
import { AppStoreProvider } from "../../shared/store/appStore";

const theme = createTheme({
  primaryColor: "teal",
  fontFamily: "Inter, system-ui, sans-serif",
  headings: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
  components: {
    Card: Card.extend({
      defaultProps: {
        radius: "xl",
        padding: "xl",
        shadow: "md",
      },
      styles: (_theme, props) => ({
        root:
          props.variant === "shell"
            ? {
                border: "1px solid rgba(23, 49, 55, 0.08)",
                background: "rgba(255, 255, 255, 0.82)",
                backdropFilter: "blur(16px)",
              }
            : {},
      }),
    }),
  },
});

export const AppProviders: FC<
  PropsWithChildren<{ store?: Parameters<typeof AppStoreProvider>[0]["store"] }>
> = ({ children, store }) => {
  return (
    <MantineProvider theme={theme}>
      <AppStoreProvider store={store}>{children}</AppStoreProvider>
    </MantineProvider>
  );
};
