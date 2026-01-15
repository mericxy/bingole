import { useState, useEffect, useRef } from "react";

export default function Controls({ onDraw, onReset, disabled }) {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDrawModal, setShowDrawModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const hasDrawnRef = useRef(false);

  useEffect(() => {
    if (!showDrawModal) {
      hasDrawnRef.current = false;
      return;
    }

    setProgress(0);
    const duration = 500;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;

        if (next >= 100) {
          clearInterval(timer);

          if (!hasDrawnRef.current) {
            hasDrawnRef.current = true;
            setTimeout(() => {
              setShowDrawModal(false);
              onDraw();
            }, 200);
          }

          return 100;
        }

        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [showDrawModal, onDraw]);

  function handleDrawClick() {
    setShowDrawModal(true);
  }

  function handleResetClick() {
    setShowResetModal(true);
  }

  function handleConfirmReset() {
    onReset();
    setShowResetModal(false);
  }

  function handleCancelReset() {
    setShowResetModal(false);
  }

  return (
    <>
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleDrawClick}
          disabled={disabled}
          className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40"
        >
          Sortear
        </button>

        <button
          onClick={handleResetClick}
          className="px-6 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600"
        >
          Resetar
        </button>
      </div>

      {/* Modal de Sorteio */}
      {showDrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 rounded-lg p-8 max-w-sm mx-4 shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-center">Sorteando...</h3>
            <div className="w-full bg-zinc-700 rounded-full h-4 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reset */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Confirmar Reset</h3>
            <p className="text-zinc-300 mb-6">
              Tem certeza que deseja resetar o jogo? Todo o histórico será perdido.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelReset}
                className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500"
              >
                Resetar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}