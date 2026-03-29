import { Badge, Card, Center, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
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

export const WithLanguageSwitcherHeader: Story = {
  render: () => (
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Group component="header" align="flex-start" justify="space-between">
          <Stack gap="xs">
            <Badge variant="light" color={semanticColors.primary}>
              Start practicing
            </Badge>
            <Title order={1}>Choose a table</Title>
            <Text c="dimmed" maw={520}>
              Pick a table, or open shared practice settings first.
            </Text>
          </Stack>

          <LanguageSwitcher />
        </Group>

        <SimpleGrid component="section" cols={{ base: 1, sm: 2, md: 3 }}>
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
      </Card>
    </Center>
  ),
};
