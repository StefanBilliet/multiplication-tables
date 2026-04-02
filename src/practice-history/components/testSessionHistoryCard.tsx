import { Badge, Stack, Text } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { semanticColors } from '../../platform/theme/semanticColors';
import type { TestSessionCompletedEvent } from '../state/sessionHistorySlice';
import SessionHistoryCard from './sessionHistoryCard';

type TestSessionHistoryCardProps = {
  session: TestSessionCompletedEvent;
};

const TestSessionHistoryCard: FC<TestSessionHistoryCardProps> = ({ session }) => {
  const { t } = useTranslation();

  return (
    <SessionHistoryCard
      timestamp={session.timestamp}
      hasEarnedReward={session.hasEarnedReward}
      score={session.firstTryCorrectAnswerCount}
    >
      <Stack gap={4}>
        <Badge variant="light" color={semanticColors.info} size="sm">
          {t('practiceHistory.testLabel')}
        </Badge>
        <Text size="xl" fw={700} c="gray.8">
          {t('practiceHistory.mixedTablesLabel')}
        </Text>
      </Stack>
    </SessionHistoryCard>
  );
};

export default TestSessionHistoryCard;
