export function createBingoSet(total = 75) {
  return Array.from({ length: total }, (_, i) => i + 1);
}

export function getBingoLetter(number) {
  if (number <= 15) return "B";
  if (number <= 30) return "I";
  if (number <= 45) return "N";
  if (number <= 60) return "G";
  return "O";
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
