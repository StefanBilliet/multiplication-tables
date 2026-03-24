import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import type { FC } from "react";
import LanguageSwitcher from "../../../shared/i18n/languageSwitcher.tsx";
import classes from "./settingsScreen.module.css";

const SettingsScreen: FC = () => {
  return (
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Stack>
          <Group component="header">
            <Stack>
              <Badge variant="light" color="teal">
                Shared practice settings
              </Badge>

              <Title order={1}>Practice profile</Title>

              <Text c="dimmed">
                Choose how each table session should ask its questions.
              </Text>
            </Stack>

            <Group>
              <LanguageSwitcher />
              <ActionIcon
                className={classes.backButton}
                radius="xl"
                aria-label="Back"
                size="lg"
              >
                <IconChevronLeft stroke={1.5} />
              </ActionIcon>
            </Group>
          </Group>

          <Card withBorder radius="xl">
            <Stack>
              <Stack>
                <Text size="sm" fw={700} c="dimmed" tt="uppercase">
                  Practice profile
                </Text>
                <Title order={2}>Question order</Title>
              </Stack>

              <Text c="dimmed">
                Set whether questions follow the multiplication table or appear
                in a shuffled order.
              </Text>

              <SimpleGrid component="section">
                <Card withBorder radius="lg">
                  <Stack>
                    <Stack>
                      <Group>
                        <Text fw={700}>In order</Text>
                        <Badge size="sm" variant="filled" color="teal">
                          Selected
                        </Badge>
                      </Group>
                      <Text size="sm" c="dimmed">
                        Questions stay in the table sequence from start to
                        finish.
                      </Text>
                    </Stack>

                    <Text size="sm" fw={600} c="teal">
                      Structured
                    </Text>
                  </Stack>
                </Card>

                <Card withBorder radius="lg">
                  <Stack>
                    <Stack>
                      <Text fw={700}>Randomized</Text>
                      <Text size="sm" c="dimmed">
                        Questions are shuffled within the table for extra
                        variety.
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
        </Stack>
      </Card>
    </Center>
  );
};

export default SettingsScreen;
