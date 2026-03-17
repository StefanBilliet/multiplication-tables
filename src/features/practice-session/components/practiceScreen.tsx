import { Card, Center, Group, Stack } from "@mantine/core";
import { type FC, useState } from "react";
import { useParams } from "react-router-dom";
import PracticeSession from "../models/practiceSession";
import AnswerPad from "./answerPad";
import BackToTablesButton from "./backToTablesButton";
import CheckAnswerButton from "./checkAnswerButton";
import ContinueButton from "./continueButton";
import CurrentQuestionPrompt from "./currentQuestionPrompt";
import Header from "./header";
import SessionSummary from "./sessionSummary";

const PracticeScreen: FC = () => {
  const { tableId } = useParams();
  const selectedTable = Number(tableId);
  const [session, setSession] = useState(() =>
    PracticeSession.start(selectedTable),
  );
  const answerOptions = PracticeSession.answerOptions(session);
  const feedbackAnimation = PracticeSession.feedbackAnimation(session);
  const hasCorrectFeedback = PracticeSession.hasCorrectFeedback(session);
  const selectedAnswer = PracticeSession.selectedAnswer(session);
  const feedbackState = PracticeSession.feedbackState(session);

  const handleSelectAnswer = (answer: number) => {
    setSession((currentSession) =>
      PracticeSession.selectAnswer(currentSession, answer),
    );
  };

  const handleCheckAnswer = () => {
    setSession((currentSession) => PracticeSession.checkAnswer(currentSession));
  };

  const handleContinue = () => {
    setSession((currentSession) =>
      PracticeSession.continueSession(currentSession),
    );
  };

  return (
    <Center mih="100vh" p={{ base: "md", sm: "xl" }}>
      <Card w="100%" maw={720} variant="shell">
        <Stack gap="xl">
          <Header
            description={
              session.isComplete
                ? "You've completed this practice session."
                : undefined
            }
            selectedTable={selectedTable}
          />

          {session.isComplete ? (
            <SessionSummary
              correctAnswerCount={session.firstTryCorrectAnswerCount}
            />
          ) : (
            <CurrentQuestionPrompt
              multiplier={session.currentMultiplier}
              table={selectedTable}
            />
          )}

          {session.isComplete ? null : (
            <Stack gap="md">
              <AnswerPad
                answerOptions={answerOptions}
                feedbackAnimation={feedbackAnimation}
                feedbackState={feedbackState}
                hasCorrectFeedback={hasCorrectFeedback}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleSelectAnswer}
              />
            </Stack>
          )}

          <Group justify="space-between">
            <BackToTablesButton />

            {session.isComplete ? null : hasCorrectFeedback ? (
              <ContinueButton onClick={handleContinue} />
            ) : (
              <CheckAnswerButton
                disabled={!PracticeSession.canCheck(session)}
                onClick={handleCheckAnswer}
              />
            )}
          </Group>
        </Stack>
      </Card>
    </Center>
  );
};

export default PracticeScreen;
