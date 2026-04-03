import { screen } from '@testing-library/react';
import renderComponent from '../../../shared/testing/renderComponent';
import PracticeProgress from '../../components/practiceProgress';

test.each([
  { currentQuestion: 1, expectedValue: '0', label: 'the bar is still empty' },
  { currentQuestion: 5, expectedValue: '44', label: 'the bar is around half full' },
  { currentQuestion: 10, expectedValue: '100', label: 'the whole bar is filled' },
])('GIVEN question $currentQuestion of 10, WHEN the practice progress is rendered, THEN $label', ({
  currentQuestion,
  expectedValue,
}) => {
  renderComponent(<PracticeProgress currentQuestion={currentQuestion} questionCount={10} />);

  expect(screen.getByRole('progressbar')).toBeVisible();
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', expectedValue);
});
