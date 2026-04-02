import { screen } from '@testing-library/react';
import ReactConfetti from 'react-confetti';
import { vi } from 'vitest';
import renderComponent from '../../../shared/testing/renderComponent';
import CompletedPracticeSessionSummary from '../../components/completedPracticeSessionSummary';
import type { PracticeFlow } from '../../models/practiceFlow';

vi.mock('../../../app/hooks/useLifetimeRewardTotal', () => ({
  default: () => ({
    addReward: vi.fn(),
    lifetimeRewardTotal: 6,
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test('GIVEN a completed qualifying session, WHEN the completed summary is rendered, THEN it shows the earned reward summary', () => {
  const session: PracticeFlow = {
    kind: 'sessionComplete',
    firstTryCorrectAnswerCount: 7,
    hasEarnedReward: true,
    multiplicationErrors: [],
  };

  renderComponent(<CompletedPracticeSessionSummary session={session} />);

  expect(screen.getByText('You earned 1 reward')).toBeVisible();
  expect(screen.getByText('6 total rewards')).toBeVisible();
});

test('GIVEN a completed non-qualifying session, WHEN the completed summary is rendered, THEN it shows the plain session summary', () => {
  const session: PracticeFlow = {
    kind: 'sessionComplete',
    firstTryCorrectAnswerCount: 6,
    hasEarnedReward: false,
    multiplicationErrors: [],
  };

  renderComponent(<CompletedPracticeSessionSummary session={session} totalQuestionCount={20} />);

  expect(screen.queryByText('You earned 1 reward')).not.toBeInTheDocument();
  expect(screen.getByText('6 correct answers')).toBeVisible();
  expect(screen.getByText('Great work. You answered 6 out of 20 questions correctly.')).toBeVisible();
});

test('GIVEN a completed qualifying session, WHEN the completed summary is rendered, THEN confetti is triggered', () => {
  const session: PracticeFlow = {
    kind: 'sessionComplete',
    firstTryCorrectAnswerCount: 7,
    hasEarnedReward: true,
    multiplicationErrors: [],
  };

  renderComponent(<CompletedPracticeSessionSummary session={session} />);

  expect(ReactConfetti).toHaveBeenCalledWith(
    expect.objectContaining({
      recycle: false,
      numberOfPieces: 200,
    }),
    undefined,
  );
});

test('GIVEN a completed non-qualifying session, WHEN the completed summary is rendered, THEN confetti is not triggered', () => {
  const session: PracticeFlow = {
    kind: 'sessionComplete',
    firstTryCorrectAnswerCount: 6,
    hasEarnedReward: false,
    multiplicationErrors: [],
  };

  renderComponent(<CompletedPracticeSessionSummary session={session} />);

  expect(ReactConfetti).not.toHaveBeenCalled();
});
