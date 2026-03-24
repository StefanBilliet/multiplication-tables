import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Center,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconSettings } from "@tabler/icons-react";
import { MemoryRouter } from "react-router-dom";
import MultiplicationTableCard from "./multiplicationTableCard";
import TableSelection from "./tableSelection";
import classes from "./tableSelection.module.css";

const meta = {
  title: "Practice/TableSelection",
  component: TableSelection,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof TableSelection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StartScreen: Story = {};

export const WithSettingsButtonSuggestion: Story = {
  render: () => (
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Group component="header" align="flex-start" justify="space-between">
          <Stack gap="xs">
            <Badge variant="light" color="teal">
              Start practicing
            </Badge>
            <Title order={1}>Choose a table</Title>
            <Text c="dimmed" maw={520}>
              Pick a table, or open shared practice settings first.
            </Text>
          </Stack>

          <Group gap="xs" wrap="nowrap" align="center">
            <Card withBorder radius="xl" px="xs" py={4} shadow="sm">
              <Group gap={4} wrap="nowrap">
                <Button variant="filled" radius="xl" size="sm">
                  NL
                </Button>
                <Button variant="subtle" radius="xl" size="sm">
                  EN
                </Button>
              </Group>
            </Card>

            <ActionIcon
              variant="light"
              radius="xl"
              size="xl"
              aria-label="Open practice settings"
            >
              <IconSettings
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>

        <SimpleGrid component="section" cols={{ base: 1, sm: 2, md: 3 }}>
          <MultiplicationTableCard
            table={{
              id: 3,
              label: "3 times table",
              unlockState: { unlocked: true, rewardsNeeded: 0 },
            }}
            onSelect={() => {}}
          />
          <MultiplicationTableCard
            table={{
              id: 4,
              label: "4 times table",
              unlockState: { unlocked: true, rewardsNeeded: 0 },
            }}
            onSelect={() => {}}
          />
          <MultiplicationTableCard
            table={{
              id: 5,
              label: "5 times table",
              unlockState: { unlocked: false, rewardsNeeded: 3 },
            }}
            onSelect={() => {}}
          />
        </SimpleGrid>
      </Card>
    </Center>
  ),
};
