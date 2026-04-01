import { Button, Card, Stack, Text, Title } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const TestSection: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card component="section" withBorder radius="xl" aria-labelledby="test-mode-heading">
      <Stack gap="md">
        <Stack gap="xs">
          <Text size="sm" fw={700} tt="uppercase" c="dimmed">
            {t('testSection.sectionLabel')}
          </Text>
          <Title id="test-mode-heading" order={2}>
            {t('testSection.title')}
          </Title>
          <Text c="dimmed">{t('testSection.description')}</Text>
        </Stack>

        <Button fullWidth size="lg" radius="lg" onClick={() => navigate('/test')}>
          {t('testSection.startButton')}
        </Button>
      </Stack>
    </Card>
  );
};
