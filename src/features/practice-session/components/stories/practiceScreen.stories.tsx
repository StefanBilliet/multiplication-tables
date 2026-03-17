import {
  Badge,
  Button,
  Card,
  Center,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PracticeScreen from "../practiceScreen.tsx";

type PracticeScreenMockupProps = {
  scenario:
    | "no-answer-selected"
    | "answer-selected"
    | "incorrect-feedback-retry"
    | "correct-feedback-continue";
};

const meta = {
  title: "Practice/PracticeScreen",
  component: PracticeScreen,
} satisfies Meta<typeof PracticeScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

const PracticeScreenMockup = ({ scenario }: PracticeScreenMockupProps) =>
  (() => {
    const answer =
      scenario === "no-answer-selected" ||
      scenario === "incorrect-feedback-retry"
        ? undefined
        : "9";
    const selectedAnswer =
      scenario === "answer-selected" || scenario === "correct-feedback-continue"
        ? 9
        : undefined;
    const checkAnswerDisabled =
      scenario === "no-answer-selected" ||
      scenario === "incorrect-feedback-retry";
    const feedback =
      scenario === "incorrect-feedback-retry"
        ? {
            tone: "incorrect" as const,
            message: "Not quite. Give the same question another try.",
          }
        : scenario === "correct-feedback-continue"
          ? {
              tone: "correct" as const,
              message: "Nice work. That answer is correct.",
            }
          : undefined;
    const showContinue = scenario === "correct-feedback-continue";

    return (
      <Center mih="100vh" p={{ base: "md", sm: "xl" }}>
        <Card w="100%" maw={720} variant="shell">
          <Stack gap="xl">
            <Stack gap="md">
              <Group justify="space-between" align="flex-start">
                <Stack gap={8}>
                  <Badge variant="light" color="teal" w="fit-content">
                    Practice session
                  </Badge>
                  <Title order={1}>Practice the 3 times table</Title>
                  <Text c="dimmed" maw={520}>
                    Solve each question one by one. Keep going until all 10 are
                    done.
                  </Text>
                </Stack>

                <Text fw={700} c="teal.7">
                  Question 1 of 10
                </Text>
              </Group>

              <Progress value={10} color="teal" radius="xl" size="lg" />
            </Stack>

            <Paper radius="xl" p="xl" bg="teal.0" withBorder>
              <Stack gap="md" align="center">
                <Text size="sm" tt="uppercase" fw={700} c="teal.8">
                  Current question
                </Text>
                <Title order={2} size="h1">
                  1 x 3 = ?
                </Title>
                <Text c="dimmed" ta="center">
                  Tap a number below to build your answer.
                </Text>
              </Stack>
            </Paper>

            {feedback ? (
              <Paper
                radius="xl"
                p="lg"
                bg={feedback.tone === "correct" ? "teal.0" : "red.0"}
                withBorder
              >
                <Stack gap={4}>
                  <Text
                    size="sm"
                    tt="uppercase"
                    fw={700}
                    c={feedback.tone === "correct" ? "teal.8" : "red.8"}
                  >
                    {feedback.tone === "correct" ? "Correct" : "Try again"}
                  </Text>
                  <Text fw={600}>{feedback.message}</Text>
                </Stack>
              </Paper>
            ) : null}

            <Stack gap="md">
              <Text fw={600}>Answer</Text>
              <Paper radius="lg" p="md" withBorder bg="white">
                <Text size="xl" fw={700} c={answer ? "dark.8" : "dimmed"}>
                  {answer ?? "Choose a number"}
                </Text>
              </Paper>

              <SimpleGrid cols={3} spacing="sm">
                {[3, 6, 9, 12, 15, 18, 21, 24, 27, 30].map((option) => (
                  <Button
                    key={option}
                    color={selectedAnswer === option ? "teal" : undefined}
                    variant={selectedAnswer === option ? "filled" : "default"}
                  >
                    {option}
                  </Button>
                ))}
              </SimpleGrid>
            </Stack>

            <Group justify="space-between">
              <Button variant="default">Back to tables</Button>
              {showContinue ? (
                <Button color="teal">Continue</Button>
              ) : (
                <Button color="teal" disabled={checkAnswerDisabled}>
                  Check answer
                </Button>
              )}
            </Group>
          </Stack>
        </Card>
      </Center>
    );
  })();

export const Mockup: Story = {
  render: () => <PracticeScreenMockup scenario="answer-selected" />,
};

export const NoAnswerSelected: Story = {
  render: () => <PracticeScreenMockup scenario="no-answer-selected" />,
};

export const AnswerSelected: Story = {
  render: () => <PracticeScreenMockup scenario="answer-selected" />,
};

export const IncorrectFeedbackRetry: Story = {
  render: () => <PracticeScreenMockup scenario="incorrect-feedback-retry" />,
};

export const CorrectFeedbackContinue: Story = {
  render: () => <PracticeScreenMockup scenario="correct-feedback-continue" />,
};

export const Component: Story = {
  render: () => (
    <MemoryRouter initialEntries={["/tables/3/practice"]}>
      <Routes>
        <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
      </Routes>
    </MemoryRouter>
  ),
};
