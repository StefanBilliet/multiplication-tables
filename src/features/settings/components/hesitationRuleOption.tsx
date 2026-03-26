import { Card, Group, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import classes from "./settingsScreen.module.css";

const HesitationRuleOption: FC = () => {
  const { t } = useTranslation();

  return (
    <Card
      component="label"
      withBorder
      radius="lg"
      className={classes.optionCard}
    >
      <input
        className={classes.optionInput}
        type="checkbox"
        aria-label={t("settingsScreen.hesitationRuleTitle")}
        readOnly
      />
      <Stack className={classes.optionCardContent}>
        <Stack>
          <Text size="sm" fw={700} c="dimmed" tt="uppercase">
            {t("settingsScreen.hesitationRuleSectionLabel")}
          </Text>
          <Group className={classes.optionHeader}>
            <Title order={2}>{t("settingsScreen.hesitationRuleTitle")}</Title>
          </Group>
          <Text size="sm" c="dimmed">
            {t("settingsScreen.hesitationRuleDescription")}
          </Text>
        </Stack>

        <Text size="sm" fw={600} c="dimmed">
          Disabled
        </Text>
      </Stack>
    </Card>
  );
};

export default HesitationRuleOption;
