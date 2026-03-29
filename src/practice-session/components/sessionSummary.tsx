import { Paper, Stack, Text, Title } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { semanticColors, semanticColorVars } from '../../platform/theme/semanticColors';
import classes from './sessionSummary.module.css';

type SessionSummaryProps = {
  correctAnswerCount: number;
  totalQuestionCount?: number;
};

const SessionSummary: FC<SessionSummaryProps> = ({ correctAnswerCount, totalQuestionCount = 10 }) => {
  const { t } = useTranslation();

  return (
    <Paper radius="xl" bg={semanticColorVars.successSoft} withBorder className={classes.panel}>
      <Stack>
        <Text size="sm" tt="uppercase" fw={700} c={semanticColors.success}>
          {t('practiceSession.sessionSummary.title')}
        </Text>
        <Title order={2}>{t('practiceSession.sessionSummary.completedTitle')}</Title>
        <Text size="xl" fw={700} c={semanticColors.success}>
          {t('practiceSession.sessionSummary.correctAnswers', {
            correctAnswerCount,
          })}
        </Text>
        <Text c="dimmed">
          {t('practiceSession.sessionSummary.description', {
            correctAnswerCount,
            totalQuestionCount,
          })}
        </Text>
      </Stack>
    </Paper>
  );
};

export default SessionSummary;
