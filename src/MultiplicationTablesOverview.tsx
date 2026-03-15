import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

function MultiplicationTablesOverview() {
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
            <Card radius="lg" padding="lg" withBorder bg="teal.0">
              <Stack gap="md" h="100%" justify="space-between">
                <Stack gap="xs">
                  <Badge variant="light" color="teal" w="fit-content">
                    Available
                  </Badge>
                  <Title order={3}>1 times table</Title>
                  <Text c="dimmed" size="sm">
                    Ready to practice
                  </Text>
                </Stack>

                <Button color="teal">Start practice</Button>
              </Stack>
            </Card>

            <Card radius="lg" padding="lg" withBorder bg="teal.0">
              <Stack gap="md" h="100%" justify="space-between">
                <Stack gap="xs">
                  <Badge variant="light" color="teal" w="fit-content">
                    Available
                  </Badge>
                  <Title order={3}>2 times table</Title>
                  <Text c="dimmed" size="sm">
                    Play again anytime
                  </Text>
                </Stack>

                <Button color="teal">Start practice</Button>
              </Stack>
            </Card>

            <Card radius="lg" padding="lg" withBorder bg="teal.0">
              <Stack gap="md" h="100%" justify="space-between">
                <Stack gap="xs">
                  <Badge variant="light" color="teal" w="fit-content">
                    Available
                  </Badge>
                  <Title order={3}>3 times table</Title>
                  <Text c="dimmed" size="sm">
                    Ready to practice
                  </Text>
                </Stack>

                <Button color="teal">Start practice</Button>
              </Stack>
            </Card>

            <Card radius="lg" padding="lg" withBorder bg="gray.0">
              <Stack gap="md" h="100%" justify="space-between">
                <Stack gap="xs">
                  <Badge variant="light" color="gray" w="fit-content">
                    Locked
                  </Badge>
                  <Title order={3}>4 times table</Title>
                  <Text c="dimmed" size="sm">
                    Unlock this table next
                  </Text>
                </Stack>

                <Button variant="default" disabled>
                  Locked for now
                </Button>
              </Stack>
            </Card>

            <Card radius="lg" padding="lg" withBorder bg="gray.0">
              <Stack gap="md" h="100%" justify="space-between">
                <Stack gap="xs">
                  <Badge variant="light" color="gray" w="fit-content">
                    Locked
                  </Badge>
                  <Title order={3}>5 times table</Title>
                  <Text c="dimmed" size="sm">
                    Unlock this table next
                  </Text>
                </Stack>

                <Button variant="default" disabled>
                  Locked for now
                </Button>
              </Stack>
            </Card>

            <Card radius="lg" padding="lg" withBorder bg="gray.0">
              <Stack gap="md" h="100%" justify="space-between">
                <Stack gap="xs">
                  <Badge variant="light" color="gray" w="fit-content">
                    Locked
                  </Badge>
                  <Title order={3}>6 times table</Title>
                  <Text c="dimmed" size="sm">
                    Unlock this table next
                  </Text>
                </Stack>

                <Button variant="default" disabled>
                  Locked for now
                </Button>
              </Stack>
            </Card>
          </SimpleGrid>
        </Stack>
      </Card>
    </main>
  );
}

export default MultiplicationTablesOverview;
