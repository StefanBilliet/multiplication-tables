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
import { useNavigate } from "react-router-dom";
import MultiplicationTableCard from "./multiplicationTableCard";

const TableSelection: FC = () => {
  const navigate = useNavigate();
  const tables = Array.from({ length: 10 }, (_, index) => {
    const id = index + 1;

    return {
      id,
      label: `${id} times table`,
      unlocked: id <= 3,
    };
  });

  const handleTableSelected = (tableId: number) => {
    navigate(`/tables/${tableId}/practice`);
  };

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
            {tables.map((table) => (
              <MultiplicationTableCard
                key={table.id}
                table={table}
                onSelect={handleTableSelected}
              />
            ))}
          </SimpleGrid>
        </Stack>
      </Card>
    </main>
  );
};

export default TableSelection;
