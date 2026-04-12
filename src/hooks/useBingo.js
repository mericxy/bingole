import { useState, useEffect } from "react";
import {
  countRemainingByLetter,
  createBingoSet,
  drawBall,
  getBingoLetter,
  getGameMode,
} from "../utils/bingo";

function getStorageKey(modeId) {
  return `bingo_game_state_${modeId}`;
}

export function useBingo(modeId = "75") {
  const mode = getGameMode(modeId);

  function loadState() {
    try {
      const saved = localStorage.getItem(getStorageKey(mode.id));
      if (saved) {
        const state = JSON.parse(saved);
        return {
          available: state.available || createBingoSet(mode.totalBalls),
          history: state.history || [],
          current: state.current || null,
        };
      }
    } catch (error) {
      console.error("Erro ao carregar dados do bingo:", error);
    }
    return {
      available: createBingoSet(mode.totalBalls),
      history: [],
      current: null,
    };
  }

  const initialState = loadState();

  const [available, setAvailable] = useState(initialState.available);
  const [history, setHistory] = useState(initialState.history);
  const [current, setCurrent] = useState(initialState.current);

  useEffect(() => {
    try {
      const state = {
        available,
        history,
        current,
      };
      localStorage.setItem(getStorageKey(mode.id), JSON.stringify(state));
    } catch (error) {
      console.error("Erro ao salvar dados do bingo:", error);
    }
  }, [available, history, current, mode.id]);

  function draw() {
    if (available.length === 0) return;

    const { ball, remaining } = drawBall(available);

    const ballData = {
      value: ball,
      letter: getBingoLetter(ball, mode.totalBalls),
    };

    setAvailable(remaining);
    setHistory((prev) => [...prev, ballData]);
    setCurrent(ballData);
  }

  function reset() {
    setAvailable(createBingoSet(mode.totalBalls));
    setHistory([]);
    setCurrent(null);
  }

  return {
    mode,
    current,
    history,
    remaining: available.length,
    remainingByLetter: countRemainingByLetter(available, mode.totalBalls),
    drawnCount: history.length,
    draw,
    reset,
  };
}
