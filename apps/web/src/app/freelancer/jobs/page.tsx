const availableJobs = [
  {
    id: "J-1001",
    title: "Senior Next.js Frontend Engineer",
    budget: "$4,000 - $6,000",
    bids: 18,
  },
  {
    id: "J-1027",
    title: "Laravel API Performance Optimization",
    budget: "$2,200 - $3,100",
    bids: 9,
  },
  {
    id: "J-1104",
    title: "Design System Migration for Marketplace",
    budget: "$3,500 - $5,000",
    bids: 11,
  },
];

export default function FreelancerJobsPage() {
  return (
    <section className="space-y-4">
      <header className="rounded-3xl border border-slate-900/10 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Freelancer Jobs</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Search jobs and place bids</h1>
        <p className="mt-3 text-sm text-slate-600">
          As an active freelancer profile, you can browse jobs and submit bid proposals.
        </p>
      </header>

      <div className="grid gap-3">
        {availableJobs.map((job) => (
          <article key={job.id} className="rounded-2xl border border-slate-900/10 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{job.id}</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{job.title}</h2>
            <p className="mt-2 text-sm text-slate-600">Budget: {job.budget}</p>
            <p className="mt-1 text-sm text-slate-500">Current bids: {job.bids}</p>
            <button
              type="button"
              className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
            >
              Submit Bid
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
