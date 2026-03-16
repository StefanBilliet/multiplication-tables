import {
  Button,
  Card,
  Center,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { type FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PracticeScreen: FC = () => {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const selectedTable = Number(tableId);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const answerOptions = Array.from(
    { length: 10 },
    (_, index) => selectedTable * (index + 1),
  );
  const correctAnswer = currentMultiplier * selectedTable;

  return (
    <Center mih="100vh" p={{ base: "md", sm: "xl" }}>
      <Card w="100%" maw={720} variant="shell">
        <Stack gap="xl">
          <Group justify="space-between" align="flex-start">
            <Stack gap={8}>
              <Title order={1}>Practice the {selectedTable} times table</Title>
              <Text c="dimmed" maw={520}>
                Solve each question one by one. Keep going until all 10 are
                done.
              </Text>
            </Stack>
          </Group>

          <Paper radius="xl" p="xl" bg="teal.0" withBorder>
            <Stack gap="md" align="center">
              <Text size="sm" tt="uppercase" fw={700} c="teal.8">
                Current question
              </Text>
              <Title order={2} size="h1">
                {currentMultiplier} x {selectedTable} = ?
              </Title>
            </Stack>
          </Paper>

          <Stack gap="md">
            <Text fw={600}>Answer</Text>

            <TextInput
              label="Answer"
              readOnly
              value={selectedAnswer === null ? "" : String(selectedAnswer)}
              placeholder="Choose a number"
              size="lg"
              radius="lg"
              styles={{
                label: { display: "none" },
                input: {
                  backgroundColor: "var(--mantine-color-white)",
                  borderColor: "rgba(23, 49, 55, 0.12)",
                  color:
                    selectedAnswer === null
                      ? "var(--mantine-color-dimmed)"
                      : "var(--mantine-color-dark-8)",
                  fontSize: "var(--mantine-font-size-xl)",
                  fontWeight: 700,
                  minHeight: "3.5rem",
                },
              }}
            />

            <SimpleGrid cols={3} spacing="sm">
              {answerOptions.map((answerOption) => (
                <Button
                  key={answerOption}
                  variant="default"
                  onClick={() => setSelectedAnswer(answerOption)}
                >
                  {answerOption}
                </Button>
              ))}
            </SimpleGrid>

            {feedback !== null ? <Text>{feedback}</Text> : null}
          </Stack>

          <Group justify="space-between">
            <Button size="md" variant="default" onClick={() => navigate("/")}>
              Back to tables
            </Button>

            {feedback === "Correct!" ? (
              <Button
                variant="default"
                size="md"
                onClick={() => {
                  setCurrentMultiplier(
                    (previousMultiplier) => previousMultiplier + 1,
                  );
                  setSelectedAnswer(null);
                  setFeedback(null);
                }}
              >
                Continue
              </Button>
            ) : (
              <Button
                size="md"
                disabled={selectedAnswer === null}
                onClick={() => {
                  if (selectedAnswer === correctAnswer) {
                    setFeedback("Correct!");
                    return;
                  }

                  setFeedback("Try again.");
                  setSelectedAnswer(null);
                }}
              >
                Check answer
              </Button>
            )}
          </Group>
        </Stack>
      </Card>
    </Center>
  );
};

export default PracticeScreen;
