import { Center, Loader } from '@mantine/core';
import { type FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import TableSelection from '../features/table-selection/components/tableSelection';
import { semanticColors } from '../theme/semanticColors';

const PracticeHistoryScreen = lazy(() => import('../features/practice-history/components/practiceHistoryScreen'));
const PracticeScreen = lazy(() => import('../features/practice-session/components/practiceScreen'));
const SettingsScreen = lazy(() => import('../features/settings/components/settingsScreen'));

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
        <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
      </Routes>
    </Suspense>
  );
};

export default App;
