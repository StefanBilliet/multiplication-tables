import { Temporal } from '@js-temporal/polyfill';
import { within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createAppStore } from '../../../app/store/appStore';
import { sessionCompletedEventFactory } from '../../../shared/testing/factories/sessionCompletedEventFactory';
import { testSessionCompletedEventFactory } from '../../../shared/testing/factories/testSessionCompletedEventFactory';
import renderComponent from '../../../shared/testing/renderComponent';
import PracticeHistoryScreen from '../../components/practiceHistoryScreen.tsx';

describe('PracticeHistoryScreen', () => {
  test('GIVEN no sessions are provided WHEN the screen renders THEN it shows the empty state message', () => {
    const store = createAppStore({ persist: false });

    const { getByRole } = renderComponent(
      <MemoryRouter initialEntries={['/practice-history']}>
        <Routes>
          <Route path="/practice-history" element={<PracticeHistoryScreen />} />
        </Routes>
      </MemoryRouter>,
      { store },
    );

    const emptyTitle = within(getByRole('alert')).getByText('No sessions yet');
    expect(emptyTitle).toBeInTheDocument();

    const emptyMessage = within(getByRole('alert')).getByText(
      'Your practice and test history will appear here, once you completed your first session.',
    );
    expect(emptyMessage).toBeInTheDocument();
  });

  test('GIVEN sessions are provided WHEN the screen renders THEN it shows the newest session first', () => {
    const store = createAppStore({ persist: false });
    store.setState({
      sessionCompletedEvents: [
        sessionCompletedEventFactory.build({
          table: 3,
          firstTryCorrectAnswerCount: 10,
          hasEarnedReward: false,
          timestamp: Temporal.Instant.from('2026-03-25T16:45:00Z'),
        }),
        sessionCompletedEventFactory.build({
          table: 5,
          firstTryCorrectAnswerCount: 8,
          hasEarnedReward: true,
          timestamp: Temporal.Instant.from('2026-03-26T14:30:00Z'),
        }),
      ],
    });

    const { getAllByText } = renderComponent(
      <MemoryRouter initialEntries={['/practice-history']}>
        <Routes>
          <Route path="/practice-history" element={<PracticeHistoryScreen />} />
        </Routes>
      </MemoryRouter>,
      { store },
    );

    const tableLabels = getAllByText(/times table/);
    expect(tableLabels[0]).toHaveTextContent('5 times table');
    expect(tableLabels[1]).toHaveTextContent('3 times table');
  });

  test('GIVEN rewarded and non-rewarded sessions WHEN the screen renders THEN only the rewarded score text is success-colored', () => {
    const store = createAppStore({ persist: false });
    store.setState({
      sessionCompletedEvents: [
        sessionCompletedEventFactory.build({
          firstTryCorrectAnswerCount: 8,
          hasEarnedReward: true,
        }),
        sessionCompletedEventFactory.build({
          firstTryCorrectAnswerCount: 6,
          hasEarnedReward: false,
        }),
      ],
    });

    const { getByText } = renderComponent(
      <MemoryRouter initialEntries={['/practice-history']}>
        <Routes>
          <Route path="/practice-history" element={<PracticeHistoryScreen />} />
        </Routes>
      </MemoryRouter>,
      { store },
    );

    expect(getByText('8 correct answers')).toHaveStyle({ color: 'var(--mantine-color-teal-text)' });
    expect(getByText('6 correct answers')).toHaveStyle({ color: 'var(--mantine-color-dimmed)' });
  });

  test('GIVEN practice and test sessions WHEN the screen renders THEN it shows test sessions mixed into the history', () => {
    const store = createAppStore({ persist: false });
    store.setState({
      sessionCompletedEvents: [
        sessionCompletedEventFactory.build({
          table: 3,
          firstTryCorrectAnswerCount: 10,
          hasEarnedReward: false,
          timestamp: Temporal.Instant.from('2026-03-25T16:45:00Z'),
        }),
      ],
      testSessionCompletedEvents: [
        testSessionCompletedEventFactory.build({
          firstTryCorrectAnswerCount: 15,
          hasEarnedReward: true,
          timestamp: Temporal.Instant.from('2026-03-26T14:30:00Z'),
        }),
      ],
    });

    const { getByText } = renderComponent(
      <MemoryRouter initialEntries={['/practice-history']}>
        <Routes>
          <Route path="/practice-history" element={<PracticeHistoryScreen />} />
        </Routes>
      </MemoryRouter>,
      { store },
    );

    expect(getByText('Mixed tables test')).toBeVisible();
    expect(getByText('Test')).toBeVisible();
  });
});
