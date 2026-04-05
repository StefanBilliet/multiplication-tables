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
  const store = options.store ?? createAppStore({ persist: false });
  const rendered = render(
    <I18nextProvider i18n={testI18n}>
      <AppProviders store={store}>{sut}</AppProviders>
    </I18nextProvider>,
  );

  let user: ReturnType<typeof userEvent.setup> | undefined;

  return Object.defineProperty(rendered, 'user', {
    enumerable: true,
    get: () => {
      user ??= userEvent.setup();

      return user;
    },
  }) as typeof rendered & { user: ReturnType<typeof userEvent.setup> };
}

export default renderComponent;
