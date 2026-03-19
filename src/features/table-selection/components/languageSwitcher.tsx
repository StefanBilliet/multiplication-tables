import { Button, Group } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation();

  return (
    <Group gap="xs">
      <Button
        variant={i18n.resolvedLanguage === "nl" ? "filled" : "light"}
        onClick={() => i18n.changeLanguage("nl")}
      >
        {t("tableSelection.switchToDutch")}
      </Button>
      <Button
        variant={i18n.resolvedLanguage === "en" ? "filled" : "light"}
        onClick={() => i18n.changeLanguage("en")}
      >
        {t("tableSelection.switchToEnglish")}
      </Button>
    </Group>
  );
};

export default LanguageSwitcher;
