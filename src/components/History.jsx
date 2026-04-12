const LETTERS = ["B", "I", "N", "G", "O"];

export default function History({ items, theaterMode = false }) {
  const grouped = LETTERS.reduce((acc, letter) => {
    acc[letter] = items
      .filter((i) => i.letter === letter)
      .sort((a, b) => a.value - b.value);
    return acc;
  }, {});

  const lastTwo = items.slice(-2).map((item) => `${item.letter}-${item.value}`);

  function isRecent(letter, value) {
    const key = `${letter}-${value}`;
    return lastTwo.includes(key);
  }

  const recentDraws = items.slice(-5).reverse();

  if (theaterMode) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-semibold">Ultimos 5 sorteios</h2>
          <p className="text-zinc-400 text-lg">
            {items.length} numero{items.length === 1 ? "" : "s"} sorteado
            {items.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {recentDraws.length > 0 ? (
            recentDraws.map((item, index) => (
              <div
                key={`${item.letter}-${item.value}`}
                className={`rounded-2xl border border-zinc-700 bg-zinc-900/80 px-6 py-8 text-center ${
                  index === 0 ? "ring-2 ring-emerald-400" : ""
                }`}
              >
                <p className="text-4xl font-bold text-emerald-400">{item.letter}</p>
                <p className="text-6xl font-black mt-3">{item.value}</p>
              </div>
            ))
          ) : (
            <div className="md:col-span-5 rounded-2xl border border-dashed border-zinc-700 px-6 py-10 text-center text-2xl text-zinc-400">
              Nenhum numero sorteado ainda
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Historico</h2>
        <span className="text-xs text-zinc-400">{items.length} sorteados</span>
      </div>

      <div className="grid grid-cols-5 gap-2 md:gap-4">
        {LETTERS.map((letter) => (
          <div key={letter} className="rounded-2xl bg-zinc-950/60 p-2 md:bg-transparent md:p-0">
            <h3 className="text-center font-bold mb-2 text-sm md:text-base">{letter}</h3>

            <div className="flex flex-wrap gap-1.5 justify-center md:gap-2">
              {grouped[letter].map((item) => {
                const recent = isRecent(item.letter, item.value);
                return (
                  <div
                    key={item.value}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs transition-all md:h-9 md:w-9 md:text-sm ${
                      recent
                        ? "bg-emerald-600 ring-2 ring-emerald-400 scale-110 font-bold"
                        : "bg-zinc-800"
                    }`}
                  >
                    {item.value}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
