import type { FC } from "react";
import { useParams } from "react-router-dom";

const PracticeScreen: FC = () => {
  const { tableId } = useParams();

  return <main>Practice table {tableId}</main>;
};

export default PracticeScreen;
