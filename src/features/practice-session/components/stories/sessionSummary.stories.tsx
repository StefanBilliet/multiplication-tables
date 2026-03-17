import {
  Badge,
  Button,
  Card,
  Center,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Header from "../header.tsx";
import RewardEarnedSummary from "../rewardEarnedSummary.tsx";
import SessionSummary from "../sessionSummary.tsx";

const meta = {
  title: "Practice/SessionSummary",
  component: SessionSummary,
} satisfies Meta<typeof SessionSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

const SessionSummaryPreview = ({
  celebration,
  correctAnswerCount,
  lifetimeRewardTotal,
}: {
  celebration?: { body: string; title: string };
  correctAnswerCount: number;
  lifetimeRewardTotal?: number;
}) => (
  <Center mih="100vh" p={{ base: "md", sm: "xl" }}>
    <Card w="100%" maw={720} variant="shell">
      <Stack gap="xl">
        <Stack gap="md">
          <Badge variant="light" color="teal" w="fit-content">
            Practice session
          </Badge>
          <Header
            description="You've completed this practice session."
            selectedTable={3}
          />
        </Stack>

        {celebration ? (
          <Paper radius="xl" p="lg" bg="yellow.1" withBorder>
            <Group align="center" justify="space-between" gap="md">
              <Group align="center" wrap="nowrap">
                <ThemeIcon size="xl" radius="xl" color="yellow">
                  <Text fw={700}>+1</Text>
                </ThemeIcon>
                <Stack gap={2}>
                  <Title order={3}>{celebration.title}</Title>
                  <Text c="dimmed">{celebration.body}</Text>
                </Stack>
              </Group>
              <Badge variant="filled" color="teal" size="lg" radius="xl">
                {lifetimeRewardTotal} total rewards
              </Badge>
            </Group>
          </Paper>
        ) : null}

        <SessionSummary correctAnswerCount={correctAnswerCount} />

        {celebration ? null : (
          <Paper radius="xl" p="lg" bg="gray.0" withBorder>
            <Stack gap={4}>
              <Text size="sm" tt="uppercase" fw={700} c="gray.7">
                Reward status
              </Text>
              <Title order={3}>No reward earned this time</Title>
              <Text c="dimmed">
                A reward appears only after at least 7 first-try correct
                answers.
              </Text>
            </Stack>
          </Paper>
        )}

        <Group justify="space-between">
          <Button variant="default">Back to tables</Button>
        </Group>
      </Stack>
    </Card>
  </Center>
);

export const RewardEarned: Story = {
  args: {
    correctAnswerCount: 8,
  },
  render: () => (
    <Center mih="100vh" p={{ base: "md", sm: "xl" }}>
      <Card w="100%" maw={720} variant="shell">
        <Stack gap="xl">
          <Stack gap="md">
            <Badge variant="light" color="teal" w="fit-content">
              Practice session
            </Badge>
            <Header
              description="You've completed this practice session."
              selectedTable={3}
            />
          </Stack>

          <RewardEarnedSummary correctAnswerCount={8} lifetimeRewardTotal={6} />

          <Group justify="space-between">
            <Button variant="default">Back to tables</Button>
          </Group>
        </Stack>
      </Card>
    </Center>
  ),
};

export const NoRewardEarned: Story = {
  args: {
    correctAnswerCount: 5,
  },
  render: () => <SessionSummaryPreview correctAnswerCount={5} />,
};

export const Component: Story = {
  args: {
    correctAnswerCount: 9,
  },
  render: () => <SessionSummaryPreview correctAnswerCount={9} />,
};
