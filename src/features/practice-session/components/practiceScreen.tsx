import {
  Button,
  Card,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PracticeScreen: FC = () => {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const selectedTable = Number(tableId);
  const answerOptions = Array.from(
    { length: 10 },
    (_, index) => selectedTable * (index + 1),
  );

  return (
    <main className="app-shell">
      <Card className="app-card" radius="xl" padding="xl" shadow="md">
        <Stack gap="xl">
          <Group justify="space-between" align="flex-start">
            <Stack gap={8}>
              <Title order={1}>Practice the {selectedTable} times table</Title>
              <Text c="dimmed" maw={520}>
                Solve each question one by one. Keep going until all 10 are
                done.
              </Text>
            </Stack>
          </Group>

          <Paper radius="xl" p="xl" bg="teal.0" withBorder>
            <Stack gap="md" align="center">
              <Text size="sm" tt="uppercase" fw={700} c="teal.8">
                Current question
              </Text>
              <Title order={2} size="h1">
                1 x {selectedTable} = ?
              </Title>
            </Stack>
          </Paper>

          <Stack gap="md">
            <Text fw={600}>Answer</Text>

            <SimpleGrid cols={3} spacing="sm">
              {answerOptions.map((answerOption) => (
                <Button key={answerOption} variant="default">
                  {answerOption}
                </Button>
              ))}
            </SimpleGrid>
          </Stack>

          <Group justify="space-between">
            <Button variant="default" onClick={() => navigate("/")}>
              Back to tables
            </Button>
          </Group>
        </Stack>
      </Card>
    </main>
  );
};

export default PracticeScreen;
