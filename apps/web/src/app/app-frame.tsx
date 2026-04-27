"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useMemo, useRef, useState, useTransition } from "react";

type SessionUser = {
  id: number;
  name: string;
  email: string;
};

type MeResponse = {
  user: SessionUser;
};

const PUBLIC_PATHS = new Set(["/", "/login", "/register"]);

function extractInitials(name: string): string {
  const tokens = name
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 0)
    .slice(0, 2);

  if (tokens.length === 0) {
    return "U";
  }

  return tokens.map((token) => token[0]?.toUpperCase() ?? "").join("");
}

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = pathname === null || PUBLIC_PATHS.has(pathname);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return <AuthenticatedShell>{children}</AuthenticatedShell>;
}

function AuthenticatedShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, startLogoutTransition] = useTransition();
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        });

        if (!response.ok) {
          if (active) {
            setUser(null);
          }

          return;
        }

        const data = (await response.json()) as MeResponse;

        if (active) {
          setUser(data.user);
        }
      } catch {
        if (active) {
          setUser(null);
        }
      }
    };

    void loadUser();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current !== null &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const avatarLabel = useMemo(() => {
    if (user === null) {
      return "U";
    }

    return extractInitials(user.name);
  }, [user]);

  const handleLogout = () => {
    startLogoutTransition(async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            accept: "application/json",
          },
          cache: "no-store",
        });
      } finally {
        setIsDropdownOpen(false);
        setUser(null);
        router.replace("/login");
        router.refresh();
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(160deg,#fffdf7_0%,#f7f4ea_52%,#eef2f7_100%)]">
      {/* ── Topbar: 화면 최상단 고정, h-16 = 4rem ── */}
      <header className="sticky top-0 z-10 flex h-16 w-full shrink-0 items-center justify-between border-b border-white/10 bg-[linear-gradient(120deg,rgba(15,23,42,0.97),rgba(30,41,59,0.93))] px-4 text-slate-100 shadow-[0_2px_20px_rgba(15,23,42,0.25)] backdrop-blur sm:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200/90">
            JobPortal Workspace
          </p>
          <p className="text-sm font-semibold leading-none sm:text-base">Operations Console</p>
        </div>

        <div className="relative" ref={dropdownContainerRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={isDropdownOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-sm font-semibold text-amber-100 transition hover:-translate-y-0.5 hover:border-amber-200/70 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            {avatarLabel}
          </button>

          {isDropdownOpen ? (
            <div className="absolute right-0 z-20 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-900/10 bg-white p-1.5 text-slate-900 shadow-2xl shadow-slate-900/15">
              <div className="border-b border-slate-200 px-3 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Account</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{user?.name ?? "Signed user"}</p>
                <p className="truncate text-xs text-slate-500">{user?.email ?? "Session active"}</p>
              </div>

              <button
                type="button"
                disabled
                className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-400"
              >
                Profile (coming soon)
              </button>

              <button
                type="button"
                disabled
                className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-400"
              >
                Setting (coming soon)
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : null}
        </div>
      </header>

      {/* ── Content: min-h = 100vh − topbar(4rem) − footer(3rem) ── */}
      <main
        className="w-full flex-1 p-4 sm:p-6 lg:p-8"
        style={{ minHeight: "calc(100vh - 4rem - 3rem)" }}
      >
        {children}
      </main>

      {/* ── Footer: 화면 최하단 고정, h-12 = 3rem ── */}
      <footer className="flex h-12 w-full shrink-0 items-center justify-center border-t border-slate-900/10 bg-[rgba(15,23,42,0.97)] px-4 text-xs font-medium tracking-[0.08em] text-slate-400">
        © {new Date().getFullYear()} JobPortal. Crafted for focused recruiting operations.
      </footer>
    </div>
  );
}
