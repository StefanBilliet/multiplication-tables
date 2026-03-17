import { Card, Center, Group, Stack, Text } from "@mantine/core";
import { type FC, useState } from "react";
import { useParams } from "react-router-dom";
import PracticeSession from "../models/practiceSession";
import AnswerPad from "./answerPad";
import BackToTablesButton from "./backToTablesButton";
import CheckAnswerButton from "./checkAnswerButton";
import ContinueButton from "./continueButton";
import CurrentQuestionPrompt from "./currentQuestionPrompt";
import Header from "./header";

const PracticeScreen: FC = () => {
  const { tableId } = useParams();
  const selectedTable = Number(tableId);
  const [session, setSession] = useState(() =>
    PracticeSession.start(selectedTable),
  );
  const answerOptions = PracticeSession.answerOptions(session);
  const hasCorrectFeedback = PracticeSession.hasCorrectFeedback(session);
  const selectedAnswer = PracticeSession.selectedAnswer(session);
  const feedback = PracticeSession.feedback(session);

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
          <Header selectedTable={selectedTable} />

          {session.isComplete ? (
            <Stack gap="xs">
              <Text fw={700}>Practice session complete</Text>
              <Text>{session.firstTryCorrectAnswerCount} correct answers</Text>
            </Stack>
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
                hasCorrectFeedback={hasCorrectFeedback}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleSelectAnswer}
              />

              {feedback !== null ? <Text>{feedback}</Text> : null}
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
