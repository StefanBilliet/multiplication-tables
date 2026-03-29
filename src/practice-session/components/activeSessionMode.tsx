import { Group, Stack } from '@mantine/core';
import type { FC } from 'react';
import type { PracticeFlow as PracticeFlowType } from '../models/practiceFlow';
import classes from './activeSessionMode.module.css';
import AnswerPad from './answerPad';
import BackToTablesButton from './backToTablesButton';
import CheckAnswerButton from './checkAnswerButton';
import ContinueButton from './continueButton';
import useActiveSessionViewModel from './useActiveSessionViewModel';

type ActiveSessionModeProps = {
  session: PracticeFlowType;
  onCheckAnswer: () => void;
  onContinue: () => void;
  onSelectAnswer: (answer: number) => void;
};

const ActiveSessionMode: FC<ActiveSessionModeProps> = ({ session, onCheckAnswer, onContinue, onSelectAnswer }) => {
  const viewModel = useActiveSessionViewModel(session);

  return (
    <Stack className={classes.content}>
      <AnswerPad
        answerOptions={viewModel.answerOptions}
        feedbackAnimation={viewModel.feedbackAnimation}
        feedbackState={viewModel.feedbackState}
        hasCorrectFeedback={viewModel.hasCorrectFeedback}
        selectedAnswer={viewModel.selectedAnswer}
        onSelectAnswer={onSelectAnswer}
      />

      <Group component="footer" className={classes.footerActions}>
        <BackToTablesButton />

        {viewModel.hasCorrectFeedback ? (
          <ContinueButton onClick={onContinue} />
        ) : (
          <CheckAnswerButton disabled={!viewModel.canCheck} onClick={onCheckAnswer} />
        )}
      </Group>
    </Stack>
  );
};

export default ActiveSessionMode;
