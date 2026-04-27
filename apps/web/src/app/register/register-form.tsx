"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

type AuthUser = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
};

type RegisterResponse = {
  message?: string;
  user?: AuthUser;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

type VerifyResponse = {
  message?: string;
  user?: AuthUser;
  errors?: {
    code?: string[];
  };
};

export function RegisterForm() {
  const [registeredUser, setRegisteredUser] = useState<AuthUser | null>(null);
  const [registerErrorMessage, setRegisterErrorMessage] = useState<string | null>(null);
  const [verifyErrorMessage, setVerifyErrorMessage] = useState<string | null>(null);
  const [verifySuccessMessage, setVerifySuccessMessage] = useState<string | null>(null);
  const [isRegisterPending, startRegisterTransition] = useTransition();
  const [isVerifyPending, startVerifyTransition] = useTransition();

  const isVerified = useMemo(() => {
    return registeredUser?.email_verified_at !== null;
  }, [registeredUser]);

  const handleRegisterSubmit = (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    startRegisterTransition(async () => {
      setRegisterErrorMessage(null);
      setVerifyErrorMessage(null);
      setVerifySuccessMessage(null);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = (await response.json().catch(() => null)) as RegisterResponse | null;

      if (!response.ok) {
        const validationMessage =
          data?.errors?.name?.[0] ?? data?.errors?.email?.[0] ?? data?.errors?.password?.[0];

        setRegisterErrorMessage(validationMessage ?? data?.message ?? "Unable to create account.");
        setRegisteredUser(null);

        return;
      }

      setRegisteredUser(data?.user ?? null);
    });
  };

  const handleVerifySubmit = (formData: FormData) => {
    const code = formData.get("code");

    startVerifyTransition(async () => {
      setVerifyErrorMessage(null);
      setVerifySuccessMessage(null);

      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = (await response.json().catch(() => null)) as VerifyResponse | null;

      if (!response.ok) {
        const validationMessage = data?.errors?.code?.[0];

        setVerifyErrorMessage(validationMessage ?? data?.message ?? "Unable to verify email.");

        return;
      }

      setRegisteredUser(data?.user ?? registeredUser);
      setVerifySuccessMessage(data?.message ?? "Email verified.");
    });
  };

  if (registeredUser === null) {
    return (
      <div className="rounded-[2rem] border border-slate-900/10 bg-white/85 p-6 shadow-xl shadow-orange-100/70 sm:p-8">
        <div className="max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
            Employer Onboarding
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Create your account.
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-700">
            Register with your name, work email, and password. You will verify your email in the
            next step using the code.
          </p>
        </div>

        <form action={handleRegisterSubmit} className="mt-8 grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-900">Name</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              className="min-h-12 rounded-2xl border border-slate-900/15 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              placeholder="Alex Kim"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-900">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              className="min-h-12 rounded-2xl border border-slate-900/15 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              placeholder="you@company.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-900">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="min-h-12 rounded-2xl border border-slate-900/15 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              placeholder="At least 8 characters"
            />
          </label>

          {registerErrorMessage !== null ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {registerErrorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isRegisterPending}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isRegisterPending ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-sm text-slate-700">
            Already registered?{" "}
            <Link href="/login" className="font-semibold text-orange-600 transition hover:text-orange-500">
              Log in
            </Link>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-slate-900/10 bg-white/85 p-6 shadow-xl shadow-orange-100/70 sm:p-8">
      <div className="max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
          Email Verification
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Verify your account.</h2>
        <p className="mt-3 text-base leading-7 text-slate-700">
          Account created for <span className="font-medium text-slate-950">{registeredUser.email}</span>.
          Enter the verification code to activate email verification.
        </p>
      </div>

      <form action={handleVerifySubmit} className="mt-8 grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-900">Verification Code</span>
          <input
            type="text"
            name="code"
            inputMode="numeric"
            maxLength={4}
            required
            className="min-h-12 rounded-2xl border border-slate-900/15 bg-white px-4 text-base tracking-[0.35em] text-slate-950 outline-none transition placeholder:tracking-normal placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="1111"
          />
        </label>

        {verifyErrorMessage !== null ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {verifyErrorMessage}
          </p>
        ) : null}

        {verifySuccessMessage !== null ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {verifySuccessMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isVerifyPending || isVerified}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isVerified ? "Email Verified" : isVerifyPending ? "Verifying..." : "Verify Email"}
        </button>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-900/20 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Go to Login
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-900/20 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Back Home
          </Link>
        </div>
      </form>
    </div>
  );
}