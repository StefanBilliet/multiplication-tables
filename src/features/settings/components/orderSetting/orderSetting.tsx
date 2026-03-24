import { SimpleGrid, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { QuestionOrderMode } from "../../../../shared/store/appStore.ts";
import classes from "../settingsScreen.module.css";
import OrderOption from "./orderOption.tsx";

type OrderSettingProps = {
  currentMode: QuestionOrderMode;
  onChange: (mode: QuestionOrderMode) => void;
};

export const OrderSetting: FC<OrderSettingProps> = ({
  currentMode,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack>
        <Text size="sm" fw={700} c="dimmed" tt="uppercase">
          {t("settingsScreen.sectionLabel")}
        </Text>
        <Title id="settings-screen-question-order-title" order={2}>
          {t("settingsScreen.questionOrderTitle")}
        </Title>
      </Stack>

      <Text c="dimmed">{t("settingsScreen.questionOrderDescription")}</Text>

      <SimpleGrid
        component="section"
        role="radiogroup"
        aria-labelledby="settings-screen-question-order-title"
        className={classes.optionsGrid}
      >
        <OrderOption
          isSelected={currentMode === "structured"}
          title={t("settingsScreen.inOrderTitle")}
          description={t("settingsScreen.inOrderDescription")}
          mode="structured"
          modeLabel={t("settingsScreen.structuredLabel")}
          onSelect={onChange}
        />

        <OrderOption
          isSelected={currentMode === "varied"}
          title={t("settingsScreen.randomizedTitle")}
          description={t("settingsScreen.randomizedDescription")}
          mode="varied"
          modeLabel={t("settingsScreen.variedLabel")}
          onSelect={onChange}
        />
      </SimpleGrid>
    </Stack>
  );
};
