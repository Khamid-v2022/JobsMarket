import { NextRequest, NextResponse } from "next/server";

import { buildBackendUrl } from "@/shared/api/backend";
import { appendSetCookiesFromUpstream } from "@/shared/api/set-cookie";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const upstream = await fetch(buildBackendUrl("/api/v1/auth/me"), {
      method: "GET",
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