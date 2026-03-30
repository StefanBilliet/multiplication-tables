import { screen } from '@testing-library/react';
import renderComponent from '../../../shared/testing/renderComponent.tsx';
import { OrderSetting } from '../../components/orderSetting/orderSetting.tsx';
import './useDutchLocale.ts';

test('GIVEN structured is selected, WHEN the order setting renders, THEN the structured radio is checked', () => {
  renderComponent(<OrderSetting currentMode="structured" onChange={vi.fn()} />);

  expect(screen.getByRole('radio', { name: 'In volgorde' })).toBeChecked();
  expect(screen.getByRole('radio', { name: 'Willekeurig' })).not.toBeChecked();
});

test('GIVEN a user selects the varied option, WHEN the order setting changes, THEN it calls back with varied', async () => {
  const onChange = vi.fn();
  const { user } = renderComponent(<OrderSetting currentMode="structured" onChange={onChange} />);

  await user.click(screen.getByRole('radio', { name: 'Willekeurig' }));

  expect(onChange).toHaveBeenCalledWith('varied');
});
