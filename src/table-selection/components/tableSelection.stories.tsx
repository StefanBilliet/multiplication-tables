import { Badge, Button, Card, Center, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import LanguageSwitcher from '../../app/components/languageSwitcher';
import { semanticColors } from '../../platform/theme/semanticColors';
import MultiplicationTableCard from './multiplicationTableCard';
import TableSelection from './tableSelection';
import classes from './tableSelection.module.css';

const meta = {
  title: 'Practice/TableSelection',
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

export const WithTestModeEntryPoint: Story = {
  render: () => (
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Group component="header" align="flex-start" justify="space-between">
          <Stack gap="xs">
            <Badge variant="light" color={semanticColors.primary}>
              Test mode
            </Badge>
            <Title order={1}>Random questions across unlocked tables</Title>
            <Text c="dimmed" maw={560}>
              A short test session that mixes tables the child has already unlocked.
            </Text>
          </Stack>

          <LanguageSwitcher />
        </Group>

        <Stack gap="xl">
          <Stack component="section" gap="md" aria-labelledby="regular-practice-heading">
            <Stack gap="xs">
              <Text size="sm" fw={700} tt="uppercase" c="dimmed">
                Regular practice
              </Text>
              <Title id="regular-practice-heading" order={2}>
                Choose a table to practice
              </Title>
            </Stack>

            <SimpleGrid component="div" cols={{ base: 1, sm: 2, md: 3 }}>
              <MultiplicationTableCard
                table={{
                  id: 3,
                  label: '3 times table',
                  unlockState: { unlocked: true, rewardsNeeded: 0 },
                }}
                onSelect={() => {}}
              />
              <MultiplicationTableCard
                table={{
                  id: 4,
                  label: '4 times table',
                  unlockState: { unlocked: true, rewardsNeeded: 0 },
                }}
                onSelect={() => {}}
              />
              <MultiplicationTableCard
                table={{
                  id: 5,
                  label: '5 times table',
                  unlockState: { unlocked: false, rewardsNeeded: 3 },
                }}
                onSelect={() => {}}
              />
            </SimpleGrid>
          </Stack>

          <Card component="section" withBorder radius="xl" aria-labelledby="test-mode-heading">
            <Stack gap="md">
              <Stack gap="xs">
                <Text size="sm" fw={700} tt="uppercase" c="dimmed">
                  Or take a test
                </Text>
                <Title id="test-mode-heading" order={2}>
                  20 random questions across unlocked tables
                </Title>
                <Text c="dimmed">
                  Questions are mixed automatically and the result is shown at the end of the session.
                </Text>
              </Stack>

              <Button fullWidth size="lg" radius="lg">
                Start test mode
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Center>
  ),
};
