import { useEffect, useState } from "react";
import ModeSelector from "./ModeSelector";
import RemainingPanel from "./RemainingPanel";

function HamburgerButton({ open, onClick, theaterMode }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
      className={`shrink-0 rounded-2xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-sm transition hover:border-zinc-600 ${
        theaterMode ? "px-4 py-4" : "px-4 py-3"
      }`}
    >
      <div className="flex w-5 flex-col gap-1.5">
        <span className={`h-0.5 bg-zinc-100 transition ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 bg-zinc-100 transition ${open ? "opacity-0" : ""}`} />
        <span className={`h-0.5 bg-zinc-100 transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </div>
    </button>
  );
}

export default function AppMenu({
  modes,
  selectedModeId,
  onSelectMode,
  theaterMode = false,
  onToggleTheaterMode,
  remaining,
  totalBalls,
  remainingByLetter,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleSelectMode(modeId) {
    onSelectMode(modeId);
    setOpen(false);
  }

  function handleToggleTheaterMode() {
    onToggleTheaterMode();
    setOpen(false);
  }

  return (
    <>
      <div className="flex items-center justify-end">
        <HamburgerButton
          open={open}
          onClick={() => setOpen((prev) => !prev)}
          theaterMode={theaterMode}
        />
      </div>

      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-black/65"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-zinc-800 bg-zinc-950/98 px-5 py-5 shadow-2xl backdrop-blur transition-transform duration-300 md:max-w-md ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Menu</p>
            <h2 className="mt-2 text-2xl font-bold">Controles da rodada</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Modos, visao de telao e status do sorteio.
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm hover:border-zinc-600"
          >
            Fechar
          </button>
        </div>

        <div className="mt-6 space-y-6 overflow-y-auto pb-8">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-4">
            <ModeSelector
              modes={modes}
              value={selectedModeId}
              onChange={handleSelectMode}
              theaterMode={false}
            />
          </section>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold">Modo telão</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Expande a visualizacao para leitura a distancia.
                </p>
              </div>

              <button
                onClick={handleToggleTheaterMode}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  theaterMode
                    ? "bg-emerald-500 text-zinc-950"
                    : "bg-sky-700 text-white hover:bg-sky-600"
                }`}
              >
                {theaterMode ? "Ativo" : "Abrir"}
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-4">
            <RemainingPanel
              remaining={remaining}
              totalBalls={totalBalls}
              remainingByLetter={remainingByLetter}
              theaterMode={false}
            />
          </section>
        </div>
      </aside>
    </>
  );
}
