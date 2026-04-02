import { Alert, Card, Center, Stack } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import BackButton from '../../app/components/backButton.tsx';
import LanguageSwitcher from '../../app/components/languageSwitcher.tsx';
import ScreenHeader from '../../app/components/screenHeader.tsx';
import { semanticColors } from '../../platform/theme/semanticColors';
import usePracticeHistoryRecords from '../hooks/usePracticeHistoryRecords';
import classes from './practiceHistoryScreen.module.css';
import PracticeSessionHistoryCard from './practiceSessionHistoryCard';
import TestSessionHistoryCard from './testSessionHistoryCard';

const PracticeHistoryScreen: FC = () => {
  const { t } = useTranslation();
  const historyRecords = usePracticeHistoryRecords();

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
              {historyRecords.length === 0 ? (
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
                historyRecords.map((session) =>
                  session.kind === 'practice' ? (
                    <PracticeSessionHistoryCard key={session.id} session={session} />
                  ) : (
                    <TestSessionHistoryCard key={session.id} session={session} />
                  ),
                )
              )}
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Center>
  );
};

export default PracticeHistoryScreen;
