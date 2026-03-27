import { Button, Card, Group } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation();

  return (
    <Card withBorder radius="xl" px="xs" py={4} shadow="sm">
      <Group gap={4} wrap="nowrap">
        <Button
          color="teal"
          radius="xl"
          size="sm"
          variant={i18n.resolvedLanguage === 'nl' ? 'filled' : 'subtle'}
          aria-label={t('languageSwitcher.switchToDutch')}
          onClick={() => i18n.changeLanguage('nl')}
        >
          NL
        </Button>
        <Button
          color="teal"
          radius="xl"
          size="sm"
          variant={i18n.resolvedLanguage === 'en' ? 'filled' : 'subtle'}
          aria-label={t('languageSwitcher.switchToEnglish')}
          onClick={() => i18n.changeLanguage('en')}
        >
          EN
        </Button>
      </Group>
    </Card>
  );
};

export default LanguageSwitcher;
