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
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../../shared/i18n/languageSwitcher.tsx";
import classes from "./settingsScreen.module.css";

const SettingsScreen: FC = () => {
  const { t } = useTranslation();

  return (
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Stack>
          <Group component="header">
            <Stack>
              <Badge variant="light" color="teal">
                {t("settingsScreen.badge")}
              </Badge>

              <Title order={1}>{t("settingsScreen.title")}</Title>

              <Text c="dimmed">{t("settingsScreen.description")}</Text>
            </Stack>

            <Group>
              <LanguageSwitcher />
              <ActionIcon
                className={classes.backButton}
                radius="xl"
                aria-label={t("settingsScreen.backButtonLabel")}
                size="lg"
              >
                <IconChevronLeft stroke={1.5} />
              </ActionIcon>
            </Group>
          </Group>

          <Card component="main" withBorder radius="xl">
            <Stack>
              <Stack>
                <Text size="sm" fw={700} c="dimmed" tt="uppercase">
                  {t("settingsScreen.sectionLabel")}
                </Text>
                <Title order={2}>
                  {t("settingsScreen.questionOrderTitle")}
                </Title>
              </Stack>

              <Text c="dimmed">
                {t("settingsScreen.questionOrderDescription")}
              </Text>

              <SimpleGrid component="section">
                <Card withBorder radius="lg">
                  <Stack>
                    <Stack>
                      <Group>
                        <Text fw={700}>{t("settingsScreen.inOrderTitle")}</Text>
                        <Badge size="sm" variant="filled" color="teal">
                          {t("settingsScreen.selectedBadge")}
                        </Badge>
                      </Group>
                      <Text size="sm" c="dimmed">
                        {t("settingsScreen.inOrderDescription")}
                      </Text>
                    </Stack>

                    <Text size="sm" fw={600} c="teal">
                      {t("settingsScreen.structuredLabel")}
                    </Text>
                  </Stack>
                </Card>

                <Card withBorder radius="lg">
                  <Stack>
                    <Stack>
                      <Text fw={700}>
                        {t("settingsScreen.randomizedTitle")}
                      </Text>
                      <Text size="sm" c="dimmed">
                        {t("settingsScreen.randomizedDescription")}
                      </Text>
                    </Stack>

                    <Text size="sm" fw={600} c="dimmed">
                      {t("settingsScreen.variedLabel")}
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
