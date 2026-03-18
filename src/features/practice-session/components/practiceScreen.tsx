import { Card, Center, Stack } from "@mantine/core";
import { type FC, useState } from "react";
import { useParams } from "react-router-dom";
import PracticeFlow from "../models/practiceFlow";
import ActiveSessionMode from "./activeSessionMode";
import Header from "./header";
import SummaryMode from "./summaryMode";
import useLifetimeRewardTotal from "./useLifetimeRewardTotal";

const PracticeScreen: FC = () => {
  const { tableId } = useParams();
  const selectedTable = Number(tableId);
  const [session, setSession] = useState(() =>
    PracticeFlow.start(selectedTable),
  );
  const { addReward } = useLifetimeRewardTotal();
  const handleSelectAnswer = (answer: number) => {
    setSession((currentSession) =>
      PracticeFlow.selectAnswer(currentSession, answer),
    );
  };

  const handleCheckAnswer = () => {
    setSession((currentSession) => PracticeFlow.checkAnswer(currentSession));
  };

  const handleContinue = () => {
    const nextSession = PracticeFlow.continueSession(session);

    if (
      PracticeFlow.isComplete(nextSession) &&
      PracticeFlow.hasEarnedReward(nextSession)
    ) {
      addReward();
    }

    setSession(nextSession);
  };

  return (
    <Center mih="100vh" p={{ base: "md", sm: "xl" }}>
      <Card w="100%" maw={720} variant="shell">
        <Stack gap="xl">
          <Header
            description={
              PracticeFlow.isComplete(session)
                ? "You've completed this practice session."
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
