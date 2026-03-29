import { Badge, Group, Stack, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';
import { semanticColors } from '../../platform/theme/semanticColors';

type ScreenHeaderProps = {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
};

const ScreenHeader = ({ badge, title, description, children }: ScreenHeaderProps) => (
  <Group component="header">
    <Stack>
      <Badge variant="light" color={semanticColors.primary}>
        {badge}
      </Badge>

      <Title order={1}>{title}</Title>

      <Text c="dimmed">{description}</Text>
    </Stack>

    <Group>{children}</Group>
  </Group>
);

export default ScreenHeader;
