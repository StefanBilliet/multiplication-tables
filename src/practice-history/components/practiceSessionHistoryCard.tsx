import { Text } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { SessionCompletedEvent } from '../state/sessionHistorySlice';
import SessionHistoryCard from './sessionHistoryCard';

type PracticeSessionHistoryCardProps = {
  session: SessionCompletedEvent;
};

const PracticeSessionHistoryCard: FC<PracticeSessionHistoryCardProps> = ({ session }) => {
  const { t } = useTranslation();

  return (
    <SessionHistoryCard
      timestamp={session.timestamp}
      hasEarnedReward={session.hasEarnedReward}
      score={session.firstTryCorrectAnswerCount}
    >
      <Text size="xl" fw={700} c="gray.8">
        {t('practiceHistory.tableLabel', { table: session.table })}
      </Text>
    </SessionHistoryCard>
  );
};

export default PracticeSessionHistoryCard;
