export default function BingoBall({ value }) {
  if (!value) {
    return (
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
          --
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-32 h-32 rounded-full bg-emerald-500 text-zinc-950 flex flex-col items-center justify-center shadow-lg">
        <span className="text-xl font-bold">{value.letter}</span>
        <span className="text-4xl font-bold">{value.value}</span>
      </div>
    </div>
  );
}
