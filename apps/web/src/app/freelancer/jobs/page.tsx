const activeFilters = [
  "Hourly",
  ">$25/hr",
  "Fixed-Price",
  "1 to 9 hires",
  "Payment verified",
  "Category: Web Development",
];

const categories = [
  "Web, Mobile & Software Dev",
  "IT & Networking",
  "Design & Creative",
  "Sales & Marketing",
  "Writing & Translation",
  "Finance & Accounting",
];

const jobResults = [
  {
    id: "J-3412",
    title: "E-commerce CRO Expert",
    postedAt: "Posted 3 minutes ago",
    meta: "Hourly: $20 - $40 | Expert | Est. time: 1 to 3 months",
    description:
      "Looking for a CRO specialist to optimize product pages and checkout for multiple Shopify stores.",
    tags: ["Conversion Rate Optimization", "Shopify", "A/B Testing"],
    proposals: "Less than 10",
  },
  {
    id: "J-3387",
    title: "Senior Laravel API Refactor",
    postedAt: "Posted 18 minutes ago",
    meta: "Fixed price: $3,000 | Intermediate to Expert | Est. time: 1 month",
    description:
      "Need a freelancer to refactor legacy API modules, improve query performance, and add test coverage.",
    tags: ["Laravel", "MySQL", "API Performance"],
    proposals: "10 to 15",
  },
  {
    id: "J-3301",
    title: "Next.js Dashboard UI Polish",
    postedAt: "Posted 42 minutes ago",
    meta: "Hourly: $30 - $55 | Expert | Est. time: Less than 1 month",
    description:
      "Hiring a product-minded frontend engineer to refine dashboard UX, accessibility, and mobile layouts.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    proposals: "5 to 10",
  },
];

export default function FreelancerJobsPage() {
  return (
    <section className="space-y-5">
      <div className="space-y-5">
        <header className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-slate-900/15 bg-white px-4">
              <span className="text-slate-500" aria-hidden="true">
                Search
              </span>
              <input
                type="text"
                placeholder="Search jobs"
                className="h-10 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <select
              defaultValue="Most Recent"
              className="min-h-12 rounded-2xl border border-slate-900/15 bg-white px-4 text-sm font-semibold text-slate-900 outline-none"
            >
              <option>Most Recent</option>
              <option>Best Match</option>
              <option>Highest Budget</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className="rounded-full border border-slate-900/15 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                {filter}
              </button>
            ))}
            <button type="button" className="px-2 text-xs font-semibold text-cyan-700">
              Clear filters
            </button>
          </div>
        </header>

        <div className="grid gap-5 md:grid-cols-[280px,minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-900/10 bg-white p-4">
            <h2 className="text-base font-semibold text-slate-900">Category</h2>
            <select
              defaultValue="All categories"
              className="mt-3 min-h-11 w-full rounded-xl border border-slate-900/15 bg-white px-3 text-sm text-slate-900 outline-none"
            >
              <option>All categories</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <div className="mt-6 border-t border-slate-900/10 pt-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Experience level</h3>
              <label className="mt-4 flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 bg-white" />
                Entry Level (128)
              </label>
              <label className="mt-3 flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 bg-white" />
                Intermediate (4,328)
              </label>
              <label className="mt-3 flex items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 bg-white" />
                Expert (3,866)
              </label>
            </div>
          </aside>

          <div className="space-y-3">
            {jobResults.map((job) => (
              <article key={job.id} className="rounded-2xl border border-slate-900/10 bg-white p-5">
                <p className="text-xs text-slate-500">{job.postedAt}</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{job.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-600">{job.meta}</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{job.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-900/15 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-900/10 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Proposals: {job.proposals}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-900/15 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="inline-flex min-h-10 items-center justify-center rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
                    >
                      Submit Bid
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
