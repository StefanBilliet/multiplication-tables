import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { QuestionOrderMode } from '../../../../shared/models/questionOrderMode.ts';
import { semanticColors } from '../../../../theme/semanticColors';
import classes from '../settingsScreen.module.css';

type OrderOptionProps = {
  isSelected: boolean;
  title: string;
  description: string;
  mode: QuestionOrderMode;
  modeLabel: string;
  onSelect: (mode: QuestionOrderMode) => void;
};

const OrderOption: FC<OrderOptionProps> = ({ isSelected, title, description, mode, modeLabel, onSelect }) => {
  const { t } = useTranslation();

  return (
    <Card
      component="label"
      withBorder
      radius="lg"
      className={`${classes.optionCard} ${isSelected ? classes.optionCardSelected : ''}`}
    >
      <input
        className={classes.optionInput}
        type="radio"
        name="question-order"
        aria-label={title}
        checked={isSelected}
        onChange={() => onSelect(mode)}
        value={mode}
      />
      <Stack className={classes.optionCardContent}>
        <Stack>
          <Group className={classes.optionHeader}>
            <Text component="h3" fw={700} size="md">
              {title}
            </Text>
            {isSelected ? (
              <Badge size="sm" variant="filled" color={semanticColors.primary}>
                {t('settingsScreen.selectedBadge')}
              </Badge>
            ) : null}
          </Group>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </Stack>

        <Text size="sm" fw={600} c={isSelected ? semanticColors.primary : 'dimmed'}>
          {modeLabel}
        </Text>
      </Stack>
    </Card>
  );
};

export default OrderOption;
