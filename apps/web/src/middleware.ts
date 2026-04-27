import { NextRequest, NextResponse } from "next/server";

import { PROFILE_COOKIE_NAME, resolveActiveProfile } from "@/shared/auth/profile";

const DEFAULT_BACKEND_URL = "http://localhost:8000";

const PUBLIC_PATHS = new Set(["/", "/login", "/register"]);
const GUEST_ONLY_PATHS = new Set(["/login", "/register"]);

const FREELANCER_PREFIX = "/freelancer";
const CLIENT_PREFIX = "/client";

function getDashboardPathByProfile(profile: "freelancer" | "client"): string {
  return profile === "freelancer" ? "/freelancer/dashboard" : "/client/dashboard";
}

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function getBackendBaseUrl(): string {
  return normalizeBaseUrl(
    process.env.API_BASE_URL ?? process.env.BACKEND_URL ?? DEFAULT_BACKEND_URL,
  );
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const response = await fetch(`${getBackendBaseUrl()}/api/v1/auth/me`, {
      method: "GET",
      headers: {
        accept: "application/json",
        cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const authenticated = await isAuthenticated(request);
  const activeProfile = resolveActiveProfile(request.cookies.get(PROFILE_COOKIE_NAME)?.value);
  const activeDashboardPath = getDashboardPathByProfile(activeProfile);

  if (authenticated && GUEST_ONLY_PATHS.has(pathname)) {
    return NextResponse.redirect(new URL(activeDashboardPath, request.url));
  }

  if (!authenticated && !PUBLIC_PATHS.has(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (authenticated && pathname === "/dashboard") {
    return NextResponse.redirect(new URL(activeDashboardPath, request.url));
  }

  if (authenticated && pathname.startsWith(FREELANCER_PREFIX) && activeProfile !== "freelancer") {
    return NextResponse.redirect(new URL(activeDashboardPath, request.url));
  }

  if (authenticated && pathname.startsWith(CLIENT_PREFIX) && activeProfile !== "client") {
    return NextResponse.redirect(new URL(activeDashboardPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
