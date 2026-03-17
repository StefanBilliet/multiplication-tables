import AnswerState, {
  type AnswerState as AnswerStateType,
} from "./answerState";

export type PracticeSession = {
  selectedTable: number;
  currentMultiplier: number;
  firstTryCorrectAnswerCount: number;
  hasRetriedCurrentQuestion: boolean;
  isComplete: boolean;
  answerState: AnswerStateType;
};

const LAST_MULTIPLIER = 10;

const PracticeSession = {
  start(selectedTable: number): PracticeSession {
    return {
      selectedTable,
      currentMultiplier: 1,
      firstTryCorrectAnswerCount: 0,
      hasRetriedCurrentQuestion: false,
      isComplete: false,
      answerState: { kind: "idle" },
    };
  },

  answerOptions(session: PracticeSession): Array<number> {
    return Array.from(
      { length: LAST_MULTIPLIER },
      (_, index) => session.selectedTable * (index + 1),
    );
  },

  canCheck(session: PracticeSession): boolean {
    return AnswerState.canCheck(session.answerState);
  },

  selectAnswer(session: PracticeSession, answer: number): PracticeSession {
    return {
      ...session,
      answerState: { kind: "selected", answer },
    };
  },

  checkAnswer(session: PracticeSession): PracticeSession {
    if (!AnswerState.canCheck(session.answerState)) {
      return session;
    }

    const isCorrectAnswer =
      session.answerState.answer ===
      session.currentMultiplier * session.selectedTable;

    return {
      ...session,
      firstTryCorrectAnswerCount:
        isCorrectAnswer && !session.hasRetriedCurrentQuestion
          ? session.firstTryCorrectAnswerCount + 1
          : session.firstTryCorrectAnswerCount,
      hasRetriedCurrentQuestion: isCorrectAnswer
        ? session.hasRetriedCurrentQuestion
        : true,
      answerState: {
        kind: "validated",
        answer: session.answerState.answer,
        result: isCorrectAnswer ? "correct" : "incorrect",
      },
    };
  },

  continueSession(session: PracticeSession): PracticeSession {
    if (session.currentMultiplier === LAST_MULTIPLIER) {
      return {
        ...session,
        isComplete: true,
      };
    }

    return {
      ...session,
      currentMultiplier: session.currentMultiplier + 1,
      hasRetriedCurrentQuestion: false,
      answerState: { kind: "idle" },
    };
  },

  hasCorrectFeedback(session: PracticeSession): boolean {
    return AnswerState.isCorrect(session.answerState);
  },

  selectedAnswer(session: PracticeSession): number | null {
    return AnswerState.selectedAnswer(session.answerState);
  },

  feedback(session: PracticeSession): string | null {
    return session.answerState.kind === "validated"
      ? AnswerState.feedback(session.answerState)
      : null;
  },
};

export default PracticeSession;
