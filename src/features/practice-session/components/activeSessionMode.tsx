import { Group, Stack } from "@mantine/core";
import type { FC } from "react";
import type { PracticeFlow as PracticeFlowType } from "../models/practiceFlow";
import PracticeFlow from "../models/practiceFlow";
import AnswerPad from "./answerPad";
import BackToTablesButton from "./backToTablesButton";
import CheckAnswerButton from "./checkAnswerButton";
import ContinueButton from "./continueButton";
import CurrentQuestionPrompt from "./currentQuestionPrompt";

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
  const answerOptions = PracticeFlow.getAnswerOptions(session);
  const feedbackAnimation = PracticeFlow.feedbackAnimation(session);
  const hasCorrectFeedback = PracticeFlow.hasCorrectFeedback(session);
  const selectedAnswer = PracticeFlow.selectedAnswer(session);
  const feedbackState = PracticeFlow.feedbackState(session);

  return (
    <>
      <CurrentQuestionPrompt
        multiplier={
          session.kind === "currentQuestion"
            ? session.currentQuestion.multiplier
            : 1
        }
        table={selectedTable}
      />

      <Stack gap="md">
        <AnswerPad
          answerOptions={answerOptions}
          feedbackAnimation={feedbackAnimation}
          feedbackState={feedbackState}
          hasCorrectFeedback={hasCorrectFeedback}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
        />
      </Stack>

      <Group justify="space-between">
        <BackToTablesButton />

        {hasCorrectFeedback ? (
          <ContinueButton onClick={onContinue} />
        ) : (
          <CheckAnswerButton
            disabled={!PracticeFlow.canCheck(session)}
            onClick={onCheckAnswer}
          />
        )}
      </Group>
    </>
  );
};

export default ActiveSessionMode;
