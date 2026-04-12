import { BINGO_LETTERS } from "../utils/bingo";

export default function RemainingPanel({
  remaining,
  totalBalls,
  remainingByLetter,
  theaterMode = false,
}) {
  return (
    <section className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className={theaterMode ? "text-3xl font-semibold" : "text-lg font-semibold"}>
          Bolas restantes
        </h2>
        <p className={theaterMode ? "text-xl text-zinc-300" : "text-sm text-zinc-400"}>
          {remaining} de {totalBalls} ainda nao sairam
        </p>
      </div>

      <div
        className={`grid gap-3 ${
          theaterMode ? "grid-cols-2 md:grid-cols-6" : "grid-cols-2 md:grid-cols-6"
        }`}
      >
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-4 text-center">
          <p className={theaterMode ? "text-lg text-emerald-300" : "text-xs text-emerald-300"}>
            Total
          </p>
          <p className={theaterMode ? "text-4xl font-black mt-2" : "text-2xl font-bold mt-1"}>
            {remaining}
          </p>
        </div>

        {BINGO_LETTERS.map((letter) => (
          <div
            key={letter}
            className="rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-4 text-center"
          >
            <p className={theaterMode ? "text-lg text-zinc-300" : "text-xs text-zinc-400"}>
              {letter}
            </p>
            <p className={theaterMode ? "text-4xl font-black mt-2" : "text-2xl font-bold mt-1"}>
              {remainingByLetter[letter]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
