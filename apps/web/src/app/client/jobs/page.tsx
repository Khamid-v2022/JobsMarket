const postedJobs = [
  {
    id: "P-2201",
    title: "Build onboarding flow for SaaS dashboard",
    bids: 14,
    status: "Reviewing bids",
  },
  {
    id: "P-2216",
    title: "Refactor monorepo build pipelines",
    bids: 8,
    status: "Interviewing",
  },
  {
    id: "P-2223",
    title: "QA automation for checkout flow",
    bids: 6,
    status: "Shortlisting",
  },
];

export default function ClientJobsPage() {
  return (
    <section className="space-y-4">
      <header className="rounded-3xl border border-slate-900/10 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Client Jobs</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Post jobs, review bids, and hire</h1>
        <p className="mt-3 text-sm text-slate-600">
          As an active client profile, you can publish jobs, evaluate freelancer bids, and start hiring.
        </p>
      </header>

      <button
        type="button"
        className="inline-flex min-h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
      >
        Post New Job
      </button>

      <div className="grid gap-3">
        {postedJobs.map((job) => (
          <article key={job.id} className="rounded-2xl border border-slate-900/10 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{job.id}</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{job.title}</h2>
            <p className="mt-2 text-sm text-slate-600">Bids received: {job.bids}</p>
            <p className="mt-1 text-sm text-slate-500">Status: {job.status}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-900/15 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Review Bids
              </button>
              <button
                type="button"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Hire Freelancer
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
