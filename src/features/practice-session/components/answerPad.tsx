import { Button, SimpleGrid, Stack, Text } from "@mantine/core";
import type { FC } from "react";
import AnswerField from "./answerField";

type AnswerPadProps = {
  answerOptions: number[];
  feedbackAnimation: "pop" | "wobble" | null;
  feedbackState: "correct" | "incorrect" | null;
  hasCorrectFeedback: boolean;
  selectedAnswer: number | null;
  onSelectAnswer: (answer: number) => void;
};

const AnswerPad: FC<AnswerPadProps> = ({
  answerOptions,
  feedbackAnimation,
  feedbackState,
  hasCorrectFeedback,
  selectedAnswer,
  onSelectAnswer,
}) => (
  <Stack gap="md">
    <Text fw={600}>Answer</Text>

    <AnswerField
      feedbackAnimation={feedbackAnimation}
      feedbackState={feedbackState}
      selectedAnswer={selectedAnswer}
    />

    <SimpleGrid cols={3} spacing="sm">
      {answerOptions.map((answerOption) => (
        <Button
          key={answerOption}
          variant="default"
          disabled={hasCorrectFeedback}
          onClick={() => onSelectAnswer(answerOption)}
        >
          {answerOption}
        </Button>
      ))}
    </SimpleGrid>
  </Stack>
);

export default AnswerPad;
