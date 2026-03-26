import { Group, Stack } from "@mantine/core";
import type { FC } from "react";
import type { PracticeFlow as PracticeFlowType } from "../models/practiceFlow";
import classes from "./activeSessionMode.module.css";
import AnswerPad from "./answerPad";
import BackToTablesButton from "./backToTablesButton";
import CheckAnswerButton from "./checkAnswerButton";
import ContinueButton from "./continueButton";
import CurrentQuestionPrompt from "./currentQuestionPrompt";
import useActiveSessionViewModel from "./useActiveSessionViewModel";

type ActiveSessionModeProps = {
  isHesitationRuleEnabled?: boolean;
  hesitationTimerResetSignal?: string;
  onHesitationElapsed: () => void;
  session: PracticeFlowType;
  selectedTable: number;
  onCheckAnswer: () => void;
  onContinue: () => void;
  onSelectAnswer: (answer: number) => void;
};

const ActiveSessionMode: FC<ActiveSessionModeProps> = ({
  session,
  selectedTable,
  onCheckAnswer,
  onContinue,
  onHesitationElapsed,
  isHesitationRuleEnabled = false,
  hesitationTimerResetSignal,
  onSelectAnswer,
}) => {
  const viewModel = useActiveSessionViewModel(session);
  const isHesitationTimerEnabled =
    isHesitationRuleEnabled && !viewModel.hasCorrectFeedback;

  return (
    <Stack className={classes.content}>
      <CurrentQuestionPrompt
        isHesitationRuleEnabled={isHesitationTimerEnabled}
        resetSignal={hesitationTimerResetSignal}
        onHesitationElapsed={onHesitationElapsed}
        multiplier={viewModel.multiplier}
        table={selectedTable}
      />

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
          <CheckAnswerButton
            disabled={!viewModel.canCheck}
            onClick={onCheckAnswer}
          />
        )}
      </Group>
    </Stack>
  );
};

export default ActiveSessionMode;
