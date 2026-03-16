import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import PracticeScreen from "../features/practice-session/components/practiceScreen";
import TableSelection from "../features/table-selection/components/tableSelection";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TableSelection />} />
      <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
    </Routes>
  );
};

export default App;
