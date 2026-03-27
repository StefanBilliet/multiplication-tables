import { Alert, Badge, Card, Center, Group, Stack, Text, Title } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../../shared/i18n/languageSwitcher.tsx';
import BackButton from '../../../shared/navigation/backButton.tsx';
import { useAppStore } from '../../../shared/store/appStore';
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
          <Group component="header">
            <Stack>
              <Badge variant="light" color="teal">
                {t('practiceHistory.badge')}
              </Badge>

              <Title order={1}>{t('practiceHistory.title')}</Title>

              <Text c="dimmed">{t('practiceHistory.description')}</Text>
            </Stack>

            <Group>
              <LanguageSwitcher />
              <BackButton />
            </Group>
          </Group>

          <Card component="main" withBorder radius="xl">
            <Stack>
              {sessions.length === 0 ? (
                <Alert
                  variant="light"
                  color="blue"
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
                      <Text size="sm" c={session.hasEarnedReward ? 'teal.6' : 'dimmed'}>
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
