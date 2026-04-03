import { Card, Center, Stack, Text, Title } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ActiveSessionMode from './activeSessionMode';
import CurrentQuestionPrompt from './currentQuestionPrompt';
import derivePracticeProgress from './derivePracticeProgress';
import PracticeProgress from './practiceProgress';
import SummaryMode from './summaryMode';
import classes from './testScreen.module.css';
import useTestQuestionSource from './useTestQuestionSource';
import useTestSession from './useTestSession';

const TestScreen: FC = () => {
  const { t } = useTranslation();
  const questionSequence = useTestQuestionSource();
  const { session, continueSession, checkAnswer, selectAnswer, resetSession } = useTestSession(questionSequence);
  const currentQuestion = session.kind === 'currentQuestion' ? session.currentQuestion : null;

  return (
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Stack>
          <Stack gap="xs">
            <Title order={1}>{t('testSection.title')}</Title>
            <Text c="dimmed">{t('testSection.description')}</Text>
          </Stack>

          {session.kind === 'sessionComplete' ? (
            <SummaryMode session={session} totalQuestionCount={20} />
          ) : (
            <>
              <CurrentQuestionPrompt
                multiplier={currentQuestion?.multiplier ?? 1}
                onHesitationElapsed={resetSession}
                resetSignal="test-mode"
                table={currentQuestion?.table ?? 1}
              />
              <ActiveSessionMode
                session={session}
                onCheckAnswer={checkAnswer}
                onContinue={continueSession}
                onSelectAnswer={selectAnswer}
              />
              <PracticeProgress {...derivePracticeProgress(session)} />
            </>
          )}
        </Stack>
      </Card>
    </Center>
  );
};

export default TestScreen;
