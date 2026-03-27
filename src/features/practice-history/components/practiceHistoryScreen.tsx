import { ActionIcon, Badge, Card, Center, Group, Stack, Text, Title } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../../../shared/i18n/languageSwitcher.tsx';
import classes from './practiceHistoryScreen.module.css';

type PracticeHistoryScreenProps = {
  sessions: Array<{
    table: number;
    firstTryCorrectAnswerCount: number;
    timestamp: string;
  }>;
};

const PracticeHistoryScreen: FC<PracticeHistoryScreenProps> = ({ sessions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
              <ActionIcon
                className={classes.backButton}
                radius="xl"
                aria-label={t('practiceHistory.backButtonLabel')}
                size="lg"
                onClick={() => navigate('/')}
              >
                <IconChevronLeft stroke={1.5} />
              </ActionIcon>
            </Group>
          </Group>

          <Card component="main" withBorder radius="xl">
            <Stack>
              {sessions.map((session) => (
                <Card key={session.timestamp} withBorder radius="lg" className={classes.sessionCard}>
                  <Stack>
                    <Text size="sm" c="dimmed">
                      {session.timestamp}
                    </Text>
                    <Text size="xl" fw={700} c="gray.8">
                      {t('practiceHistory.tableLabel', { table: session.table })}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {t('practiceHistory.scoreLabel', {
                        score: session.firstTryCorrectAnswerCount,
                      })}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Center>
  );
};

export default PracticeHistoryScreen;
