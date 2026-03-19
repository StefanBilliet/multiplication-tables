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
import { useNavigate } from "react-router-dom";
import useLifetimeRewardTotal from "../../../shared/rewards/useLifetimeRewardTotal";
import { calculateRewardsNeeded } from "./calculateRewardsNeeded";
import MultiplicationTableCard from "./multiplicationTableCard";

const TableSelection: FC = () => {
  const navigate = useNavigate();
  const { lifetimeRewardTotal } = useLifetimeRewardTotal();
  const tables = Array.from({ length: 10 }, (_, index) => {
    const id = index + 1;
    const rewardsNeeded = calculateRewardsNeeded(lifetimeRewardTotal, id);

    return {
      id,
      label: `${id} times table`,
      unlockState: {
        rewardsNeeded,
        unlocked: rewardsNeeded === 0,
      },
    };
  });

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
                Start screen
              </Badge>
              <Title order={1}>Choose a table to practice</Title>
              <Text maw={560}>
                Pick any table that is ready. Locked tables stay visible so a
                child can see what opens up next.
              </Text>
            </Stack>
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
