import { useState } from "react";
import { createBingoSet, drawBall, getBingoLetter } from "../utils/bingo";

export function useBingo(totalBalls = 75) {
  const [available, setAvailable] = useState(() =>
    createBingoSet(totalBalls)
  );
  const [history, setHistory] = useState([]);
  const [current, setCurrent] = useState(null);

  function draw() {
    if (available.length === 0) return;

    const { ball, remaining } = drawBall(available);

    const ballData = {
      value: ball,
      letter: getBingoLetter(ball)
    };

    setAvailable(remaining);
    setHistory((prev) => [...prev, ballData]);
    setCurrent(ballData);
  }

  function reset() {
    setAvailable(createBingoSet(totalBalls));
    setHistory([]);
    setCurrent(null);
  }

  return {
    current,
    history,
    remaining: available.length,
    draw,
    reset,
  };
}
