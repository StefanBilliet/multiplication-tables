import { Badge, Group, Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { semanticColors, semanticColorVars } from '../../platform/theme/semanticColors';
import Celebration from './celebration';
import classes from './rewardEarnedSummary.module.css';
import SessionSummary from './sessionSummary';

type RewardEarnedSummaryProps = {
  correctAnswerCount: number;
  lifetimeRewardTotal: number;
};

const RewardEarnedSummary: FC<RewardEarnedSummaryProps> = ({ correctAnswerCount, lifetimeRewardTotal }) => {
  const { t } = useTranslation();

  return (
    <>
      <Celebration />
      <Stack className={classes.content}>
        <Paper radius="xl" bg={semanticColorVars.rewardSoft} withBorder className={classes.rewardPanel}>
          <Group component="section">
            <Group wrap="nowrap">
              <ThemeIcon size="xl" radius="xl" color={semanticColors.reward}>
                <Text fw={700}>+1</Text>
              </ThemeIcon>
              <Stack>
                <Title order={3}>{t('practiceSession.rewardEarned.title')}</Title>
                <Text c="dimmed">{t('practiceSession.rewardEarned.description')}</Text>
              </Stack>
            </Group>
            <Badge variant="filled" color={semanticColors.primary} size="lg" radius="xl">
              {t('practiceSession.rewardEarned.totalRewards', {
                lifetimeRewardTotal,
              })}
            </Badge>
          </Group>
        </Paper>

        <SessionSummary correctAnswerCount={correctAnswerCount} />
      </Stack>
    </>
  );
};

export default RewardEarnedSummary;
