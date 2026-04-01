import { Button, Card, Stack, Text, Title } from '@mantine/core';
import type { FC } from 'react';

export const TestSection: FC = () => {
  return (
    <Card component="section" withBorder radius="xl" aria-labelledby="test-mode-heading">
      <Stack gap="md">
        <Stack gap="xs">
          <Text size="sm" fw={700} tt="uppercase" c="dimmed">
            Or take a test
          </Text>
          <Title id="test-mode-heading" order={2}>
            20 random questions across unlocked tables
          </Title>
          <Text c="dimmed">Questions are mixed automatically and the result is shown at the end of the session.</Text>
        </Stack>

        <Button fullWidth size="lg" radius="lg">
          Start test mode
        </Button>
      </Stack>
    </Card>
  );
};
