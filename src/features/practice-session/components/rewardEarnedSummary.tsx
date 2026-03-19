import {
  Badge,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import SessionSummary from "./sessionSummary";

type RewardEarnedSummaryProps = {
  correctAnswerCount: number;
  lifetimeRewardTotal: number;
};

const RewardEarnedSummary: FC<RewardEarnedSummaryProps> = ({
  correctAnswerCount,
  lifetimeRewardTotal,
}) => {
  const { t } = useTranslation();

  return (
    <Stack gap="xl">
      <Paper radius="xl" p="lg" bg="yellow.1" withBorder>
        <Group align="center" justify="space-between" gap="md">
          <Group align="center" wrap="nowrap">
            <ThemeIcon size="xl" radius="xl" color="yellow">
              <Text fw={700}>+1</Text>
            </ThemeIcon>
            <Stack gap={2}>
              <Title order={3}>{t("practiceSession.rewardEarned.title")}</Title>
              <Text c="dimmed">
                {t("practiceSession.rewardEarned.description")}
              </Text>
            </Stack>
          </Group>
          <Badge variant="filled" color="teal" size="lg" radius="xl">
            {t("practiceSession.rewardEarned.totalRewards", {
              lifetimeRewardTotal,
            })}
          </Badge>
        </Group>
      </Paper>

      <SessionSummary correctAnswerCount={correctAnswerCount} />
    </Stack>
  );
};

export default RewardEarnedSummary;
