import { Temporal } from '@js-temporal/polyfill';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from '../../../../app/providers/appProviders';
import { createAppStore } from '../../../../shared/store/appStore';
import { sessionCompletedEventFactory } from '../../../../shared/testing/factories/sessionCompletedEventFactory';
import PracticeHistoryScreen from '../practiceHistoryScreen.tsx';

const meta = {
  title: 'Practice History/PracticeHistoryScreen',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const mockSessions = [
  sessionCompletedEventFactory.build({
    table: 5,
    firstTryCorrectAnswerCount: 8,
    timestamp: Temporal.Instant.from('2026-03-26T14:30:00Z'),
    hasEarnedReward: true,
  }),
  sessionCompletedEventFactory.build({
    table: 3,
    firstTryCorrectAnswerCount: 10,
    timestamp: Temporal.Instant.from('2026-03-25T16:45:00Z'),
    hasEarnedReward: true,
  }),
  sessionCompletedEventFactory.build({
    table: 7,
    firstTryCorrectAnswerCount: 6,
    timestamp: Temporal.Instant.from('2026-03-24T10:15:00Z'),
    hasEarnedReward: false,
  }),
  sessionCompletedEventFactory.build({
    table: 9,
    firstTryCorrectAnswerCount: 9,
    timestamp: Temporal.Instant.from('2026-03-23T09:00:00Z'),
    hasEarnedReward: true,
  }),
];

const defaultStore = createAppStore({ persist: false });
defaultStore.setState({ sessionCompletedEvents: mockSessions });

const emptyStore = createAppStore({ persist: false });

export const Default: Story = {
  render: () => (
    <AppProviders store={defaultStore}>
      <MemoryRouter initialEntries={['/practice-history']}>
        <Routes>
          <Route path="/practice-history" element={<PracticeHistoryScreen />} />
        </Routes>
      </MemoryRouter>
    </AppProviders>
  ),
};

export const Empty: Story = {
  render: () => (
    <AppProviders store={emptyStore}>
      <MemoryRouter initialEntries={['/practice-history']}>
        <Routes>
          <Route path="/practice-history" element={<PracticeHistoryScreen />} />
        </Routes>
      </MemoryRouter>
    </AppProviders>
  ),
};
