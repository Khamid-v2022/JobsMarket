export default function ClientProfilePage() {
  return (
    <section className="rounded-3xl border border-slate-900/10 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Client Profile</p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">Company profile and hiring preferences</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        This page is available only when client profile is active. Maintain your company details,
        preferred skill stack, and collaboration policy for better applicant quality.
      </p>
    </section>
  );
}
