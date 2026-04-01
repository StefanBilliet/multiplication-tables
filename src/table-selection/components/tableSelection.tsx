import { Badge, Card, Center, Group, Stack, Text, Title } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../app/components/languageSwitcher';
import SettingsButton from '../../app/components/settingsButton';
import useLifetimeRewardTotal from '../../app/hooks/useLifetimeRewardTotal';
import { semanticColors } from '../../platform/theme/semanticColors';
import { PracticeSection } from './practiceSection.tsx';
import classes from './tableSelection.module.css';
import { TestSection } from './testSection.tsx';
import { useMultiplicationTables } from './useMultiplicationTables.tsx';

const TableSelection: FC = () => {
  const { lifetimeRewardTotal } = useLifetimeRewardTotal();
  const tables = useMultiplicationTables(lifetimeRewardTotal);
  const { t } = useTranslation();

  return (
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Group component="header">
          <Stack>
            <Badge variant="light" color={semanticColors.primary}>
              {t('tableSelection.startScreenBadge')}
            </Badge>
            <Title order={1}>{t('tableSelection.title')}</Title>
            <Text>{t('tableSelection.description')}</Text>
          </Stack>

          <Group gap="xs">
            <LanguageSwitcher />
            <SettingsButton />
          </Group>
        </Group>

        <PracticeSection tables={tables} />
        <TestSection />
      </Card>
    </Center>
  );
};

export default TableSelection;
