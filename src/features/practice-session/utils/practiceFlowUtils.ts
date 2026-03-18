export function shuffleAnswerOptions(
  answerOptions: number[],
  seed: number,
): number[] {
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
}
