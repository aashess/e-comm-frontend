import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin"); // 'signin' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sign in with Google
  const [googleLoading, setGoogleLoading] = useState(false);
  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE}/auth/google/login`);
      if (!response.data) throw new Error("No redirect URL from server");
      globalThis.location.href = response.data;
    } catch (err) {
      setError(err.message || "Google sign-in failed. Try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  // Email/password form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }
    try {
      setLoading(true);
      if (mode === "signin") {
        // POST your backend sign-in route, e.g. POST /auth/login
        const { data } = await axios.post(
          `${API_BASE}/api/user/login`,
          { email: email.trim(), password },
          { withCredentials: "include" },
        );
        // Store token if returned, then redirect
        console.log(data.token);

        if (data?.token) localStorage.setItem("token", data.token);
        console.log(localStorage.token);

        navigate("/dashboard", { replace: true });
      } else {
        // POST your backend register route, e.g. POST /auth/register
        await axios.post(`${API_BASE}/api/user/register`, {
          name: name.trim() || undefined,
          email: email.trim(),
          password,
          role
        });
        setMode("signin");
        setError(null);
        setPassword("");
        setRole("")
        setEmail("");
        setName("");
        // Optional: auto sign-in after register
        // navigate('/dashboard', { replace: true })
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === "signin" ? "register" : "signin"));
    setError(null);
    setPassword("");
    setRole("")
  };

  let submitButtonLabel = "Sign in";
  if (loading) submitButtonLabel = "Please wait…";
  else if (mode === "register") submitButtonLabel = "Create account";

  const signInPrompt = (
    <>
      Don’t have an account?{" "}
      <button
        type="button"
        onClick={switchMode}
        className="font-medium text-violet-400 hover:text-violet-300"
      >
        Create new account
      </button>
    </>
  );
  const registerPrompt = (
    <>
      Already have an account?{" "}
      <button
        type="button"
        onClick={switchMode}
        className="font-medium text-violet-400 hover:text-violet-300"
      >
        Sign in
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.12),transparent)]" />
      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-100">
              {mode === "signin" ? "Sign in" : "Create account"}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              {mode === "signin"
                ? "Use Google or your email to continue"
                : "Register with your email"}
            </p>
          </div>

          {/* Sign in with Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-zinc-700/80 bg-zinc-800/50 px-4 py-3 text-sm font-medium text-zinc-100 hover:bg-zinc-800/80 hover:border-zinc-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg
              className="h-5 w-5 shrink-0"
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
            {googleLoading ? "Redirecting…" : "Sign in with Google"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700/80" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-zinc-900/60 px-3 text-zinc-500">
                or continue with email
              </span>
            </div>
          </div>

          {/* Email / password form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-zinc-400 mb-1.5"
                >
                  Name (optional)
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-zinc-700/80 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-zinc-400 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-zinc-700/80 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-zinc-400 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
                required
                className="w-full rounded-xl border border-zinc-700/80 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
              />
            </div>
            {mode === "register" && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-zinc-400 mb-1.5"
                >
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-xl border border-zinc-700/80 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
              </div>
            )}
            {error && (
              <p className="text-sm text-red-400 font-medium">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-500 hover:bg-violet-600 text-white py-2.5 text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitButtonLabel}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-zinc-500">
            {mode === "signin" ? signInPrompt : registerPrompt}
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-zinc-600">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="hover:text-zinc-400"
          >
            ← Back to home
          </button>
        </p>
      </div>
    </div>
  );
}
export default Login;
