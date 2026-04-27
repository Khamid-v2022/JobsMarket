import { NextRequest, NextResponse } from "next/server";

import { buildBackendUrl } from "@/shared/api/backend";
import { appendSetCookiesFromUpstream } from "@/shared/api/set-cookie";
import { PROFILE_COOKIE_NAME } from "@/shared/auth/profile";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const upstream = await fetch(buildBackendUrl("/api/v1/auth/logout"), {
      method: "POST",
      headers: {
        accept: "application/json",
        cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    });

    const body = await upstream.text();
    const response = new NextResponse(body, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") ?? "application/json",
      },
    });

    appendSetCookiesFromUpstream(upstream, response);

    response.cookies.set({
      name: PROFILE_COOKIE_NAME,
      value: "",
      path: "/",
      maxAge: 0,
      sameSite: "lax",
      httpOnly: true,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        message: "Authentication service is unavailable.",
      },
      { status: 502 },
    );
  }
}
