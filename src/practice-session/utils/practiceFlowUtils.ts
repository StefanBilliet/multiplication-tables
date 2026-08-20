export function shuffleAnswerOptions(answerOptions: number[], random: () => number = Math.random): number[] {
  const shuffledAnswerOptions = [...answerOptions];

  for (let currentIndex = shuffledAnswerOptions.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(random() * (currentIndex + 1));

    [shuffledAnswerOptions[currentIndex], shuffledAnswerOptions[randomIndex]] = [
      shuffledAnswerOptions[randomIndex],
      shuffledAnswerOptions[currentIndex],
    ];
  }

  return shuffledAnswerOptions;
}
