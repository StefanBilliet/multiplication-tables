import { Card, Center, Stack } from "@mantine/core";
import { type FC, useState } from "react";
import { useParams } from "react-router-dom";
import PracticeSession from "../models/practiceSession";
import ActiveSessionMode from "./activeSessionMode";
import Header from "./header";
import SummaryMode from "./summaryMode";
import useLifetimeRewardTotal from "./useLifetimeRewardTotal";

const PracticeScreen: FC = () => {
  const { tableId } = useParams();
  const selectedTable = Number(tableId);
  const [session, setSession] = useState(() =>
    PracticeSession.start(selectedTable),
  );
  const { addReward } = useLifetimeRewardTotal();
  const handleSelectAnswer = (answer: number) => {
    setSession((currentSession) =>
      PracticeSession.selectAnswer(currentSession, answer),
    );
  };

  const handleCheckAnswer = () => {
    setSession((currentSession) => PracticeSession.checkAnswer(currentSession));
  };

  const handleContinue = () => {
    const nextSession = PracticeSession.continueSession(session);

    if (
      nextSession.isComplete &&
      PracticeSession.hasEarnedReward(nextSession)
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
              session.isComplete
                ? "You've completed this practice session."
                : undefined
            }
            selectedTable={selectedTable}
          />

          {session.isComplete ? (
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
