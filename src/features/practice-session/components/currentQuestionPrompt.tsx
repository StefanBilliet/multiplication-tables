import { Group, Paper, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import classes from "./currentQuestionPrompt.module.css";
import HesitationTimerCounter from "./hesitationTimerCounter";

type CurrentQuestionPromptProps = {
  isHesitationRuleEnabled?: boolean;
  hesitationTimeoutSeconds?: number;
  onHesitationElapsed?: () => void;
  multiplier: number;
  table: number;
};

const CurrentQuestionPrompt: FC<CurrentQuestionPromptProps> = ({
  isHesitationRuleEnabled = false,
  hesitationTimeoutSeconds = 5,
  onHesitationElapsed = () => undefined,
  multiplier,
  table,
}) => {
  const { t } = useTranslation();

  return (
    <Paper radius="xl" bg="teal.0" withBorder className={classes.panel}>
      <Group align="flex-start" justify="space-between" wrap="nowrap">
        <Stack gap={0}>
          <Text size="sm" tt="uppercase" fw={700} c="teal.8">
            {t("practiceSession.questionPrompt.title")}
          </Text>
          <Title order={2} size="h1">
            {multiplier} x {table} = ?
          </Title>
        </Stack>

        {isHesitationRuleEnabled ? (
          <HesitationTimerCounter
            enabled
            onElapsed={onHesitationElapsed}
            timeoutSeconds={hesitationTimeoutSeconds}
          />
        ) : null}
      </Group>
    </Paper>
  );
};

export default CurrentQuestionPrompt;
