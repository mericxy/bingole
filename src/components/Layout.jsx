import { forwardRef } from "react";

const Layout = forwardRef(function Layout({ children, theaterMode = false }, ref) {
  return (
    <div
      ref={ref}
      className={`min-h-screen flex items-center justify-center ${
        theaterMode ? "p-4 bg-zinc-950" : "p-6"
      }`}
    >
      <div
        className={`w-full bg-zinc-900 border border-zinc-800 space-y-6 ${
          theaterMode
            ? "max-w-none min-h-[calc(100vh-2rem)] rounded-3xl px-6 py-8 md:px-10 md:py-10"
            : "max-w-3xl rounded-2xl p-6"
        }`}
      >
        {children}
      </div>
    </div>
  );
});

export default Layout;
