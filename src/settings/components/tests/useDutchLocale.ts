import { act } from 'react';
import i18n from '../../../platform/i18n';

beforeAll(async () => {
  await act(async () => {
    await i18n.changeLanguage('nl');
  });
});

afterAll(async () => {
  await act(async () => {
    await i18n.changeLanguage('en');
  });
});
