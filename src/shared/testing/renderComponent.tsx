import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import type { StoreApi } from 'zustand/vanilla';
import { AppProviders } from '../../app/providers/appProviders';
import type { AppState } from '../../app/store/appStore';
import { createAppStore } from '../../app/store/appStore';
import testI18n from './i18n';

type RenderComponentOptions = {
  store?: StoreApi<AppState>;
};

function renderComponent(sut: ReactNode, options: RenderComponentOptions = {}) {
  const user = userEvent.setup();
  const store = options.store ?? createAppStore({ persist: false });

  return {
    user,
    ...render(
      <I18nextProvider i18n={testI18n}>
        <AppProviders store={store}>{sut}</AppProviders>
      </I18nextProvider>,
    ),
  };
}

export default renderComponent;
