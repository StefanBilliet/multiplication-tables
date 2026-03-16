import {
  Badge,
  Button,
  Card,
  Center,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PracticeScreen from "./practiceScreen";

const meta = {
  title: "Practice/PracticeScreen",
  component: PracticeScreen,
} satisfies Meta<typeof PracticeScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mockup: Story = {
  render: () => (
    <Center mih="100vh" p={{ base: "md", sm: "xl" }}>
      <Card w="100%" maw={720} variant="shell">
        <Stack gap="xl">
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <Stack gap={8}>
                <Badge variant="light" color="teal" w="fit-content">
                  Practice session
                </Badge>
                <Title order={1}>Practice the 3 times table</Title>
                <Text c="dimmed" maw={520}>
                  Solve each question one by one. Keep going until all 10 are
                  done.
                </Text>
              </Stack>

              <Text fw={700} c="teal.7">
                Question 1 of 10
              </Text>
            </Group>

            <Progress value={10} color="teal" radius="xl" size="lg" />
          </Stack>

          <Paper radius="xl" p="xl" bg="teal.0" withBorder>
            <Stack gap="md" align="center">
              <Text size="sm" tt="uppercase" fw={700} c="teal.8">
                Current question
              </Text>
              <Title order={2} size="h1">
                1 x 3 = ?
              </Title>
              <Text c="dimmed" ta="center">
                Type the answer or tap a number below.
              </Text>
            </Stack>
          </Paper>

          <Stack gap="md">
            <Text fw={600}>Answer</Text>
            <Paper radius="lg" p="md" withBorder bg="white">
              <Text size="xl" fw={700} c="dimmed">
                3
              </Text>
            </Paper>

            <SimpleGrid cols={3} spacing="sm">
              <Button variant="default">3</Button>
              <Button variant="default">6</Button>
              <Button color="teal">9</Button>
              <Button variant="default">12</Button>
              <Button variant="default">15</Button>
              <Button variant="default">18</Button>
              <Button variant="default">21</Button>
              <Button variant="default">24</Button>
              <Button variant="default">27</Button>
              <Button variant="default">30</Button>
            </SimpleGrid>
          </Stack>

          <Group justify="space-between">
            <Button variant="default">Back to tables</Button>
            <Button color="teal">Check answer</Button>
          </Group>
        </Stack>
      </Card>
    </Center>
  ),
};

export const Component: Story = {
  render: () => (
    <MemoryRouter initialEntries={["/tables/3/practice"]}>
      <Routes>
        <Route path="/tables/:tableId/practice" element={<PracticeScreen />} />
      </Routes>
    </MemoryRouter>
  ),
};
