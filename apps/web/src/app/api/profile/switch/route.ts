import { NextRequest, NextResponse } from "next/server";

import {
  AVAILABLE_PROFILES,
  PROFILE_COOKIE_NAME,
  isUserProfileRole,
  resolveActiveProfile,
} from "@/shared/auth/profile";

type SwitchPayload = {
  profile?: string;
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  let payload: SwitchPayload;

  try {
    payload = (await request.json()) as SwitchPayload;
  } catch {
    return NextResponse.json(
      {
        message: "Invalid request payload.",
      },
      { status: 400 },
    );
  }

  if (!isUserProfileRole(payload.profile)) {
    return NextResponse.json(
      {
        message: "Unsupported profile.",
        profiles: AVAILABLE_PROFILES,
      },
      { status: 422 },
    );
  }

  const response = NextResponse.json({
    activeProfile: payload.profile,
    profiles: AVAILABLE_PROFILES,
  });

  response.cookies.set({
    name: PROFILE_COOKIE_NAME,
    value: resolveActiveProfile(payload.profile),
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
  });

  return response;
}
