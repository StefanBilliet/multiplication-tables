import { Card, Center, Progress, Stack } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../../app/store/appStore';
import PracticeFlow from '../models/practiceFlow';
import ActiveSessionMode from './activeSessionMode';
import CurrentQuestionPrompt from './currentQuestionPrompt';
import Header from './header';
import classes from './practiceScreen.module.css';
import SummaryMode from './summaryMode';
import useActiveSessionViewModel from './useActiveSessionViewModel';
import usePracticeSession from './usePracticeSession';
import useQuestionSource from './useQuestionSource';

const PracticeScreen: FC = () => {
  const { tableId } = useParams();
  const { t } = useTranslation();
  const selectedTable = Number(tableId);
  const isHesitationRuleEnabled = useAppStore((state) => state.isHesitationRuleEnabled);
  const {
    session,
    hesitationTimerResetSignal,
    selectAnswer: handleSelectAnswer,
    checkAnswer: handleCheckAnswer,
    continueSession: handleContinue,
    resetSession: handleReset,
  } = usePracticeSession(selectedTable, useQuestionSource);
  const activeSessionViewModel = useActiveSessionViewModel(session);
  const isHesitationTimerEnabled = isHesitationRuleEnabled && !activeSessionViewModel.hasCorrectFeedback;

  return (
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Header
          description={PracticeFlow.isComplete(session) ? t('practiceSession.header.completedDescription') : undefined}
          selectedTable={selectedTable}
        />

        {PracticeFlow.isComplete(session) ? (
          <SummaryMode session={session} />
        ) : (
          <Stack gap="xl">
            <CurrentQuestionPrompt
              isHesitationRuleEnabled={isHesitationTimerEnabled}
              multiplier={activeSessionViewModel.multiplier}
              onHesitationElapsed={handleReset}
              resetSignal={hesitationTimerResetSignal}
              table={selectedTable}
            />

            <ActiveSessionMode
              session={session}
              onCheckAnswer={handleCheckAnswer}
              onContinue={handleContinue}
              onSelectAnswer={handleSelectAnswer}
            />

            <div className={classes.progressFrame}>
              <Progress aria-label="Practice progress" className={classes.progressBar} value={60} />
            </div>
          </Stack>
        )}
      </Card>
    </Center>
  );
};

export default PracticeScreen;
