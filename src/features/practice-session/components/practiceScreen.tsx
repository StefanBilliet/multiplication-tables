import { Card, Center } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAppStore } from "../../../shared/store/appStore";
import PracticeFlow from "../models/practiceFlow";
import ActiveSessionMode from "./activeSessionMode";
import Header from "./header";
import classes from "./practiceScreen.module.css";
import SummaryMode from "./summaryMode";
import usePracticeSession from "./usePracticeSession";

const PracticeScreen: FC = () => {
  const { tableId } = useParams();
  const { t } = useTranslation();
  const selectedTable = Number(tableId);
  const isHesitationRuleEnabled = useAppStore(
    (state) => state.isHesitationRuleEnabled,
  );
  const {
    session,
    hesitationTimerResetSignal,
    selectAnswer: handleSelectAnswer,
    checkAnswer: handleCheckAnswer,
    continueSession: handleContinue,
    resetSession: handleReset,
  } = usePracticeSession(selectedTable);

  return (
    <Center className={classes.page}>
      <Card variant="shell" className={classes.pageCard}>
        <Header
          description={
            PracticeFlow.isComplete(session)
              ? t("practiceSession.header.completedDescription")
              : undefined
          }
          selectedTable={selectedTable}
        />

        {PracticeFlow.isComplete(session) ? (
          <SummaryMode session={session} />
        ) : (
          <ActiveSessionMode
            isHesitationRuleEnabled={isHesitationRuleEnabled}
            hesitationTimerResetSignal={hesitationTimerResetSignal}
            session={session}
            selectedTable={selectedTable}
            onCheckAnswer={handleCheckAnswer}
            onContinue={handleContinue}
            onHesitationElapsed={handleReset}
            onSelectAnswer={handleSelectAnswer}
          />
        )}
      </Card>
    </Center>
  );
};

export default PracticeScreen;
