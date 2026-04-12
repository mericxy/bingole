export default function ModeSelector({
  modes,
  value,
  onChange,
  theaterMode = false,
}) {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <h2 className={theaterMode ? "text-2xl font-semibold" : "text-base font-semibold"}>
          Modo de jogo
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {modes.map((mode) => {
          const selected = mode.id === value;

          return (
            <button
              key={mode.id}
              onClick={() => onChange(mode.id)}
              className={`rounded-full border transition ${
                selected
                  ? "border-emerald-400 bg-emerald-500 text-zinc-950"
                  : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
              } ${theaterMode ? "px-6 py-3 text-lg font-semibold" : "px-4 py-2 text-sm"}`}
            >
              {mode.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
