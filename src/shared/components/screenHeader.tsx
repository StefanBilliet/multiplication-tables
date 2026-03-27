import { Badge, Group, Stack, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';

type ScreenHeaderProps = {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
};

const ScreenHeader = ({ badge, title, description, children }: ScreenHeaderProps) => (
  <Group component="header">
    <Stack>
      <Badge variant="light" color="teal">
        {badge}
      </Badge>

      <Title order={1}>{title}</Title>

      <Text c="dimmed">{description}</Text>
    </Stack>

    <Group>{children}</Group>
  </Group>
);

export default ScreenHeader;
