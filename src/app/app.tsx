import { Center, Loader } from '@mantine/core';
import { type FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { semanticColors } from '../platform/theme/semanticColors';
import TableSelection from '../table-selection/components/tableSelection';

const PracticeHistoryScreen = lazy(() => import('../practice-history/components/practiceHistoryScreen'));
const PracticeScreen = lazy(() => import('../practice-session/components/practiceScreen'));
const TestScreen = lazy(() => import('../practice-session/components/testScreen'));
const SettingsScreen = lazy(() => import('../settings/components/settingsScreen'));

const App: FC = () => {
  return (
    <Suspense
      fallback={
        <Center style={{ minHeight: '100vh' }}>
          <Loader color={semanticColors.primary} type="dots" />
        </Center>
      }
    >
      <Routes>
        <Route path="/" element={<TableSelection />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/practice-history" element={<PracticeHistoryScreen />} />
        <Route path="/test" element={<TestScreen />} />
        <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
      </Routes>
    </Suspense>
  );
};

export default App;
