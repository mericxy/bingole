const LETTERS = ["B", "I", "N", "G", "O"];

export default function History({ items }) {
  const grouped = LETTERS.reduce((acc, letter) => {
    acc[letter] = items.filter((i) => i.letter === letter);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Histórico</h2>

      <div className="grid grid-cols-5 gap-4">
        {LETTERS.map((letter) => (
          <div key={letter}>
            <h3 className="text-center font-bold mb-2">{letter}</h3>

            <div className="flex flex-wrap gap-2 justify-center">
              {grouped[letter].map((item) => (
                <div
                  key={item.value}
                  className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-sm"
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
