import { NextRequest, NextResponse } from "next/server";

import { buildBackendUrl } from "@/shared/api/backend";

export async function POST(request: NextRequest): Promise<NextResponse> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        message: "Invalid request payload.",
      },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(buildBackendUrl("/api/v1/auth/verify-email"), {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        cookie: request.headers.get("cookie") ?? "",
      },
      body: JSON.stringify(payload),
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