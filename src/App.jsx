import Layout from "./components/Layout";
import BingoBall from "./components/BingoBall";
import Controls from "./components/Controls";
import History from "./components/History";
import { useBingo } from "./hooks/useBingo";

export default function App() {
  const bingo = useBingo(75);

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-center">Bingole</h1>

      <BingoBall value={bingo.current} />

      <Controls
        onDraw={bingo.draw}
        onReset={bingo.reset}
        disabled={bingo.remaining === 0}
      />

      <History items={bingo.history} />
    </Layout>
  );
}
