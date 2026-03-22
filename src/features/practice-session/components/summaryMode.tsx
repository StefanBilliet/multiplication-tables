import { Group, Stack } from "@mantine/core";
import type { FC } from "react";
import type { PracticeFlow as PracticeFlowType } from "../models/practiceFlow";
import BackToTablesButton from "./backToTablesButton";
import CompletedPracticeSessionSummary from "./completedPracticeSessionSummary";
import classes from "./summaryMode.module.css";

type SummaryModeProps = {
  session: PracticeFlowType;
};

const SummaryMode: FC<SummaryModeProps> = ({ session }) => (
  <Stack className={classes.content}>
    <CompletedPracticeSessionSummary session={session} />

    <Group component="footer">
      <BackToTablesButton />
    </Group>
  </Stack>
);

export default SummaryMode;
