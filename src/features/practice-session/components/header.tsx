import { Group, Stack, Text, Title } from "@mantine/core";
import type { FC } from "react";

type HeaderProps = {
  selectedTable: number;
};

const Header: FC<HeaderProps> = ({ selectedTable }) => (
  <Group justify="space-between" align="flex-start">
    <Stack gap={8}>
      <Title order={1}>Practice the {selectedTable} times table</Title>
      <Text c="dimmed" maw={520}>
        Solve each question one by one. Keep going until all 10 are done.
      </Text>
    </Stack>
  </Group>
);

export default Header;
