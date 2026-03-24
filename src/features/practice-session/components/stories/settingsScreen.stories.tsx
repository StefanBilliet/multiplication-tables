import {
  Badge,
  Card,
  Center,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import LanguageSwitcher from "../../../../shared/i18n/languageSwitcher";
import SettingsScreen from "../../../settings/components/settingsScreen.tsx";

const meta = {
  title: "Practice/SettingsScreen",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const header = (
  <Group component="header" align="flex-start" justify="space-between">
    <Stack gap="xs" maw={560}>
      <Badge variant="light" color="teal">
        Shared practice settings
      </Badge>

      <Title order={1}>Practice profile</Title>

      <Text c="dimmed">
        Choose how each table session should ask its questions.
      </Text>
    </Stack>

    <LanguageSwitcher />
  </Group>
);

const practiceProfileCard = (
  <Card withBorder radius="xl" p="lg">
    <Stack gap="md">
      <Group justify="space-between" align="flex-start">
        <Stack gap={4}>
          <Text size="sm" fw={700} c="dimmed" tt="uppercase">
            Practice profile
          </Text>
          <Title order={2}>Question order</Title>
        </Stack>
      </Group>

      <Text c="dimmed" maw={420}>
        Set whether questions follow the multiplication table or appear in a
        shuffled order.
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
        <Card
          withBorder
          radius="lg"
          p="md"
          style={{
            borderColor: "var(--mantine-color-teal-5)",
            background:
              "linear-gradient(180deg, rgba(17, 170, 154, 0.08), rgba(17, 170, 154, 0.02))",
            boxShadow: "0 0 0 1px rgba(17, 170, 154, 0.08)",
            minHeight: 148,
          }}
        >
          <Stack justify="space-between" h="100%" gap="md">
            <Stack gap={2} maw={280}>
              <Group gap={8} wrap="nowrap">
                <Text fw={700}>In order</Text>
                <Badge size="sm" variant="filled" color="teal">
                  Selected
                </Badge>
              </Group>
              <Text size="sm" c="dimmed">
                Questions stay in the table sequence from start to finish.
              </Text>
            </Stack>

            <Text size="sm" fw={600} c="teal">
              Structured
            </Text>
          </Stack>
        </Card>

        <Card withBorder radius="lg" p="md">
          <Stack justify="space-between" h="100%" gap="md">
            <Stack gap={2} maw={280}>
              <Text fw={700}>Randomized</Text>
              <Text size="sm" c="dimmed">
                Questions are shuffled within the table for extra variety.
              </Text>
            </Stack>

            <Text size="sm" fw={600} c="dimmed">
              Varied
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  </Card>
);

export const DesktopOverview: Story = {
  render: () => <SettingsScreen />,
};

export const MobileOverview: Story = {
  render: () => (
    <Center mih="100dvh" p="md">
      <Card variant="shell" style={{ width: "min(100%, 25rem)" }}>
        <Stack gap="lg">
          <Stack gap="lg">{header}</Stack>

          {practiceProfileCard}
        </Stack>
      </Card>
    </Center>
  ),
};
