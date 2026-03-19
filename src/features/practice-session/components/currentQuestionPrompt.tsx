import { Paper, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type CurrentQuestionPromptProps = {
  multiplier: number;
  table: number;
};

const CurrentQuestionPrompt: FC<CurrentQuestionPromptProps> = ({
  multiplier,
  table,
}) => {
  const { t } = useTranslation();

  return (
    <Paper radius="xl" p="xl" bg="teal.0" withBorder>
      <Stack gap="md" align="center">
        <Text size="sm" tt="uppercase" fw={700} c="teal.8">
          {t("practiceSession.questionPrompt.title")}
        </Text>
        <Title order={2} size="h1">
          {multiplier} x {table} = ?
        </Title>
      </Stack>
    </Paper>
  );
};

export default CurrentQuestionPrompt;
