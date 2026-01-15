import { version } from '../../package.json';

export default function FloatingFooter() {
  return (
    <a
      href="https://github.com/mericxy"
      target="_blank"
      rel="noopener noreferrer"
      className="
        hidden
        md:block
        fixed
        bottom-4
        right-4
        z-50
        bg-black/50
        text-white
        text-xs
        px-3
        py-2
        rounded-lg
        shadow-lg
        hover:bg-emerald-600
        hover:scale-105
        transition
      "

    >
      By mericxy • v{version}
    </a>
  );
}
