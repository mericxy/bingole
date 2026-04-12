import { forwardRef } from "react";

const Layout = forwardRef(function Layout({ children, theaterMode = false }, ref) {
  return (
    <div
      ref={ref}
      className={`min-h-screen ${
        theaterMode
          ? "flex items-center justify-center p-4 bg-zinc-950"
          : "bg-zinc-950 px-3 py-3 md:flex md:items-center md:justify-center md:p-6"
      }`}
    >
      <div
        className={`w-full bg-zinc-900 border border-zinc-800 space-y-6 ${
          theaterMode
            ? "max-w-none min-h-[calc(100vh-2rem)] rounded-3xl px-6 py-8 md:px-10 md:py-10"
            : "max-w-3xl rounded-[2rem] px-4 py-5 md:p-6"
        }`}
      >
        {children}
      </div>
    </div>
  );
});

export default Layout;
