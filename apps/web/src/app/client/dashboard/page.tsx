import Link from "next/link";

export default function ClientDashboardPage() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <article className="rounded-3xl border border-slate-900/10 bg-[linear-gradient(155deg,#312e81,#1e3a8a)] p-6 text-slate-100 shadow-lg shadow-slate-900/20 lg:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200/95">Client Mode</p>
        <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">Post jobs and hire the right freelancer.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-100/85 sm:text-base">
          Your client profile is active. Create job posts, review incoming bids, and move top candidates to hire.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/client/jobs"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-indigo-400 px-4 py-2 text-sm font-semibold text-indigo-950 transition hover:-translate-y-0.5 hover:bg-indigo-300"
          >
            Manage Jobs
          </Link>
          <Link
            href="/client/profile"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-50 transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            Company Profile
          </Link>
        </div>
      </article>

      <article className="rounded-3xl border border-indigo-300/40 bg-indigo-50 p-6 text-indigo-900">
        <p className="text-sm font-medium">Open Jobs</p>
        <p className="mt-3 text-3xl font-semibold">8 postings</p>
        <p className="mt-3 text-sm leading-6 text-indigo-900/80">3 positions need bid review today.</p>
      </article>

      <article className="rounded-3xl border border-slate-900/10 bg-white p-6">
        <p className="text-sm text-slate-500">Incoming Bids</p>
        <p className="mt-3 text-4xl font-semibold text-slate-900">41</p>
      </article>

      <article className="rounded-3xl border border-slate-900/10 bg-white p-6">
        <p className="text-sm text-slate-500">Interviews Scheduled</p>
        <p className="mt-3 text-4xl font-semibold text-slate-900">9</p>
      </article>

      <article className="rounded-3xl border border-slate-900/10 bg-white p-6">
        <p className="text-sm text-slate-500">Hires This Month</p>
        <p className="mt-3 text-4xl font-semibold text-slate-900">5</p>
      </article>
    </section>
  );
}
