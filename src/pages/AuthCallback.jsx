import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    // Here you can:
    // - Read tokens from the URL
    // - Call your backend to exchange a code for a session
    // - Then redirect wherever you want
    //
    // For now, we just simulate a quick redirect back home.
    const timer = setTimeout(() => {
      navigate('/dashboard', { replace: true })
    }, 1500)


    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-slate-950 px-4 text-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-5 rounded-2xl bg-slate-950/70 p-8 text-center shadow-xl shadow-slate-950/70 ring-1 ring-slate-800/90 backdrop-blur">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/80 ring-1 ring-slate-700/80">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-semibold sm:text-xl">
              Finishing your sign in…
            </h1>
            <p className="text-sm text-slate-400">
              We&apos;re processing your Google sign in and setting up your
              session. You&apos;ll be redirected automatically in a moment.
            </p>
          </div>
          <p className="text-[11px] text-slate-500">
            You can close this tab if nothing happens after a few seconds.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthCallback

