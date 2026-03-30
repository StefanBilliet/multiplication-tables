import { screen } from '@testing-library/react';
import renderComponent from '../../../shared/testing/renderComponent.tsx';
import OrderOption from '../../components/orderSetting/orderOption.tsx';
import './useDutchLocale.ts';

test('GIVEN a selected structured option, WHEN it renders, THEN it shows the option content and selected badge', () => {
  renderComponent(
    <OrderOption
      isSelected
      title="In volgorde"
      description="Vragen volgen de tafelvolgorde."
      mode="structured"
      modeLabel="Op volgorde"
      onSelect={vi.fn()}
    />,
  );

  expect(screen.getByRole('radio', { name: 'In volgorde' })).toBeChecked();
  expect(screen.getByRole('heading', { name: 'In volgorde' })).toBeVisible();
  expect(screen.getByText('Vragen volgen de tafelvolgorde.')).toBeVisible();
  expect(screen.getByText('Op volgorde')).toBeVisible();
  expect(screen.getByText('Geselecteerd')).toBeVisible();
});

test('GIVEN an unselected varied option, WHEN it renders, THEN it shows the varied mode label', () => {
  renderComponent(
    <OrderOption
      isSelected={false}
      title="Willekeurig"
      description="Vragen verschijnen in een andere volgorde."
      mode="varied"
      modeLabel="Gemengd"
      onSelect={vi.fn()}
    />,
  );

  expect(screen.getByRole('radio', { name: 'Willekeurig' })).not.toBeChecked();
  expect(screen.getByRole('heading', { name: 'Willekeurig' })).toBeVisible();
  expect(screen.getByText('Vragen verschijnen in een andere volgorde.')).toBeVisible();
  expect(screen.getByText('Gemengd')).toBeVisible();
  expect(screen.queryByText('Geselecteerd')).not.toBeInTheDocument();
});
