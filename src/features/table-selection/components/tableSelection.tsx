import {
  Badge,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { FC } from "react";
import MultiplicationTableCard from "./multiplicationTableCard";

const TableSelection: FC = () => {
  const handleTableSelected = () => {};

  return (
    <main className="app-shell">
      <Card className="app-card" radius="xl" padding="xl" shadow="md">
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <Stack gap={8}>
              <Badge variant="light" color="teal" w="fit-content">
                Start screen
              </Badge>
              <Title order={1}>Choose a table to practice</Title>
              <Text maw={560}>
                Pick any table that is ready. Locked tables stay visible so a
                child can see what opens up next.
              </Text>
            </Stack>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            <MultiplicationTableCard
              table={{ id: 1, label: "1 times table", unlocked: true }}
              onSelect={handleTableSelected}
            />

            <MultiplicationTableCard
              table={{ id: 2, label: "2 times table", unlocked: true }}
              onSelect={handleTableSelected}
            />

            <MultiplicationTableCard
              table={{ id: 3, label: "3 times table", unlocked: true }}
              onSelect={handleTableSelected}
            />

            <MultiplicationTableCard
              table={{ id: 4, label: "4 times table", unlocked: false }}
              onSelect={handleTableSelected}
            />

            <MultiplicationTableCard
              table={{ id: 5, label: "5 times table", unlocked: false }}
              onSelect={handleTableSelected}
            />

            <MultiplicationTableCard
              table={{ id: 6, label: "6 times table", unlocked: false }}
              onSelect={handleTableSelected}
            />
          </SimpleGrid>
        </Stack>
      </Card>
    </main>
  );
};

export default TableSelection;
