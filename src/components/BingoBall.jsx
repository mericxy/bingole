export default function BingoBall({ value, theaterMode = false }) {
  const sizeClass = theaterMode ? "w-72 h-72 md:w-[24rem] md:h-[24rem]" : "w-32 h-32";
  const letterClass = theaterMode ? "text-6xl" : "text-xl";
  const numberClass = theaterMode ? "text-8xl md:text-9xl" : "text-4xl";

  if (!value) {
    return (
      <div className="flex justify-center">
        <div
          className={`${sizeClass} rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 ${
            theaterMode ? "text-6xl" : ""
          }`}
        >
          --
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div
        className={`${sizeClass} rounded-full bg-emerald-500 text-zinc-950 flex flex-col items-center justify-center shadow-lg`}
      >
        <span className={`${letterClass} font-bold`}>{value.letter}</span>
        <span className={`${numberClass} font-bold leading-none`}>{value.value}</span>
      </div>
    </div>
  );
}
