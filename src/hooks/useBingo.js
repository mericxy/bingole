import { useState, useEffect } from "react";
import { createBingoSet, drawBall, getBingoLetter } from "../utils/bingo";

const STORAGE_KEY = "bingo_game_state";

export function useBingo(totalBalls = 75) {
  // Carrega estado salvo do localStorage
  const loadState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved);
        return {
          available: state.available || createBingoSet(totalBalls),
          history: state.history || [],
          current: state.current || null,
        };
      }
    } catch (error) {
      console.error("Erro ao carregar dados do bingo:", error);
    }
    return {
      available: createBingoSet(totalBalls),
      history: [],
      current: null,
    };
  };

  const initialState = loadState();

  const [available, setAvailable] = useState(initialState.available);
  const [history, setHistory] = useState(initialState.history);
  const [current, setCurrent] = useState(initialState.current);

  // Salva o estado no localStorage sempre que houver mudanças
  useEffect(() => {
    try {
      const state = {
        available,
        history,
        current,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Erro ao salvar dados do bingo:", error);
    }
  }, [available, history, current]);

  function draw() {
    if (available.length === 0) return;

    const { ball, remaining } = drawBall(available);

    const ballData = {
      value: ball,
      letter: getBingoLetter(ball),
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