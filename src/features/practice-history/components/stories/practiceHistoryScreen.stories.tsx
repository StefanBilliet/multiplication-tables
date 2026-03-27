import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PracticeHistoryScreen from '../practiceHistoryScreen.tsx';

const meta = {
  title: 'Practice History/PracticeHistoryScreen',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const mockSessions = [
  {
    table: 5,
    firstTryCorrectAnswerCount: 8,
    timestamp: '2026-03-26 14:30',
  },
  {
    table: 3,
    firstTryCorrectAnswerCount: 10,
    timestamp: '2026-03-25 16:45',
  },
  {
    table: 7,
    firstTryCorrectAnswerCount: 6,
    timestamp: '2026-03-24 10:15',
  },
  {
    table: 9,
    firstTryCorrectAnswerCount: 9,
    timestamp: '2026-03-23 09:00',
  },
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
