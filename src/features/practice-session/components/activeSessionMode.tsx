import { Group, Stack } from "@mantine/core";
import type { FC } from "react";
import type { PracticeFlow as PracticeFlowType } from "../models/practiceFlow";
import AnswerPad from "./answerPad";
import BackToTablesButton from "./backToTablesButton";
import CheckAnswerButton from "./checkAnswerButton";
import ContinueButton from "./continueButton";
import CurrentQuestionPrompt from "./currentQuestionPrompt";
import useActiveSessionViewModel from "./useActiveSessionViewModel";

type ActiveSessionModeProps = {
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
  onSelectAnswer,
}) => {
  const viewModel = useActiveSessionViewModel(session);

  return (
    <>
      <CurrentQuestionPrompt
        multiplier={viewModel.multiplier}
        table={selectedTable}
      />

      <Stack gap="md">
        <AnswerPad
          answerOptions={viewModel.answerOptions}
          feedbackAnimation={viewModel.feedbackAnimation}
          feedbackState={viewModel.feedbackState}
          hasCorrectFeedback={viewModel.hasCorrectFeedback}
          selectedAnswer={viewModel.selectedAnswer}
          onSelectAnswer={onSelectAnswer}
        />
      </Stack>

      <Group justify="space-between">
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
    </>
  );
};

export default ActiveSessionMode;
