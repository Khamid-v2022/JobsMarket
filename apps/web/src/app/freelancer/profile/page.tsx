export default function FreelancerProfilePage() {
  return (
    <section className="rounded-3xl border border-slate-900/10 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Freelancer Profile</p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">Public profile and portfolio</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        This page is available only when freelancer profile is active. Keep your expertise tags,
        work history, and proposal template updated for better job matching.
      </p>
    </section>
  );
}
