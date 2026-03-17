import { useState } from "react";
import { motion } from "motion/react";
import { googleLogin } from "../api";

// Shared easing
const ease = [0.22, 1, 0.36, 1];

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await googleLogin();
      if (!data) {
        throw new Error("No redirect URL returned from backend");
      }
      globalThis.location.href = data;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Stagger container for feature cards
  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease },
    },
  };

  // Stats stagger
  const statsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Animated background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl"
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{
            x: [0, -20, 15, 0],
            y: [0, 10, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-y-0 left-1/2 w-px bg-linear-to-b from-slate-800/0 via-slate-700/60 to-slate-800/0" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
        {/* Navbar - fade down */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center justify-between gap-4 pb-4"
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-sky-400 ring-1 ring-slate-800"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              EC
            </motion.div>
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
            {["Overview", "Features", "Pricing"].map((item, i) => (
              <motion.button
                key={item}
                type="button"
                className="hover:text-sky-400 transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.button>
            ))}
            <span className="h-5 w-px bg-slate-800" />
            <motion.span
              className="rounded-full border border-slate-800/80 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.4, ease }}
            >
              Built for teams
            </motion.span>
          </nav>
        </motion.header>

        {/* Hero */}
        <main className="mt-10 flex flex-1 flex-col items-center justify-center gap-12 md:mt-16 md:flex-row md:items-stretch md:justify-between">
          {/* Left: marketing copy - staggered slide up */}
          <section className="max-w-xl space-y-7 text-center md:text-left">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-slate-800/80"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Trusted backend for modern commerce
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease }}
              >
                Run your store,
                <br className="hidden sm:block" /> not your{" "}
                <span className="bg-linear-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                  infrastructure
                </span>
                .
              </motion.h1>
              <motion.p
                className="text-sm text-slate-400 sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease }}
              >
                E‑Comm Studio gives you a powerful backend for products, orders,
                customers, and analytics—accessible with a single secure Google
                sign in.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5, ease }}
            >
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
                  {[
                    "bg-sky-500/80",
                    "bg-emerald-500/80",
                    "bg-slate-400/80",
                  ].map((color, i) => (
                    <motion.div
                      key={color}
                      className={`h-6 w-6 rounded-full ${color} ring-2 ring-slate-950`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.7 + i * 0.1,
                        duration: 0.3,
                        ease,
                      }}
                    />
                  ))}
                </div>
                <span>Teams already using Studio</span>
              </div>
            </motion.div>
          </section>

          {/* Right: sign-in card - slide in from right */}
          <motion.section
            className="w-full max-w-sm"
            initial={{ opacity: 0, x: 60, rotateY: 8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              className="space-y-6 rounded-3xl bg-slate-950/80 p-6 shadow-xl shadow-slate-950/70 ring-1 ring-slate-800/90 backdrop-blur"
              whileHover={{
                boxShadow:
                  "0 25px 60px -12px rgba(56,189,248,0.08), 0 0 0 1px rgba(56,189,248,0.15)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-1 text-left">
                <h2 className="text-base font-semibold sm:text-lg">
                  Sign in to your workspace
                </h2>
                <p className="text-xs text-slate-400">
                  Use your Google account to access your e‑commerce dashboard.
                </p>
              </div>

              {/* Modern Google button */}
              <motion.button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-slate-800/90 bg-slate-900/80 px-5 py-2.5 text-sm font-medium text-slate-50 shadow-sm shadow-slate-950/60 transition hover:border-sky-500/70 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
              </motion.button>

              {error && (
                <motion.p
                  className="text-xs font-medium text-red-400"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </motion.div>
          </motion.section>
        </main>

        {/* Secondary content strip */}
        <motion.section
          className="mt-12 space-y-8 border-t border-slate-800/80 pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-400">
                Why teams pick E‑Comm Studio
              </p>
              <p className="text-sm text-slate-400 md:text-base">
                Opinionated defaults for product catalogs, orders, and
                customers, with a clean API layer your backend can grow on.
              </p>
            </motion.div>

            <motion.div
              className="flex gap-6 text-xs text-slate-300"
              variants={statsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { value: "99.9%", label: "Uptime target" },
                { value: "MS", label: "API response focus" },
                { value: "Ready", label: "For your next drop" },
              ].map((stat) => (
                <motion.div key={stat.label} variants={statVariants}>
                  <p className="text-lg font-semibold text-slate-50">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="grid gap-4 text-sm md:grid-cols-3"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                color: "text-sky-400",
                title: "Unified data",
                desc: "Products, orders, customers, and sessions live in a single, consistent backend surface.",
              },
              {
                color: "text-emerald-400",
                title: "Dev‑first",
                desc: "Built around APIs and webhooks so you can connect any frontend or admin tools.",
              },
              {
                color: "text-violet-400",
                title: "Secure access",
                desc: "Google sign in for admins, with your backend in full control of roles and permissions.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4"
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(148, 163, 184, 0.3)",
                  transition: { duration: 0.2 },
                }}
              >
                <p className={`text-xs font-medium ${card.color}`}>
                  {card.title}
                </p>
                <p className="text-slate-200">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="mt-10 flex items-center justify-between border-t border-slate-800/80 pt-4 text-[11px] text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span>© {new Date().getFullYear()} E‑Comm Studio</span>
          <span className="hidden gap-3 sm:flex">
            <span>Status: Online</span>
            <span>Region: Auto</span>
          </span>
        </motion.footer>
      </div>
    </div>
  );
}

export default SignIn;
