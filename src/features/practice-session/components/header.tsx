import { Group, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";

type HeaderProps = {
  description?: string;
  selectedTable: number;
};

const Header: FC<HeaderProps> = ({
  description = "Solve each question one by one. Keep going until all 10 are done.",
  selectedTable,
}) => (
  <Group justify="space-between" align="flex-start">
    <Stack gap={8}>
      <Title order={1}>Practice the {selectedTable} times table</Title>
      <Text c="dimmed" maw={520}>
        {description}
      </Text>
    </Stack>
  </Group>
);

export default Header;
