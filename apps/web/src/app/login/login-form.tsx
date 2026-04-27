"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type AuthUser = {
  id: number;
  name: string;
  email: string;
};

type MeResponse = {
  user: AuthUser;
};

type LoginResponse = {
  message?: string;
  user?: AuthUser;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export function LoginForm() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isActive = true;

    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        });

        if (!response.ok) {
          if (isActive) {
            setCurrentUser(null);
          }

          return;
        }

        const data = (await response.json()) as MeResponse;

        if (isActive) {
          setCurrentUser(data.user);
        }
      } catch {
        if (isActive) {
          setCurrentUser(null);
        }
      } finally {
        if (isActive) {
          setIsCheckingSession(false);
        }
      }
    };

    void loadSession();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (currentUser !== null) {
      router.replace("/dashboard");
      router.refresh();
    }
  }, [currentUser, router]);

  const handleSubmit = (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    startTransition(async () => {
      setErrorMessage(null);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = (await response.json().catch(() => null)) as LoginResponse | null;

      if (!response.ok) {
        const validationMessage = data?.errors?.email?.[0] ?? data?.errors?.password?.[0];

        setErrorMessage(validationMessage ?? data?.message ?? "Unable to sign in.");
        setCurrentUser(null);

        return;
      }

      setCurrentUser(data?.user ?? null);
      router.replace("/dashboard");
      router.refresh();
    });
  };

  if (isCheckingSession) {
    return (
      <div className="rounded-3xl border border-slate-900/10 bg-white/80 p-6 text-sm text-slate-700 shadow-lg shadow-orange-100/60">
        Checking your session...
      </div>
    );
  }

  if (currentUser !== null) {
    return (
      <div className="rounded-3xl border border-slate-900/10 bg-white/80 p-6 text-sm text-slate-700 shadow-lg shadow-orange-100/60">
        Redirecting to your dashboard...
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-slate-900/10 bg-white/85 p-6 shadow-xl shadow-orange-100/70 sm:p-8">
      <div className="max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
          Employer Access
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Sign in with email and password.</h2>
        <p className="mt-3 text-base leading-7 text-slate-700">
          Access your hiring workspace, candidate pipeline, and live shortlist updates.
        </p>
      </div>

      <form action={handleSubmit} className="mt-8 grid gap-5">
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
            autoComplete="current-password"
            required
            className="min-h-12 rounded-2xl border border-slate-900/15 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            placeholder="Enter your password"
          />
        </label>

        {errorMessage !== null ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isPending ? "Signing in..." : "Log In"}
        </button>

        <p className="text-sm text-slate-700">
          New here?{" "}
          <Link href="/register" className="font-semibold text-orange-600 transition hover:text-orange-500">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}