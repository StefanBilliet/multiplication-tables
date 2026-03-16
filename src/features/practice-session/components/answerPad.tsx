import { Button, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import type { FC } from "react";

type AnswerPadProps = {
  answerOptions: number[];
  hasCorrectFeedback: boolean;
  selectedAnswer: number | null;
  onSelectAnswer: (answer: number) => void;
};

const AnswerPad: FC<AnswerPadProps> = ({
  answerOptions,
  hasCorrectFeedback,
  selectedAnswer,
  onSelectAnswer,
}) => (
  <Stack gap="md">
    <Text fw={600}>Answer</Text>

    <TextInput
      label="Answer"
      readOnly
      value={selectedAnswer === null ? "" : String(selectedAnswer)}
      placeholder="Choose a number"
      size="lg"
      radius="lg"
      styles={{
        label: { display: "none" },
        input: {
          backgroundColor: "var(--mantine-color-white)",
          borderColor: "rgba(23, 49, 55, 0.12)",
          color:
            selectedAnswer === null
              ? "var(--mantine-color-dimmed)"
              : "var(--mantine-color-dark-8)",
          fontSize: "var(--mantine-font-size-xl)",
          fontWeight: 700,
          minHeight: "3.5rem",
        },
      }}
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
