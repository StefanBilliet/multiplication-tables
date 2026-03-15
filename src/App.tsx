import { Badge, Button, Card, Group, Stack, Text, Title } from "@mantine/core";

function App() {
  return (
    <main className="app-shell">
      <Card className="app-card" radius="xl" padding="xl" shadow="md">
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <Stack gap={8}>
              <Badge variant="light" color="teal" w="fit-content">
                Scaffold ready
              </Badge>
              <Title order={1}>Multiplication Tables</Title>
              <Text maw={560}>
                React, TypeScript, Mantine, Vitest, Storybook, Fishery, Biome,
                and PWA basics are wired in. The app is ready for TDD on the
                first user story.
              </Text>
            </Stack>
          </Group>

          <Group gap="sm">
            <Button
              component="a"
              href="/user-stories/01-start-a-practice-session-for-a-chosen-table.md"
              variant="filled"
              color="teal"
            >
              Read first story
            </Button>
            <Button
              component="a"
              href="https://storybook.js.org/"
              target="_blank"
              rel="noreferrer"
              variant="default"
            >
              Open Storybook docs
            </Button>
          </Group>
        </Stack>
      </Card>
    </main>
  );
}

export default App;
