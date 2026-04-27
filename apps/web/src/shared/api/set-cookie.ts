import { NextResponse } from "next/server";

type HeadersWithGetSetCookie = Headers & {
  getSetCookie?: () => string[];
};

function extractSetCookieHeaders(headers: Headers): string[] {
  const candidate = headers as HeadersWithGetSetCookie;

  if (typeof candidate.getSetCookie === "function") {
    return candidate.getSetCookie();
  }

  const singleSetCookie = headers.get("set-cookie");

  return singleSetCookie === null ? [] : [singleSetCookie];
}

export function appendSetCookiesFromUpstream(
  upstreamResponse: Response,
  response: NextResponse,
): void {
  for (const setCookie of extractSetCookieHeaders(upstreamResponse.headers)) {
    response.headers.append("set-cookie", setCookie);
  }
}
