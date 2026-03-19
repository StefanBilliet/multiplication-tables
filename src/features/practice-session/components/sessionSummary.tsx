import { Paper, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type SessionSummaryProps = {
  correctAnswerCount: number;
  totalQuestionCount?: number;
};

const SessionSummary: FC<SessionSummaryProps> = ({
  correctAnswerCount,
  totalQuestionCount = 10,
}) => {
  const { t } = useTranslation();

  return (
    <Paper radius="xl" p="xl" bg="teal.0" withBorder>
      <Stack gap="md" align="center">
        <Text size="sm" tt="uppercase" fw={700} c="teal.8">
          {t("practiceSession.sessionSummary.title")}
        </Text>
        <Title order={2}>
          {t("practiceSession.sessionSummary.completedTitle")}
        </Title>
        <Text size="xl" fw={700} c="teal.8">
          {t("practiceSession.sessionSummary.correctAnswers", {
            correctAnswerCount,
          })}
        </Text>
        <Text c="dimmed" ta="center">
          {t("practiceSession.sessionSummary.description", {
            correctAnswerCount,
            totalQuestionCount,
          })}
        </Text>
      </Stack>
    </Paper>
  );
};

export default SessionSummary;
