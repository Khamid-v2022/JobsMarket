export default function Home() {
  const metrics = [
    { value: "2,400+", label: "Verified candidates" },
    { value: "48h", label: "Average shortlist time" },
    { value: "91%", label: "Successful first matches" },
  ];

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100 px-5 py-8 sm:px-8">
      <div
        className="pointer-events-none absolute -left-20 -top-12 -z-10 h-80 w-80 rounded-full bg-amber-300/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-96 w-96 rounded-full bg-orange-400/30 blur-3xl"
        aria-hidden="true"
      />

      <section className="grid w-full max-w-6xl gap-4 rounded-3xl border border-stone-900/10 bg-orange-50/90 p-4 shadow-2xl backdrop-blur-sm sm:p-6 lg:grid-cols-3 lg:gap-8">
        <header className="col-span-full flex items-center justify-between px-1 pb-2">
          <p className="m-0 text-xs font-bold uppercase tracking-widest text-slate-900/80">JOBPORTAL</p>
          <a
            href="/login"
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-slate-900/20 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-900/35 hover:bg-white"
          >
            Log In
          </a>
        </header>

        <div className="px-2 py-4 sm:px-4 lg:col-span-2 lg:px-6 lg:py-7">
          <p className="m-0 text-xs font-medium uppercase tracking-[0.2em] text-slate-900/70">
            Hire quickly. Work confidently.
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-none text-slate-950 text-balance sm:text-5xl lg:text-7xl">
            Find proven talent for your next mission-critical project.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-900/75 sm:text-lg">
            JobPortal connects companies with verified specialists across engineering, design, and
            operations. Post once, review matched candidates, and onboard in days.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/jobs"
              className="inline-flex min-h-12 min-w-40 items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              Browse Talent
            </a>
            <a
              href="/post-job"
              className="inline-flex min-h-12 min-w-40 items-center justify-center rounded-2xl border border-slate-900/25 bg-white/70 px-5 py-3 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-900/40 hover:bg-white"
            >
              Post a Job
            </a>
          </div>
        </div>

        <aside className="rounded-3xl border border-stone-900/10 bg-white/70 p-5 shadow-lg shadow-orange-100/60 sm:p-6">
          <p className="m-0 text-xs font-semibold uppercase tracking-widest text-stone-700">This Month</p>
          <ul className="mt-4 grid list-none gap-3 p-0">
            {metrics.map((metric) => (
              <li
                key={metric.label}
                className="grid gap-1 rounded-2xl border border-slate-900/10 bg-white/80 p-4"
              >
                <span className="text-2xl font-bold leading-tight text-stone-700">{metric.value}</span>
                <span className="text-sm text-slate-900/70">{metric.label}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}
