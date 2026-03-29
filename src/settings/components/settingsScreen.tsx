import { Button, Card, Center, Stack } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../app/components/backButton.tsx';
import LanguageSwitcher from '../../app/components/languageSwitcher.tsx';
import ScreenHeader from '../../app/components/screenHeader.tsx';
import { useAppStore } from '../../app/store/appStore.ts';
import { semanticColors } from '../../platform/theme/semanticColors';
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
          <ScreenHeader
            badge={t('settingsScreen.badge')}
            title={t('settingsScreen.title')}
            description={t('settingsScreen.description')}
          >
            <LanguageSwitcher />
            <BackButton />
          </ScreenHeader>

          <Card component="main" withBorder radius="xl">
            <Stack>
              <OrderSetting currentMode={questionOrderMode} onChange={setQuestionOrderMode} />

              <HesitationRuleOption isEnabled={isHesitationRuleEnabled} onToggle={setHesitationRuleEnabled} />

              <Button
                fullWidth
                justify="space-between"
                variant="subtle"
                color={semanticColors.primary}
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
