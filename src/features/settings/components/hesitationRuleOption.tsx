import { Badge, Card, Group, Stack, Text, Title } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { semanticColors } from '../../../theme/semanticColors';
import classes from './settingsScreen.module.css';

type HesitationRuleOptionProps = {
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
};

const HesitationRuleOption: FC<HesitationRuleOptionProps> = ({ isEnabled, onToggle }) => {
  const { t } = useTranslation();

  return (
    <Card
      component="label"
      withBorder
      radius="lg"
      className={`${classes.optionCard} ${isEnabled ? classes.optionCardSelected : ''}`}
    >
      <input
        className={classes.optionInput}
        type="checkbox"
        aria-label={t('settingsScreen.hesitationRuleTitle')}
        checked={isEnabled}
        onClick={() => onToggle(!isEnabled)}
        readOnly
      />
      <Stack className={classes.optionCardContent}>
        <Stack>
          <Text size="sm" fw={700} c="dimmed" tt="uppercase">
            {t('settingsScreen.hesitationRuleSectionLabel')}
          </Text>
          <Group className={classes.optionHeader}>
            <Title order={3}>{t('settingsScreen.hesitationRuleTitle')}</Title>
            {isEnabled ? (
              <Badge size="sm" variant="filled" color={semanticColors.primary}>
                {t('settingsScreen.selectedBadge')}
              </Badge>
            ) : null}
          </Group>
          <Text size="sm" c="dimmed">
            {t('settingsScreen.hesitationRuleDescription')}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export default HesitationRuleOption;
