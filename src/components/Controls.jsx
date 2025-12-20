import { useState } from "react";

export default function Controls({ onDraw, onReset, disabled }) {
  const [showModal, setShowModal] = useState(false);

  function handleResetClick() {
    setShowModal(true);
  }

  function handleConfirmReset() {
    onReset();
    setShowModal(false);
  }

  function handleCancelReset() {
    setShowModal(false);
  }

  return (
    <>
      <div className="flex gap-4 justify-center">
        <button
          onClick={onDraw}
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
