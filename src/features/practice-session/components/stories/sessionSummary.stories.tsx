import {
  Badge,
  Button,
  Card,
  Center,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import SessionSummary from "../sessionSummary.tsx";

const meta = {
  title: "Practice/SessionSummary",
  component: SessionSummary,
} satisfies Meta<typeof SessionSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    correctAnswerCount: 9,
  },
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
                  You've completed this practice session.
                </Text>
              </Stack>
            </Group>
          </Stack>

          <SessionSummary correctAnswerCount={9} />

          <Group justify="space-between">
            <Button variant="default">Back to tables</Button>
          </Group>
        </Stack>
      </Card>
    </Center>
  ),
};
