import { useEffect, useRef, useState } from "react";
import Layout from "./components/Layout";
import BingoBall from "./components/BingoBall";
import Controls from "./components/Controls";
import History from "./components/History";
import FloatingFooter from "./components/FloatingFooter";
import { useBingo } from "./hooks/useBingo";

export default function App() {
  const bingo = useBingo(75);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
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

      <BingoBall value={bingo.current} theaterMode={isTheaterMode} />

      <Controls
        onDraw={bingo.draw}
        onReset={bingo.reset}
        disabled={bingo.remaining === 0}
        onToggleTheaterMode={handleToggleTheaterMode}
        theaterMode={isTheaterMode}
      />

      <History items={bingo.history} theaterMode={isTheaterMode} />

      <FloatingFooter />
    </Layout>
  );
}
