import { Card, Center, Stack } from "@mantine/core";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PracticeFlow from "../models/practiceFlow";
import ActiveSessionMode from "./activeSessionMode";
import Header from "./header";
import SummaryMode from "./summaryMode";
import usePracticeSession from "./usePracticeSession";

const PracticeScreen: FC = () => {
  const { tableId } = useParams();
  const { t } = useTranslation();
  const selectedTable = Number(tableId);
  const {
    session,
    selectAnswer: handleSelectAnswer,
    checkAnswer: handleCheckAnswer,
    continueSession: handleContinue,
  } = usePracticeSession(selectedTable);

  return (
    <Center mih="100vh" p={{ base: "md", sm: "xl" }}>
      <Card w="100%" maw={720} variant="shell">
        <Stack gap="xl">
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
              session={session}
              selectedTable={selectedTable}
              onCheckAnswer={handleCheckAnswer}
              onContinue={handleContinue}
              onSelectAnswer={handleSelectAnswer}
            />
          )}
        </Stack>
      </Card>
    </Center>
  );
};

export default PracticeScreen;
