import { within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  type SessionCompletedEventView,
  sessionCompletedEventFactory,
} from '../../../../shared/testing/factories/sessionCompletedEventFactory';
import renderComponent from '../../../../shared/testing/renderComponent';
import PracticeHistoryScreen from '../practiceHistoryScreen.tsx';

describe('PracticeHistoryScreen', () => {
  test('GIVEN no sessions are provided WHEN the screen renders THEN it shows the empty state message', () => {
    const sessions: SessionCompletedEventView[] = [];

    const { getByRole } = renderComponent(
      <MemoryRouter initialEntries={['/practice-history']}>
        <Routes>
          <Route path="/practice-history" element={<PracticeHistoryScreen sessions={sessions} />} />
        </Routes>
      </MemoryRouter>,
    );

    const emptyTitle = within(getByRole('alert')).getByText('No sessions yet');
    expect(emptyTitle).toBeInTheDocument();

    const emptyMessage = within(getByRole('alert')).getByText(
      'Your practice history will appear here, once you completed your first practice session.',
    );
    expect(emptyMessage).toBeInTheDocument();
  });

  test('GIVEN sessions are provided WHEN the screen renders THEN it shows the newest session first', () => {
    const sessions = [
      sessionCompletedEventFactory.build({
        table: 3,
        firstTryCorrectAnswerCount: 10,
        timestamp: '2026-03-25T16:45:00Z',
      }),
      sessionCompletedEventFactory.build({
        table: 5,
        firstTryCorrectAnswerCount: 8,
        timestamp: '2026-03-26T14:30:00Z',
      }),
    ];

    const { getAllByText } = renderComponent(
      <MemoryRouter initialEntries={['/practice-history']}>
        <Routes>
          <Route path="/practice-history" element={<PracticeHistoryScreen sessions={sessions} />} />
        </Routes>
      </MemoryRouter>,
    );

    const tableLabels = getAllByText(/times table/);
    expect(tableLabels[0]).toHaveTextContent('5 times table');
    expect(tableLabels[1]).toHaveTextContent('3 times table');
  });

  test('GIVEN rewarded and non-rewarded sessions WHEN the screen renders THEN only the rewarded score text is green.6', () => {
    const sessions = [
      sessionCompletedEventFactory.build({
        firstTryCorrectAnswerCount: 8,
        hasEarnedReward: true,
      }),
      sessionCompletedEventFactory.build({
        firstTryCorrectAnswerCount: 6,
        hasEarnedReward: false,
      }),
    ];

    const { getByText } = renderComponent(
      <MemoryRouter initialEntries={['/practice-history']}>
        <Routes>
          <Route path="/practice-history" element={<PracticeHistoryScreen sessions={sessions} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(getByText('8 correct answers')).toHaveStyle({ color: 'var(--mantine-color-green-6)' });
    expect(getByText('6 correct answers')).toHaveStyle({ color: 'var(--mantine-color-dimmed)' });
  });
});
