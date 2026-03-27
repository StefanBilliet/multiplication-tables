import { Card, createTheme, MantineProvider } from '@mantine/core';
import type { FC, PropsWithChildren } from 'react';
import { AppStoreProvider } from '../../shared/store/appStore';
import { semanticColors } from '../../theme/semanticColors';

const theme = createTheme({
  primaryColor: semanticColors.primary,
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  components: {
    Card: Card.extend({
      defaultProps: {
        radius: 'xl',
        padding: 'xl',
        shadow: 'md',
      },
      styles: (_theme, props) => ({
        root:
          props.variant === 'shell'
            ? {
                border: '1px solid var(--app-color-neutral-border)',
                background: 'var(--app-color-neutral-surface)',
                backdropFilter: 'blur(16px)',
              }
            : {},
      }),
    }),
  },
});

export const AppProviders: FC<PropsWithChildren<{ store?: Parameters<typeof AppStoreProvider>[0]['store'] }>> = ({
  children,
  store,
}) => {
  return (
    <MantineProvider theme={theme}>
      <AppStoreProvider store={store}>{children}</AppStoreProvider>
    </MantineProvider>
  );
};
