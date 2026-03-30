import { act } from 'react';
import testI18n from '../../../shared/testing/i18n';

beforeAll(async () => {
  await act(async () => {
    await testI18n.changeLanguage('nl');
  });
});

afterAll(async () => {
  await act(async () => {
    await testI18n.changeLanguage('en');
  });
});
