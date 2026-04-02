import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import testI18n from '../../../shared/testing/i18n';
import renderWithRouter from '../../../shared/testing/renderWithRouter.tsx';
import TestScreen from '../../components/testScreen';

vi.mock('../../components/useTestQuestionSource', () => ({
  default: () =>
    Array.from({ length: 20 }, (_, index) => ({
      table: 2,
      multiplier: index + 1,
    })),
}));

test('GIVEN test mode is opened, WHEN the screen renders, THEN the first question and test title are shown', async () => {
  await testI18n.changeLanguage('en');

  renderWithRouter(<TestScreen />);

  expect(screen.getByRole('heading', { name: '20 random questions across unlocked tables' })).toBeVisible();
  expect(screen.getByText('1 x 2 = ?')).toBeVisible();
  expect(screen.getByRole('button', { name: /check answer/i })).toBeVisible();
});
