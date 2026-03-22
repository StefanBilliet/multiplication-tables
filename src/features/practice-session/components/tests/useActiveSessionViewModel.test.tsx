import { renderHook } from "@testing-library/react";
import type { PracticeFlow } from "../../models/practiceFlow";
import useActiveSessionViewModel from "../useActiveSessionViewModel";

test("GIVEN a current question session, WHEN the hook is created, THEN it returns the active session view model", () => {
  const session: PracticeFlow = {
    kind: "currentQuestion",
    currentQuestion: {
      answerOptions: [12, 18, 15],
      canCheckAnswer: true,
      canContinue: false,
      feedbackState: "incorrect",
      hasRetriedCurrentQuestion: true,
      multiplier: 3,
      selectedAnswer: 15,
      table: 6,
    },
    firstTryCorrectAnswerCount: 2,
  };

  const { result } = renderHook(() => useActiveSessionViewModel(session));

  expect(result.current).toEqual({
    answerOptions: [12, 18, 15],
    canCheck: true,
    feedbackAnimation: "wobble",
    feedbackState: "incorrect",
    hasCorrectFeedback: false,
    multiplier: 3,
    selectedAnswer: 15,
  });
});

test("GIVEN a completed session, WHEN the hook is created, THEN it returns fallback values for the active session view model", () => {
  const session: PracticeFlow = {
    kind: "sessionComplete",
    firstTryCorrectAnswerCount: 8,
    hasEarnedReward: true,
  };

  const { result } = renderHook(() => useActiveSessionViewModel(session));

  expect(result.current).toEqual({
    answerOptions: [],
    canCheck: false,
    feedbackAnimation: null,
    feedbackState: null,
    hasCorrectFeedback: false,
    multiplier: 1,
    selectedAnswer: null,
  });
});
