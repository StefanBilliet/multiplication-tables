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
import LanguageSwitcher from "../../../shared/i18n/languageSwitcher";
import useLifetimeRewardTotal from "../../../shared/rewards/useLifetimeRewardTotal";
import MultiplicationTableCard from "./multiplicationTableCard";
import classes from "./tableSelection.module.css";
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
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Group component="header">
          <Stack>
            <Badge variant="light" color="teal">
              {t("tableSelection.startScreenBadge")}
            </Badge>
            <Title order={1}>{t("tableSelection.title")}</Title>
            <Text>{t("tableSelection.description")}</Text>
          </Stack>

          <LanguageSwitcher />
        </Group>

        <SimpleGrid component="section" cols={{ base: 1, sm: 2, md: 3 }}>
          {tables.map((table) => (
            <MultiplicationTableCard
              key={table.id}
              table={table}
              onSelect={handleTableSelected}
            />
          ))}
        </SimpleGrid>
      </Card>
    </Center>
  );
};

export default TableSelection;
