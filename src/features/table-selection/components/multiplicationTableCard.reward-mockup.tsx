import { Badge, Button, Card, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";

/**
 * Static mockup component showing the MultiplicationTableCard
 * with reward-based lock message (US-05 visual design).
 *
 * This is a Storybook-only static mockup - NO logic implemented.
 * The actual component will be implemented later via TDD.
 */
type TableCardWithRewardMessageProps = {
  tableLabel: string;
  rewardsNeeded: number;
};

const TableCardWithRewardMessage: FC<TableCardWithRewardMessageProps> = ({
  tableLabel,
  rewardsNeeded,
}) => {
  return (
    <Card radius="lg" padding="lg" withBorder bg="gray.0">
      <Stack gap="md" h="100%" justify="space-between">
        <Stack gap="xs">
          <Badge variant="light" color="gray" w="fit-content">
            Locked
          </Badge>
          <Title order={3}>{tableLabel}</Title>
          <Text c="dimmed" size="sm">
            Unlock this table next
          </Text>
          <Text c="dimmed" size="xs" fs="italic">
            You need {rewardsNeeded} more rewards to unlock this table
          </Text>
        </Stack>

        <Button color={undefined} variant="default" disabled={true}>
          Locked for now
        </Button>
      </Stack>
    </Card>
  );
};

export default TableCardWithRewardMessage;
