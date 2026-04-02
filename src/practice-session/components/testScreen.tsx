import { Card, Center, Stack, Text, Title } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import PracticeFlow from '../models/practiceFlow';
import ActiveSessionMode from './activeSessionMode';
import CurrentQuestionPrompt from './currentQuestionPrompt';
import SummaryMode from './summaryMode';
import useTestQuestionSource from './useTestQuestionSource';
import useTestSession from './useTestSession';

const TestScreen: FC = () => {
  const { t } = useTranslation();
  const questionSource = useTestQuestionSource();
  const { session, continueSession, checkAnswer, selectAnswer, resetSession } = useTestSession(questionSource);
  const currentQuestion = session.kind === 'currentQuestion' ? session.currentQuestion : null;

  return (
    <Center>
      <Card variant="shell">
        <Stack>
          <Stack gap="xs">
            <Title order={1}>{t('testSection.title')}</Title>
            <Text c="dimmed">{t('testSection.description')}</Text>
          </Stack>

          {PracticeFlow.isComplete(session) ? (
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
            </>
          )}
        </Stack>
      </Card>
    </Center>
  );
};

export default TestScreen;
