import { Group } from "@mantine/core";
import type { FC } from "react";
import type { PracticeSession as PracticeSessionType } from "../models/practiceSession";
import BackToTablesButton from "./backToTablesButton";
import CompletedPracticeSessionSummary from "./completedPracticeSessionSummary";

type SummaryModeProps = {
  session: PracticeSessionType;
};

const SummaryMode: FC<SummaryModeProps> = ({ session }) => (
  <>
    <CompletedPracticeSessionSummary session={session} />

    <Group justify="space-between">
      <BackToTablesButton />
    </Group>
  </>
);

export default SummaryMode;
