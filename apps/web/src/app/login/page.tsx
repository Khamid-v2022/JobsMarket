import Link from "next/link";

import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-stone-950 via-slate-900 to-orange-950 px-2 py-4 sm:px-4 sm:py-6">
      <div
        className="pointer-events-none absolute left-0 top-0 -z-10 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-amber-200/10 blur-3xl"
        aria-hidden="true"
      />

      <section className="grid w-full gap-8 rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-2xl backdrop-blur md:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="rounded-[2rem] bg-gradient-to-br from-orange-500 via-amber-400 to-orange-200 p-6 text-slate-950 shadow-xl shadow-orange-950/20 sm:p-8">
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
              Talent Operations
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-none text-balance sm:text-5xl lg:text-6xl">
              A sharper login flow for hiring teams moving at production speed.
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-950/75 sm:text-lg">
              Sign in with your work email and password to manage open roles, matched candidates,
              and decision-ready shortlists.
            </p>
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-950/10 bg-white/45 p-4 backdrop-blur-sm">
              <dt className="text-sm text-slate-950/70">Access</dt>
              <dd className="mt-2 text-2xl font-semibold">Email + Password</dd>
            </div>
            <div className="rounded-2xl border border-slate-950/10 bg-white/45 p-4 backdrop-blur-sm">
              <dt className="text-sm text-slate-950/70">Session</dt>
              <dd className="mt-2 text-2xl font-semibold">Server-backed</dd>
            </div>
            <div className="rounded-2xl border border-slate-950/10 bg-white/45 p-4 backdrop-blur-sm">
              <dt className="text-sm text-slate-950/70">Scope</dt>
              <dd className="mt-2 text-2xl font-semibold">No reset flow</dd>
            </div>
          </dl>
        </div>

        <div className="flex items-center">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}