import { Group, Stack } from "@mantine/core";
import type { FC } from "react";
import type { PracticeSession as PracticeSessionType } from "../models/practiceSession";
import PracticeSession from "../models/practiceSession";
import AnswerPad from "./answerPad";
import BackToTablesButton from "./backToTablesButton";
import CheckAnswerButton from "./checkAnswerButton";
import ContinueButton from "./continueButton";
import CurrentQuestionPrompt from "./currentQuestionPrompt";

type ActiveSessionModeProps = {
  session: PracticeSessionType;
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
  const answerOptions = PracticeSession.answerOptions(session);
  const feedbackAnimation = PracticeSession.feedbackAnimation(session);
  const hasCorrectFeedback = PracticeSession.hasCorrectFeedback(session);
  const selectedAnswer = PracticeSession.selectedAnswer(session);
  const feedbackState = PracticeSession.feedbackState(session);

  return (
    <>
      <CurrentQuestionPrompt
        multiplier={session.currentMultiplier}
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
            disabled={!PracticeSession.canCheck(session)}
            onClick={onCheckAnswer}
          />
        )}
      </Group>
    </>
  );
};

export default ActiveSessionMode;
