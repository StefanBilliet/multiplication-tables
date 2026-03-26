import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../../shared/i18n/languageSwitcher.tsx";
import { useAppStore } from "../../../shared/store/appStore.ts";
import HesitationRuleOption from "./hesitationRuleOption.tsx";
import { OrderSetting } from "./orderSetting/orderSetting.tsx";
import classes from "./settingsScreen.module.css";

const SettingsScreen: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const questionOrderMode = useAppStore((state) => state.questionOrderMode);
  const setQuestionOrderMode = useAppStore(
    (state) => state.setQuestionOrderMode,
  );

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
                onClick={() => navigate("/")}
              >
                <IconChevronLeft stroke={1.5} />
              </ActionIcon>
            </Group>
          </Group>

          <Card component="main" withBorder radius="xl">
            <Stack>
              <OrderSetting
                currentMode={questionOrderMode}
                onChange={setQuestionOrderMode}
              />

              <HesitationRuleOption />
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Center>
  );
};

export default SettingsScreen;
