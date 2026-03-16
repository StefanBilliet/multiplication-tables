import { Card, Center, Group, Stack, Text } from "@mantine/core";
import { type FC, useState } from "react";
import { useParams } from "react-router-dom";
import AnswerState, {
  type AnswerState as AnswerStateType,
} from "../models/answerState";
import AnswerPad from "./answerPad";
import BackToTablesButton from "./backToTablesButton";
import CheckAnswerButton from "./checkAnswerButton";
import ContinueButton from "./continueButton";
import CurrentQuestionPrompt from "./currentQuestionPrompt";
import Header from "./header";

const PracticeScreen: FC = () => {
  const { tableId } = useParams();
  const selectedTable = Number(tableId);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [answerState, setAnswerState] = useState<AnswerStateType>({
    kind: "idle",
  });
  const answerOptions = Array.from(
    { length: 10 },
    (_, index) => selectedTable * (index + 1),
  );
  const correctAnswer = currentMultiplier * selectedTable;
  const hasCorrectFeedback = AnswerState.isCorrect(answerState);
  const selectedAnswer = AnswerState.selectedAnswer(answerState);
  const feedback =
    answerState.kind === "validated" ? AnswerState.feedback(answerState) : null;

  const handleSelectAnswer = (answer: number) => {
    setAnswerState({ kind: "selected", answer });
  };

  const handleCheckAnswer = () => {
    if (!AnswerState.canCheck(answerState)) {
      return;
    }

    setAnswerState({
      kind: "validated",
      answer: answerState.answer,
      result: answerState.answer === correctAnswer ? "correct" : "incorrect",
    });
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

            {hasCorrectFeedback ? (
              <ContinueButton onClick={handleContinue} />
            ) : (
              <CheckAnswerButton
                disabled={!AnswerState.canCheck(answerState)}
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
