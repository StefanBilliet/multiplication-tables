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
const REWARD_ELIGIBILITY_THRESHOLD = 7;

const shuffleAnswerOptions = (
  answerOptions: Array<number>,
  seed: number,
): Array<number> => {
  const shuffledAnswerOptions = [...answerOptions];
  let currentSeed = seed;

  for (
    let currentIndex = shuffledAnswerOptions.length - 1;
    currentIndex > 0;
    currentIndex -= 1
  ) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const randomIndex = currentSeed % (currentIndex + 1);

    [shuffledAnswerOptions[currentIndex], shuffledAnswerOptions[randomIndex]] =
      [shuffledAnswerOptions[randomIndex], shuffledAnswerOptions[currentIndex]];
  }

  return shuffledAnswerOptions;
};

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
    const answerOptions = Array.from(
      { length: LAST_MULTIPLIER },
      (_, index) => session.selectedTable * (index + 1),
    );

    return shuffleAnswerOptions(
      answerOptions,
      session.selectedTable * 100 + session.currentMultiplier,
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

  feedbackState(session: PracticeSession): "correct" | "incorrect" | null {
    return session.answerState.kind === "validated"
      ? session.answerState.result
      : null;
  },

  feedbackAnimation(session: PracticeSession): "pop" | "wobble" | null {
    return session.answerState.kind === "validated"
      ? session.answerState.result === "correct"
        ? "pop"
        : "wobble"
      : null;
  },

  feedback(session: PracticeSession): string | null {
    return session.answerState.kind === "validated"
      ? AnswerState.feedback(session.answerState)
      : null;
  },

  hasEarnedReward(session: PracticeSession): boolean {
    return session.firstTryCorrectAnswerCount >= REWARD_ELIGIBILITY_THRESHOLD;
  },
};

export default PracticeSession;
