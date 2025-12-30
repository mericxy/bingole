const LETTERS = ["B", "I", "N", "G", "O"];

export default function History({ items }) {
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