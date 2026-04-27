import { NextRequest, NextResponse } from "next/server";

import { buildBackendUrl } from "@/shared/api/backend";

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

    const setCookie = upstream.headers.get("set-cookie");

    if (setCookie !== null) {
      response.headers.set("set-cookie", setCookie);
    }

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
