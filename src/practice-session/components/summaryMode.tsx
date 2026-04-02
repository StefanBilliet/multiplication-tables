import { Group, Stack } from '@mantine/core';
import type { FC } from 'react';
import type { PracticeFlow as PracticeFlowType } from '../models/practiceFlow';
import BackToTablesButton from './backToTablesButton';
import CompletedPracticeSessionSummary from './completedPracticeSessionSummary';
import classes from './summaryMode.module.css';

type SummaryModeProps = {
  session: PracticeFlowType;
  totalQuestionCount?: number;
};

const SummaryMode: FC<SummaryModeProps> = ({ session, totalQuestionCount }) => (
  <Stack className={classes.content}>
    <CompletedPracticeSessionSummary session={session} totalQuestionCount={totalQuestionCount} />

    <Group component="footer">
      <BackToTablesButton />
    </Group>
  </Stack>
);

export default SummaryMode;
