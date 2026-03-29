import { Alert, Card, Center, Stack, Text } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import BackButton from '../../app/components/backButton.tsx';
import LanguageSwitcher from '../../app/components/languageSwitcher.tsx';
import ScreenHeader from '../../app/components/screenHeader.tsx';
import { useAppStore } from '../../app/store/appStore';
import { semanticColors } from '../../platform/theme/semanticColors';
import classes from './practiceHistoryScreen.module.css';
import SessionTimestamp from './sessionTimestamp.tsx';

const PracticeHistoryScreen: FC = () => {
  const { t } = useTranslation();
  const sessions = useAppStore((state) => state.sessionCompletedEvents);
  const sortedSessions = sessions.toSorted((left, right) =>
    right.timestamp.toString().localeCompare(left.timestamp.toString()),
  );

  return (
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Stack>
          <ScreenHeader
            badge={t('practiceHistory.badge')}
            title={t('practiceHistory.title')}
            description={t('practiceHistory.description')}
          >
            <LanguageSwitcher />
            <BackButton />
          </ScreenHeader>

          <Card component="main" withBorder radius="xl">
            <Stack>
              {sessions.length === 0 ? (
                <Alert
                  variant="light"
                  color={semanticColors.info}
                  radius="xl"
                  title={t('practiceHistory.emptyTitle')}
                  icon={<IconInfoCircle />}
                >
                  {t('practiceHistory.emptyMessage')}
                </Alert>
              ) : (
                sortedSessions.map((session) => (
                  <Card key={session.id} withBorder radius="lg" className={classes.sessionCard}>
                    <Stack>
                      <SessionTimestamp timestamp={session.timestamp} />
                      <Text size="xl" fw={700} c="gray.8">
                        {t('practiceHistory.tableLabel', { table: session.table })}
                      </Text>
                      <Text size="sm" c={session.hasEarnedReward ? semanticColors.success : 'dimmed'}>
                        {t('practiceHistory.scoreLabel', {
                          score: session.firstTryCorrectAnswerCount,
                        })}
                      </Text>
                    </Stack>
                  </Card>
                ))
              )}
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Center>
  );
};

export default PracticeHistoryScreen;
