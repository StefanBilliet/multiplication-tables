import { Group, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../../shared/i18n/languageSwitcher";
import classes from "./header.module.css";

type HeaderProps = {
  description?: string;
  selectedTable: number;
};

const Header: FC<HeaderProps> = ({ description, selectedTable }) => {
  const { t } = useTranslation();

  return (
    <Group component="header" className={classes.header}>
      <Stack>
        <Title order={1}>
          {t("practiceSession.header.title", { table: selectedTable })}
        </Title>
        <Text c="dimmed">
          {description ?? t("practiceSession.header.defaultDescription")}
        </Text>
      </Stack>

      <LanguageSwitcher />
    </Group>
  );
};

export default Header;
