export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
        {children}
      </div>
    </div>
  );
}
