import { NextRequest, NextResponse } from "next/server";

const DEFAULT_BACKEND_URL = "http://localhost:8000";

const PUBLIC_PATHS = new Set(["/", "/login", "/register"]);
const GUEST_ONLY_PATHS = new Set(["/login", "/register"]);

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

  if (authenticated && GUEST_ONLY_PATHS.has(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!authenticated && !PUBLIC_PATHS.has(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
