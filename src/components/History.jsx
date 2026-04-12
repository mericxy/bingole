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
      <h2 className="text-lg font-semibold">Histórico</h2>

      <div className="grid grid-cols-5 gap-4">
        {LETTERS.map((letter) => (
          <div key={letter}>
            <h3 className="text-center font-bold mb-2">{letter}</h3>

            <div className="flex flex-wrap gap-2 justify-center">
              {grouped[letter].map((item) => {
                const recent = isRecent(item.letter, item.value);
                return (
                  <div
                    key={item.value}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
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
