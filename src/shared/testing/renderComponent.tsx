import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import type { StoreApi } from 'zustand/vanilla';
import { AppProviders } from '../../app/providers/appProviders';
import type { AppState } from '../../app/store/appStore';
import { createAppStore } from '../../app/store/appStore';

type RenderComponentOptions = {
  store?: StoreApi<AppState>;
};

function renderComponent(sut: ReactNode, options: RenderComponentOptions = {}) {
  const user = userEvent.setup();
  const store = options.store ?? createAppStore({ persist: false });

  return {
    user,
    ...render(<AppProviders store={store}>{sut}</AppProviders>),
  };
}

export default renderComponent;
