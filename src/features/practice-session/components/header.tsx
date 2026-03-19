import { Group, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type HeaderProps = {
  description?: string;
  selectedTable: number;
};

const Header: FC<HeaderProps> = ({ description, selectedTable }) => {
  const { t } = useTranslation();

  return (
    <Group justify="space-between" align="flex-start">
      <Stack gap={8}>
        <Title order={1}>
          {t("practiceSession.header.title", { table: selectedTable })}
        </Title>
        <Text c="dimmed" maw={520}>
          {description ?? t("practiceSession.header.defaultDescription")}
        </Text>
      </Stack>
    </Group>
  );
};

export default Header;
