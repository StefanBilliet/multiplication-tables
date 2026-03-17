import { Card, Center, Stack, Text } from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import AnswerField from "../answerField.tsx";

const meta = {
  title: "Practice/AnswerField",
  component: AnswerField,
} satisfies Meta<typeof AnswerField>;

export default meta;

type Story = StoryObj<typeof meta>;

const AnswerFieldFrame = ({
  feedbackAnimation,
  feedbackState,
  selectedAnswer,
}: {
  feedbackAnimation: "pop" | "wobble" | null;
  feedbackState: "correct" | "incorrect" | null;
  selectedAnswer: number | null;
}) => (
  <Center mih="100vh" p={{ base: "md", sm: "xl" }}>
    <Card w="100%" maw={720} variant="shell">
      <Stack gap="md">
        <Text fw={600}>Answer</Text>
        <AnswerField
          feedbackAnimation={feedbackAnimation}
          feedbackState={feedbackState}
          selectedAnswer={selectedAnswer}
        />
      </Stack>
    </Card>
  </Center>
);

export const Empty: Story = {
  args: {
    feedbackAnimation: null,
    feedbackState: null,
    selectedAnswer: null,
  },
  render: () => (
    <AnswerFieldFrame
      feedbackAnimation={null}
      feedbackState={null}
      selectedAnswer={null}
    />
  ),
};

export const AnswerSelected: Story = {
  args: {
    feedbackAnimation: null,
    feedbackState: null,
    selectedAnswer: 9,
  },
  render: () => (
    <AnswerFieldFrame
      feedbackAnimation={null}
      feedbackState={null}
      selectedAnswer={9}
    />
  ),
};

export const Correct: Story = {
  args: {
    feedbackAnimation: "pop",
    feedbackState: "correct",
    selectedAnswer: 9,
  },
  render: () => (
    <AnswerFieldFrame
      feedbackAnimation="pop"
      feedbackState="correct"
      selectedAnswer={9}
    />
  ),
};

export const Incorrect: Story = {
  args: {
    feedbackAnimation: "wobble",
    feedbackState: "incorrect",
    selectedAnswer: null,
  },
  render: () => (
    <AnswerFieldFrame
      feedbackAnimation="wobble"
      feedbackState="incorrect"
      selectedAnswer={null}
    />
  ),
};
