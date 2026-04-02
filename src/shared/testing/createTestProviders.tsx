import type { FC, PropsWithChildren } from 'react';
import { AppProviders } from '../../app/providers/appProviders';
import { type AppStore, createAppStore } from '../../app/store/appStore';

type CreateTestProvidersOptions = {
  store?: AppStore;
};

export const createTestProviders = ({
  store = createAppStore({ persist: false }),
}: CreateTestProvidersOptions = {}) => {
  const TestProviders: FC<PropsWithChildren> = ({ children }) => <AppProviders store={store}>{children}</AppProviders>;

  return { TestProviders, store };
};
