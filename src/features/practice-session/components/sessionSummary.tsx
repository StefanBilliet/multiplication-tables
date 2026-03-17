import { Paper, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";

type SessionSummaryProps = {
  correctAnswerCount: number;
  totalQuestionCount?: number;
};

const SessionSummary: FC<SessionSummaryProps> = ({
  correctAnswerCount,
  totalQuestionCount = 10,
}) => {
  return (
    <Paper radius="xl" p="xl" bg="teal.0" withBorder>
      <Stack gap="md" align="center">
        <Text size="sm" tt="uppercase" fw={700} c="teal.8">
          Session summary
        </Text>
        <Title order={2}>Practice session complete</Title>
        <Text size="xl" fw={700} c="teal.8">
          {correctAnswerCount} correct answers
        </Text>
        <Text c="dimmed" ta="center">
          Great work. You answered {correctAnswerCount} out of{" "}
          {totalQuestionCount} questions correctly.
        </Text>
      </Stack>
    </Paper>
  );
};

export default SessionSummary;
