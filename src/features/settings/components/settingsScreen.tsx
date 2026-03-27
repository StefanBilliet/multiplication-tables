import { Badge, Button, Card, Center, Group, Stack, Text, Title } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../../../shared/i18n/languageSwitcher.tsx';
import BackButton from '../../../shared/navigation/backButton.tsx';
import { useAppStore } from '../../../shared/store/appStore.ts';
import HesitationRuleOption from './hesitationRuleOption.tsx';
import { OrderSetting } from './orderSetting/orderSetting.tsx';
import classes from './settingsScreen.module.css';

const SettingsScreen: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const questionOrderMode = useAppStore((state) => state.questionOrderMode);
  const setQuestionOrderMode = useAppStore((state) => state.setQuestionOrderMode);
  const isHesitationRuleEnabled = useAppStore((state) => state.isHesitationRuleEnabled);
  const setHesitationRuleEnabled = useAppStore((state) => state.setHesitationRuleEnabled);

  return (
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Stack>
          <Group component="header">
            <Stack>
              <Badge variant="light" color="teal">
                {t('settingsScreen.badge')}
              </Badge>

              <Title order={1}>{t('settingsScreen.title')}</Title>

              <Text c="dimmed">{t('settingsScreen.description')}</Text>
            </Stack>

            <Group>
              <LanguageSwitcher />
              <BackButton />
            </Group>
          </Group>

          <Card component="main" withBorder radius="xl">
            <Stack>
              <OrderSetting currentMode={questionOrderMode} onChange={setQuestionOrderMode} />

              <HesitationRuleOption isEnabled={isHesitationRuleEnabled} onToggle={setHesitationRuleEnabled} />

              <Button
                fullWidth
                justify="space-between"
                variant="subtle"
                color="teal"
                radius="lg"
                rightSection={<IconChevronRight />}
                onClick={() => navigate('/practice-history')}
              >
                {t('settingsScreen.practiceHistoryButton')}
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Center>
  );
};

export default SettingsScreen;
