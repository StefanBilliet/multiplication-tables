import { Card, Stack, Text } from '@mantine/core';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { semanticColors } from '../../platform/theme/semanticColors';
import classes from './practiceHistoryScreen.module.css';
import SessionTimestamp from './sessionTimestamp.tsx';

type SessionHistoryCardProps = {
  timestamp: Parameters<typeof SessionTimestamp>[0]['timestamp'];
  hasEarnedReward: boolean;
  score: number;
  children: ReactNode;
};

const SessionHistoryCard: FC<SessionHistoryCardProps> = ({ timestamp, hasEarnedReward, score, children }) => {
  const { t } = useTranslation();

  return (
    <Card withBorder radius="lg" className={classes.sessionCard}>
      <Stack>
        <SessionTimestamp timestamp={timestamp} />
        {children}
        <Text size="sm" c={hasEarnedReward ? semanticColors.success : 'dimmed'}>
          {t('practiceHistory.scoreLabel', {
            score,
          })}
        </Text>
      </Stack>
    </Card>
  );
};

export default SessionHistoryCard;
