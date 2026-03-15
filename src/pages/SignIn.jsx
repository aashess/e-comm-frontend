import axios from "axios";
import { useState } from "react";

// Point this to your backend base URL.
// You can also set VITE_API_URL in a .env file instead.
const API_BASE_URL = "http://localhost:3000/";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // This expects your backend to return: { url: "https://accounts.google.com/..." }
      // Example backend route: GET `${API_BASE_URL}/auth/google`

      const response = await axios.get(
        "http://localhost:3000/auth/google/login"
      );

      console.log(response.data);

      if (!response.data) {
        throw new Error("No redirect URL returned from backend");
      }
      // this will break when backend returns object.. 
      globalThis.location.href = response.data; 

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      
      
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Subtle background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-linear-to-b from-slate-800/0 via-slate-700/60 to-slate-800/0" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
        {/* Navbar */}
        <header className="flex items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-sky-400 ring-1 ring-slate-800">
              EC
            </div>
            <div>
              <p className=" text-sm font-semibold tracking-tight">
                E‑Comm Studio
              </p>
              <p className="text-[11px] text-slate-400">
                The modern way to run your store
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs text-slate-300 sm:flex">
            <button type="button" className="hover:text-sky-400">
              Overview
            </button>
            <button type="button" className="hover:text-sky-400">
              Features
            </button>
            <button type="button" className="hover:text-sky-400">
              Pricing
            </button>
            <span className="h-5 w-px bg-slate-800" />
            <span className="rounded-full border border-slate-800/80 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-400">
              Built for teams
            </span>
          </nav>
        </header>

        {/* Hero */}
        <main className="mt-10 flex flex-1 flex-col items-center justify-center gap-12 md:mt-16 md:flex-row md:items-stretch md:justify-between">
          {/* Left: marketing copy */}
          <section className="max-w-xl space-y-7 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-slate-800/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Trusted backend for modern commerce
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Run your store,
                <br className="hidden sm:block" /> not your{" "}
                <span className="bg-linear-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                  infrastructure
                </span>
                .
              </h1>
              <p className="text-sm text-slate-400 sm:text-base">
                E‑Comm Studio gives you a powerful backend for products, orders,
                customers, and analytics—accessible with a single secure Google
                sign in.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="text-left text-xs text-slate-400 sm:text-[13px]">
                <p className="font-medium text-slate-200">
                  Designed for developers & operators
                </p>
                <p>
                  Obsessed with fast dashboards, clean APIs, and clear data.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-sky-500/80 ring-2 ring-slate-950" />
                  <div className="h-6 w-6 rounded-full bg-emerald-500/80 ring-2 ring-slate-950" />
                  <div className="h-6 w-6 rounded-full bg-slate-400/80 ring-2 ring-slate-950" />
                </div>
                <span>Teams already using Studio</span>
              </div>
            </div>
          </section>

          {/* Right: sign-in card as CTA */}
          <section className="w-full max-w-sm">
            <div className="space-y-6 rounded-3xl bg-slate-950/80 p-6 shadow-xl shadow-slate-950/70 ring-1 ring-slate-800/90 backdrop-blur">
              <div className="space-y-1 text-left">
                <h2 className="text-base font-semibold sm:text-lg">
                  Sign in to your workspace
                </h2>
                <p className="text-xs text-slate-400">
                  Use your Google account to access your e‑commerce dashboard.
                </p>
              </div>

              {/* Modern Google button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-slate-800/90 bg-slate-900/80 px-5 py-2.5 text-sm font-medium text-slate-50 shadow-sm shadow-slate-950/60 transition hover:border-sky-500/70 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 blur-xl transition group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-sky-500/0 via-sky-500/25 to-emerald-400/0" />
                </span>

                <span className="relative flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/80 shadow-inner shadow-slate-900">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="#EA4335"
                        d="M11.99 10.2v3.6h5.03c-.22 1.17-.9 2.16-1.92 2.82l3.1 2.41c1.81-1.67 2.86-4.13 2.86-7.06 0-.68-.06-1.34-.18-1.98z"
                      />
                      <path
                        fill="#34A853"
                        d="M4.84 13.88 4.2 14.38l-2.49 1.93C3.21 19.75 7.27 22 12 22c2.7 0 4.96-.89 6.61-2.43l-3.1-2.41C14.46 17.93 13.34 18.3 12 18.3c-2.7 0-4.98-1.82-5.8-4.29z"
                      />
                      <path
                        fill="#4A90E2"
                        d="M12 5.7c1.47 0 2.79.51 3.83 1.51l2.87-2.87C16.95 2.88 14.7 2 12 2 7.27 2 3.21 4.25 1.71 8.31l3.13 2.43C7.02 7.52 9.3 5.7 12 5.7z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M4.84 13.88C4.63 13.26 4.5 12.64 4.5 12s.13-1.26.34-1.88L1.71 7.69C1.26 8.9 1 10.21 1 11.6c0 1.39.26 2.7.71 3.91z"
                      />
                    </svg>
                  </span>

                  <span>
                    {isLoading
                      ? "Redirecting to Google…"
                      : "Sign in with Google"}
                  </span>
                </span>
              </button>

              {error && (
                <p className="text-xs font-medium text-red-400">{error}</p>
              )}
            </div>
          </section>
        </main>

        {/* Secondary content strip */}
        <section className="mt-12 space-y-8 border-t border-slate-800/80 pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-400">
                Why teams pick E‑Comm Studio
              </p>
              <p className="text-sm text-slate-400 md:text-base">
                Opinionated defaults for product catalogs, orders, and
                customers, with a clean API layer your backend can grow on.
              </p>
            </div>

            <div className="flex gap-6 text-xs text-slate-300">
              <div>
                <p className="text-lg font-semibold text-slate-50">99.9%</p>
                <p className="text-[11px] text-slate-500">Uptime target</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-50">MS</p>
                <p className="text-[11px] text-slate-500">API response focus</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-50">Ready</p>
                <p className="text-[11px] text-slate-500">For your next drop</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 text-sm md:grid-cols-3">
            <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-xs font-medium text-sky-400">Unified data</p>
              <p className="text-slate-200">
                Products, orders, customers, and sessions live in a single,
                consistent backend surface.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-xs font-medium text-emerald-400">Dev‑first</p>
              <p className="text-slate-200">
                Built around APIs and webhooks so you can connect any frontend
                or admin tools.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4">
              <p className="text-xs font-medium text-violet-400">
                Secure access
              </p>
              <p className="text-slate-200">
                Google sign in for admins, with your backend in full control of
                roles and permissions.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 flex items-center justify-between border-t border-slate-800/80 pt-4 text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} E‑Comm Studio</span>
          <span className="hidden gap-3 sm:flex">
            <span>Status: Online</span>
            <span>Region: Auto</span>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default SignIn;
