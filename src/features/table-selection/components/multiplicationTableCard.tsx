import { Badge, Button, Card, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type MultiplicationTableCardProps = {
  table: {
    id: number;
    label: string;
    unlockState: {
      unlocked: boolean;
      rewardsNeeded: number;
    };
  };
  onSelect: (tableId: number) => void;
};

const MultiplicationTableCard: FC<MultiplicationTableCardProps> = ({
  table,
  onSelect,
}) => {
  const { t } = useTranslation();
  const statusLabel = table.unlockState.unlocked
    ? t("tableCard.available")
    : t("tableCard.locked");
  const statusColor = table.unlockState.unlocked ? "teal" : "gray";
  const description = table.unlockState.unlocked
    ? t("tableCard.readyToPractice")
    : t("tableCard.unlockNext");
  const cardBackground = table.unlockState.unlocked ? "teal.0" : "gray.0";
  const actionLabel = table.unlockState.unlocked
    ? t("tableCard.startPractice")
    : t("tableCard.lockedForNow");
  const actionVariant = table.unlockState.unlocked ? "filled" : "default";
  const actionColor = table.unlockState.unlocked ? "teal" : undefined;
  const actionDisabled = !table.unlockState.unlocked;

  return (
    <Card radius="lg" padding="lg" withBorder bg={cardBackground}>
      <Stack gap="md" h="100%" justify="space-between">
        <Stack gap="xs">
          <Badge variant="light" color={statusColor} w="fit-content">
            {statusLabel}
          </Badge>
          <Title order={3}>{table.label}</Title>
          <Text c="dimmed" size="sm">
            {description}
          </Text>
          {!table.unlockState.unlocked &&
            table.unlockState.rewardsNeeded > 0 && (
              <Text c="dimmed" size="xs" fs="italic">
                {t("tableCard.rewardsNeededMessage", {
                  rewardsNeeded: table.unlockState.rewardsNeeded,
                })}
              </Text>
            )}
        </Stack>

        <Button
          color={actionColor}
          variant={actionVariant}
          disabled={actionDisabled}
          onClick={() => onSelect(table.id)}
        >
          {actionLabel}
        </Button>
      </Stack>
    </Card>
  );
};

export default MultiplicationTableCard;
