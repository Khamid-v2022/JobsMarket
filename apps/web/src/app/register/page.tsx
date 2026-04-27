import Link from "next/link";

import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-amber-950 via-orange-900 to-stone-900 px-2 py-4 sm:px-4 sm:py-6">
      <div
        className="pointer-events-none absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-yellow-200/10 blur-3xl"
        aria-hidden="true"
      />

      <section className="grid w-full gap-8 rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-2xl backdrop-blur md:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="rounded-[2rem] bg-gradient-to-br from-amber-400 via-orange-300 to-orange-100 p-6 text-slate-950 shadow-xl shadow-orange-950/20 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-950/75">JOBPORTAL</p>
            <Link
              href="/"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-slate-950/15 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Back Home
            </Link>
          </div>

          <div className="mt-14 max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-950/65">
              Team Access Setup
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-none text-balance sm:text-5xl lg:text-6xl">
              Register in minutes and verify with your team code.
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-950/75 sm:text-lg">
              Create your employer account, then complete email verification using the static code
              flow enabled for this phase.
            </p>
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-950/10 bg-white/45 p-4 backdrop-blur-sm">
              <dt className="text-sm text-slate-950/70">Profile</dt>
              <dd className="mt-2 text-2xl font-semibold">Name + Email</dd>
            </div>
            <div className="rounded-2xl border border-slate-950/10 bg-white/45 p-4 backdrop-blur-sm">
              <dt className="text-sm text-slate-950/70">Security</dt>
              <dd className="mt-2 text-2xl font-semibold">Password</dd>
            </div>
            <div className="rounded-2xl border border-slate-950/10 bg-white/45 p-4 backdrop-blur-sm">
              <dt className="text-sm text-slate-950/70">Verification</dt>
              <dd className="mt-2 text-2xl font-semibold">Code 1111</dd>
            </div>
          </dl>
        </div>

        <div className="flex items-center">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}