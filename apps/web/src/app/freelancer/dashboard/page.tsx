import Link from "next/link";

export default function FreelancerDashboardPage() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <article className="rounded-3xl border border-slate-900/10 bg-[linear-gradient(155deg,#0f172a,#1e293b)] p-6 text-slate-100 shadow-lg shadow-slate-900/20 lg:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">Freelancer Mode</p>
        <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">Find projects and submit winning bids.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200/85 sm:text-base">
          Your freelancer profile is active. Browse job posts, tailor your proposals, and track hiring decisions.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/freelancer/jobs"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-400"
          >
            Search Jobs
          </Link>
          <Link
            href="/freelancer/profile"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/20"
          >
            Edit Profile
          </Link>
        </div>
      </article>

      <article className="rounded-3xl border border-cyan-300/40 bg-cyan-50 p-6 text-cyan-900">
        <p className="text-sm font-medium">Open Matches</p>
        <p className="mt-3 text-3xl font-semibold">12 jobs</p>
        <p className="mt-3 text-sm leading-6 text-cyan-900/80">Skill-fit score above 80% this week.</p>
      </article>

      <article className="rounded-3xl border border-slate-900/10 bg-white p-6">
        <p className="text-sm text-slate-500">Submitted Bids</p>
        <p className="mt-3 text-4xl font-semibold text-slate-900">27</p>
      </article>

      <article className="rounded-3xl border border-slate-900/10 bg-white p-6">
        <p className="text-sm text-slate-500">Interviews</p>
        <p className="mt-3 text-4xl font-semibold text-slate-900">6</p>
      </article>

      <article className="rounded-3xl border border-slate-900/10 bg-white p-6">
        <p className="text-sm text-slate-500">Active Contracts</p>
        <p className="mt-3 text-4xl font-semibold text-slate-900">3</p>
      </article>
    </section>
  );
}
