import { screen } from '@testing-library/react';
import renderComponent from '../../../../shared/testing/renderComponent.tsx';
import HesitationRuleOption from '../hesitationRuleOption.tsx';
import classes from '../settingsScreen.module.css';

test('GIVEN the hesitation rule option is enabled, THEN it shows the selected state', () => {
  renderComponent(<HesitationRuleOption isEnabled={true} onToggle={vi.fn()} />);

  const optionCard = screen.getByRole('checkbox').closest('label');

  expect(screen.getByRole('checkbox')).toBeChecked();
  expect(optionCard).toHaveClass(classes.optionCardSelected);
  expect(screen.getByText(/Selected/i)).toBeVisible();
});

test('GIVEN the hesitation rule option is disabled, THEN it shows the unselected state', () => {
  renderComponent(<HesitationRuleOption isEnabled={false} onToggle={vi.fn()} />);

  const optionCard = screen.getByRole('checkbox').closest('label');

  expect(screen.getByRole('checkbox')).not.toBeChecked();
  expect(optionCard).not.toHaveClass(classes.optionCardSelected);
  expect(screen.queryByText(/Selected/i)).toBeNull();
});

test('GIVEN the hesitation rule option is clicked, THEN it calls the callback', async () => {
  const onToggle = vi.fn();
  const { user } = renderComponent(<HesitationRuleOption isEnabled={false} onToggle={onToggle} />);

  await user.click(screen.getByRole('checkbox'));

  expect(onToggle).toHaveBeenCalledWith(true);
});
