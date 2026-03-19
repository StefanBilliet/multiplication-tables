import { Badge, Button, Card, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";
import { calculateRewardsNeeded } from "./calculateRewardsNeeded";

type MultiplicationTableCardProps = {
  table: {
    id: number;
    label: string;
    unlocked: boolean;
  };
  lifetimeRewardTotal: number;
  onSelect: (tableId: number) => void;
};

const MultiplicationTableCard: FC<MultiplicationTableCardProps> = ({
  table,
  lifetimeRewardTotal,
  onSelect,
}) => {
  const statusLabel = table.unlocked ? "Available" : "Locked";
  const statusColor = table.unlocked ? "teal" : "gray";
  const rewardsNeeded = calculateRewardsNeeded(lifetimeRewardTotal, table.id);
  const description = table.unlocked
    ? "Ready to practice"
    : "Unlock this table next";
  const cardBackground = table.unlocked ? "teal.0" : "gray.0";
  const actionLabel = table.unlocked ? "Start practice" : "Locked for now";
  const actionVariant = table.unlocked ? "filled" : "default";
  const actionColor = table.unlocked ? "teal" : undefined;
  const actionDisabled = !table.unlocked;

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
          {!table.unlocked && rewardsNeeded > 0 && (
            <Text c="dimmed" size="xs" fs="italic">
              You need {rewardsNeeded} more rewards to unlock this table
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
