import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
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
    timestamp: '2026-03-26T14:30:00Z',
    hasEarnedReward: true,
  }),
  sessionCompletedEventFactory.build({
    table: 3,
    firstTryCorrectAnswerCount: 10,
    timestamp: '2026-03-25T16:45:00Z',
    hasEarnedReward: true,
  }),
  sessionCompletedEventFactory.build({
    table: 7,
    firstTryCorrectAnswerCount: 6,
    timestamp: '2026-03-24T10:15:00Z',
    hasEarnedReward: false,
  }),
  sessionCompletedEventFactory.build({
    table: 9,
    firstTryCorrectAnswerCount: 9,
    timestamp: '2026-03-23T09:00:00Z',
    hasEarnedReward: true,
  }),
];

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/practice-history']}>
      <Routes>
        <Route path="/practice-history" element={<PracticeHistoryScreen sessions={mockSessions} />} />
      </Routes>
    </MemoryRouter>
  ),
};

export const Empty: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/practice-history']}>
      <Routes>
        <Route path="/practice-history" element={<PracticeHistoryScreen sessions={[]} />} />
      </Routes>
    </MemoryRouter>
  ),
};
