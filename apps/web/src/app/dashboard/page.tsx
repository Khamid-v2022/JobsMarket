export default function DashboardPage() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <article className="rounded-3xl border border-slate-900/10 bg-[linear-gradient(155deg,#111827,#1f2937)] p-6 text-slate-100 shadow-lg shadow-slate-900/20 lg:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/90">Overview</p>
        <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Welcome to your hiring command center.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200/85 sm:text-base">
          This route is protected by middleware. Unauthenticated users are redirected to login,
          while authenticated users are redirected away from guest-only routes like login and register.
        </p>
      </article>

      <article className="rounded-3xl border border-amber-300/40 bg-amber-50 p-6 text-amber-900">
        <p className="text-sm font-medium">Today&apos;s priority</p>
        <p className="mt-3 text-3xl font-semibold">4 roles</p>
        <p className="mt-3 text-sm leading-6 text-amber-900/80">Need shortlist review before interview scheduling cutoff.</p>
      </article>

      <article className="rounded-3xl border border-slate-900/10 bg-white p-6">
        <p className="text-sm text-slate-500">Open Roles</p>
        <p className="mt-3 text-4xl font-semibold text-slate-900">14</p>
        <p className="mt-2 text-sm text-slate-600">Across engineering, design, and growth squads.</p>
      </article>

      <article className="rounded-3xl border border-slate-900/10 bg-white p-6">
        <p className="text-sm text-slate-500">Interview Pipeline</p>
        <p className="mt-3 text-4xl font-semibold text-slate-900">37</p>
        <p className="mt-2 text-sm text-slate-600">Candidates currently in active stages.</p>
      </article>

      <article className="rounded-3xl border border-slate-900/10 bg-white p-6">
        <p className="text-sm text-slate-500">Time To Hire</p>
        <p className="mt-3 text-4xl font-semibold text-slate-900">12d</p>
        <p className="mt-2 text-sm text-slate-600">Current median timeline this month.</p>
      </article>
    </section>
  );
}
