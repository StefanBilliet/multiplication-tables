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
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useLifetimeRewardTotal from "../../../shared/rewards/useLifetimeRewardTotal";
import LanguageSwitcher from "./languageSwitcher";
import MultiplicationTableCard from "./multiplicationTableCard";
import { useMultiplicationTables } from "./useMultiplicationTables.tsx";

const TableSelection: FC = () => {
  const navigate = useNavigate();
  const { lifetimeRewardTotal } = useLifetimeRewardTotal();
  const tables = useMultiplicationTables(lifetimeRewardTotal);
  const { t } = useTranslation();

  const handleTableSelected = (tableId: number) => {
    navigate(`/tables/${tableId}/practice`);
  };

  return (
    <Center mih="100vh" p={{ base: "md", sm: "xl" }}>
      <Card w="100%" maw={720} variant="shell">
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <Stack gap={8}>
              <Badge variant="light" color="teal" w="fit-content">
                {t("tableSelection.startScreenBadge")}
              </Badge>
              <Title order={1}>{t("tableSelection.title")}</Title>
              <Text maw={560}>{t("tableSelection.description")}</Text>
            </Stack>

            <LanguageSwitcher />
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
            {tables.map((table) => (
              <MultiplicationTableCard
                key={table.id}
                table={table}
                onSelect={handleTableSelected}
              />
            ))}
          </SimpleGrid>
        </Stack>
      </Card>
    </Center>
  );
};

export default TableSelection;
