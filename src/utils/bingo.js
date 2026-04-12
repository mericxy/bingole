export const BINGO_LETTERS = ["B", "I", "N", "G", "O"];

export const GAME_MODES = [
  { id: "60", label: "60 bolas", totalBalls: 60 },
  { id: "75", label: "75 bolas", totalBalls: 75 },
  { id: "90", label: "90 bolas", totalBalls: 90 },
];

export function getGameMode(modeId = "75") {
  return GAME_MODES.find((mode) => mode.id === modeId) ?? GAME_MODES[1];
}

export function createBingoSet(total = 75) {
  return Array.from({ length: total }, (_, i) => i + 1);
}

export function getBingoLetter(number, total = 75) {
  const bucketSize = total / BINGO_LETTERS.length;
  const index = Math.min(
    Math.floor((Math.max(number, 1) - 1) / bucketSize),
    BINGO_LETTERS.length - 1,
  );

  return BINGO_LETTERS[index];
}

export function createRemainingByLetterMap() {
  return BINGO_LETTERS.reduce((acc, letter) => {
    acc[letter] = 0;
    return acc;
  }, {});
}

export function countRemainingByLetter(availableBalls, total = 75) {
  return availableBalls.reduce((acc, ball) => {
    const letter = getBingoLetter(ball, total);
    acc[letter] += 1;
    return acc;
  }, createRemainingByLetterMap());
}

export function drawBall(availableBalls) {
  const index = Math.floor(Math.random() * availableBalls.length);
  const ball = availableBalls[index];

  const remaining = availableBalls.filter((_, i) => i !== index);

  return {
    ball,
    remaining,
  };
}
