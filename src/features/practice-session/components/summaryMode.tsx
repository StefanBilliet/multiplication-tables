import { Group } from "@mantine/core";
import type { FC } from "react";
import type { PracticeFlow as PracticeFlowType } from "../models/practiceFlow";
import BackToTablesButton from "./backToTablesButton";
import CompletedPracticeSessionSummary from "./completedPracticeSessionSummary";

type SummaryModeProps = {
  session: PracticeFlowType;
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
