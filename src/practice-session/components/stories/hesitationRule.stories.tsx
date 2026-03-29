import { Button, Card, Center, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { semanticColors } from '../../../platform/theme/semanticColors';
import HesitationTimerCounter from '../hesitationTimerCounter';

const meta = {
  title: 'Practice/HesitationRule',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const renderHesitationRuleFrame = () => (
  <Center mih="100vh" p={{ base: 'md', sm: 'xl' }}>
    <Card w="100%" maw={720} variant="shell">
      <Stack gap="lg">
        <Stack gap="xs">
          <Text fw={700} tt="uppercase" c={semanticColors.primary} size="sm">
            Hesitation rule enabled
          </Text>
          <Title order={1}>1 x 3 = ?</Title>
          <Text c="dimmed">Answer within 5 seconds or the practice session resets.</Text>
        </Stack>

        <Group gap="lg" align="center">
          <HesitationTimerCounter enabled onElapsed={() => undefined} timeoutSeconds={5} />

          <Stack gap={4}>
            <Text fw={600}>Elapsed time</Text>
            <Text size="sm" c="dimmed">
              Counts up from 0 to 5 seconds.
            </Text>
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                0s
              </Text>
              <Text size="sm" c="dimmed">
                →
              </Text>
              <Text size="sm" c="dimmed">
                5s
              </Text>
            </Group>
          </Stack>
        </Group>
      </Stack>
    </Card>
  </Center>
);

export const Counter: Story = {
  render: () => renderHesitationRuleFrame(),
};

export const PlacedInPracticeScreen: Story = {
  render: () => (
    <Center mih="100vh" p={{ base: 'md', sm: 'xl' }}>
      <Card w="100%" maw={1200} variant="shell">
        <Stack gap="xl">
          <Group component="header" align="flex-start" justify="space-between">
            <Stack gap="xs" maw={640}>
              <Title order={1}>Oefen de tafel van 3</Title>
              <Text c="dimmed">Los elke vraag een voor een op. Ga door tot alle 10 klaar zijn.</Text>
            </Stack>

            <Group gap="xs">
              <Button variant="filled" radius="xl">
                NL
              </Button>
              <Button variant="subtle" radius="xl">
                EN
              </Button>
            </Group>
          </Group>

          <Stack gap="lg">
            <Paper radius="xl" bg="var(--app-color-primary-soft)" withBorder p="xl">
              <Group align="flex-start" justify="space-between" wrap="nowrap">
                <Stack gap="sm" flex={1}>
                  <Text size="sm" tt="uppercase" fw={700} c={semanticColors.primary}>
                    Huidige vraag
                  </Text>
                  <Title order={2} size="h1">
                    1 x 3 = ?
                  </Title>
                </Stack>

                <HesitationTimerCounter enabled onElapsed={() => undefined} timeoutSeconds={5} />
              </Group>
            </Paper>

            <Stack gap="md">
              <Text fw={600}>Antwoord</Text>
              <Paper radius="xl" withBorder p="xl">
                <Text c="dimmed">Kies een getal</Text>
              </Paper>
              <SimpleGrid cols={3} spacing="sm">
                <Button variant="default">6</Button>
                <Button variant="default">9</Button>
                <Button variant="default">15</Button>
                <Button variant="default">21</Button>
                <Button variant="default">30</Button>
                <Button variant="default">24</Button>
                <Button variant="default">18</Button>
                <Button variant="default">3</Button>
                <Button variant="default">12</Button>
                <Button variant="default">27</Button>
              </SimpleGrid>

              <Group justify="space-between" pt="md">
                <Button variant="default">Terug naar tafels</Button>
                <Button disabled>Controleer</Button>
              </Group>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Center>
  ),
};
