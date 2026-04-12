import { useEffect, useRef, useState } from "react";
import Layout from "./components/Layout";
import BingoBall from "./components/BingoBall";
import Controls from "./components/Controls";
import History from "./components/History";
import FloatingFooter from "./components/FloatingFooter";
import ModeSelector from "./components/ModeSelector";
import RemainingPanel from "./components/RemainingPanel";
import { useBingo } from "./hooks/useBingo";
import { GAME_MODES } from "./utils/bingo";

const GAME_MODE_STORAGE_KEY = "bingo_selected_mode";

function BingoGame({ modeId, theaterMode, onToggleTheaterMode }) {
  const bingo = useBingo(modeId);

  return (
    <>
      <BingoBall value={bingo.current} theaterMode={theaterMode} />

      <Controls
        onDraw={bingo.draw}
        onReset={bingo.reset}
        disabled={bingo.remaining === 0}
        onToggleTheaterMode={onToggleTheaterMode}
        theaterMode={theaterMode}
      />

      <RemainingPanel
        remaining={bingo.remaining}
        totalBalls={bingo.mode.totalBalls}
        remainingByLetter={bingo.remainingByLetter}
        theaterMode={theaterMode}
      />

      <History items={bingo.history} theaterMode={theaterMode} />
    </>
  );
}

export default function App() {
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [selectedModeId, setSelectedModeId] = useState(() => {
    try {
      return localStorage.getItem(GAME_MODE_STORAGE_KEY) || "75";
    } catch (error) {
      console.error("Erro ao carregar modo do bingo:", error);
      return "75";
    }
  });
  const appRef = useRef(null);

  useEffect(() => {
    function syncFullscreenState() {
      setIsTheaterMode(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", syncFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(GAME_MODE_STORAGE_KEY, selectedModeId);
    } catch (error) {
      console.error("Erro ao salvar modo do bingo:", error);
    }
  }, [selectedModeId]);

  async function handleToggleTheaterMode() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await appRef.current?.requestFullscreen();
    } catch (error) {
      console.error("Erro ao alternar modo telao:", error);
    }
  }

  return (
    <Layout ref={appRef} theaterMode={isTheaterMode}>
      <h1 className="text-2xl font-bold text-center">Bingole</h1>

      <ModeSelector
        modes={GAME_MODES}
        value={selectedModeId}
        onChange={setSelectedModeId}
        theaterMode={isTheaterMode}
      />

      <BingoGame
        key={selectedModeId}
        modeId={selectedModeId}
        theaterMode={isTheaterMode}
        onToggleTheaterMode={handleToggleTheaterMode}
      />

      <FloatingFooter />
    </Layout>
  );
}
