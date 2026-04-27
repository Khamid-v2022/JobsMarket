import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 px-5 py-8 sm:px-8">
      <div
        className="pointer-events-none absolute -left-20 top-10 -z-10 h-96 w-96 rounded-full bg-orange-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 -z-10 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl"
        aria-hidden="true"
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur sm:p-6 lg:p-8">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300/80">JobPortal</p>
            <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Landing
            </Link>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <p className="text-sm text-slate-300">Open Roles</p>
            <p className="mt-3 text-4xl font-semibold text-white">14</p>
            <p className="mt-2 text-sm text-slate-300">4 roles need shortlist review today.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <p className="text-sm text-slate-300">Interview Pipeline</p>
            <p className="mt-3 text-4xl font-semibold text-white">37</p>
            <p className="mt-2 text-sm text-slate-300">Candidates currently in active stages.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <p className="text-sm text-slate-300">Time To Hire</p>
            <p className="mt-3 text-4xl font-semibold text-white">12d</p>
            <p className="mt-2 text-sm text-slate-300">Median timeline this month.</p>
          </article>
        </div>

        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200/85">Operations</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Welcome to your hiring command center.</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
            This route is protected by middleware. Unauthenticated users are redirected to login,
            while authenticated users are redirected away from guest-only routes like login and register.
          </p>
        </section>
      </section>
    </main>
  );
}
