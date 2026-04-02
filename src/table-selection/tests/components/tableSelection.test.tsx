import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import testI18n from '../../../shared/testing/i18n';
import renderWithRouter from '../../../shared/testing/renderWithRouter';
import TableSelection from '../../components/tableSelection';

const useLifetimeRewardTotalMock = vi.fn();

vi.mock('../../../app/hooks/useLifetimeRewardTotal', () => ({
  default: () => useLifetimeRewardTotalMock(),
}));

beforeEach(() => {
  useLifetimeRewardTotalMock.mockReturnValue({
    addReward: vi.fn(),
    lifetimeRewardTotal: 46,
  });
});

test('GIVEN 46 lifetime rewards, WHEN the table selection is rendered, THEN all tables are available', () => {
  renderWithRouter(<TableSelection />);

  expect(screen.getAllByRole('button', { name: 'Start practice' })).toHaveLength(10);
});

test('GIVEN 4 lifetime rewards, WHEN the table selection is rendered, THEN the first three tables are available', () => {
  useLifetimeRewardTotalMock.mockReturnValue({
    addReward: vi.fn(),
    lifetimeRewardTotal: 4,
  });

  renderWithRouter(<TableSelection />);

  expect(screen.getAllByRole('button', { name: 'Start practice' })).toHaveLength(3);
  expect(screen.getByRole('heading', { name: '4 times table' })).toBeVisible();
  expect(screen.getAllByRole('button', { name: 'Locked for now' })).toHaveLength(7);
});

test('GIVEN only the first table is unlocked, WHEN the table selection is rendered, THEN test mode is hidden', () => {
  useLifetimeRewardTotalMock.mockReturnValue({
    addReward: vi.fn(),
    lifetimeRewardTotal: 0,
  });

  renderWithRouter(<TableSelection />);

  expect(screen.queryByRole('button', { name: 'Start test mode' })).not.toBeInTheDocument();
});

test('GIVEN Dutch is the active language, WHEN the table selection is rendered, THEN visible table-selection text is shown in Dutch', async () => {
  await testI18n.changeLanguage('nl');

  renderWithRouter(<TableSelection />);

  expect(screen.getByRole('heading', { name: 'Kies een tafel om te oefenen' })).toBeVisible();
  expect(screen.getAllByRole('button', { name: 'Start oefenen' })).toHaveLength(10);
  expect(screen.queryByText('1 times table')).not.toBeInTheDocument();
});

test('GIVEN the table selection is rendered, WHEN clicking Start test mode, THEN navigate to /test', async () => {
  await testI18n.changeLanguage('en');

  const sut = (
    <Routes>
      <Route path="/test" element={<div>Test mode screen</div>} />
      <Route path="/" element={<TableSelection />} />
    </Routes>
  );
  const { user } = renderWithRouter(sut);

  await user.click(screen.getByRole('button', { name: 'Start test mode' }));

  expect(screen.getByText('Test mode screen')).toBeVisible();
});
