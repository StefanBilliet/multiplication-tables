import { Card, Center, Group, Stack, Text } from "@mantine/core";
import { type FC, useState } from "react";
import { useParams } from "react-router-dom";
import AnswerPad from "./answerPad";
import BackToTablesButton from "./backToTablesButton";
import CheckAnswerButton from "./checkAnswerButton";
import ContinueButton from "./continueButton";
import CurrentQuestionPrompt from "./currentQuestionPrompt";
import Header from "./header";

type AnswerState =
  | { kind: "idle" }
  | { kind: "selected"; answer: number }
  | { kind: "incorrect" }
  | { kind: "correct"; answer: number };

const PracticeScreen: FC = () => {
  const { tableId } = useParams();
  const selectedTable = Number(tableId);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [answerState, setAnswerState] = useState<AnswerState>({ kind: "idle" });
  const answerOptions = Array.from(
    { length: 10 },
    (_, index) => selectedTable * (index + 1),
  );
  const correctAnswer = currentMultiplier * selectedTable;
  const hasCorrectFeedback = answerState.kind === "correct";
  const selectedAnswer =
    answerState.kind === "selected" || answerState.kind === "correct"
      ? answerState.answer
      : null;
  const feedback =
    answerState.kind === "correct"
      ? "Correct!"
      : answerState.kind === "incorrect"
        ? "Try again."
        : null;

  const handleSelectAnswer = (answer: number) => {
    setAnswerState({ kind: "selected", answer });
  };

  const handleCheckAnswer = () => {
    if (answerState.kind !== "selected") {
      return;
    }

    if (answerState.answer === correctAnswer) {
      setAnswerState({ kind: "correct", answer: answerState.answer });
      return;
    }

    setAnswerState({ kind: "incorrect" });
  };

  const handleContinue = () => {
    setCurrentMultiplier((previousMultiplier) => previousMultiplier + 1);
    setAnswerState({ kind: "idle" });
  };

  return (
    <Center mih="100vh" p={{ base: "md", sm: "xl" }}>
      <Card w="100%" maw={720} variant="shell">
        <Stack gap="xl">
          <Header selectedTable={selectedTable} />

          <CurrentQuestionPrompt
            multiplier={currentMultiplier}
            table={selectedTable}
          />

          <Stack gap="md">
            <AnswerPad
              answerOptions={answerOptions}
              hasCorrectFeedback={hasCorrectFeedback}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
            />

            {feedback !== null ? <Text>{feedback}</Text> : null}
          </Stack>

          <Group justify="space-between">
            <BackToTablesButton />

            {feedback === "Correct!" ? (
              <ContinueButton onClick={handleContinue} />
            ) : (
              <CheckAnswerButton
                disabled={answerState.kind !== "selected"}
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
