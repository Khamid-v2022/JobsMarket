import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  AVAILABLE_PROFILES,
  PROFILE_COOKIE_NAME,
  resolveActiveProfile,
} from "@/shared/auth/profile";

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const activeProfile = resolveActiveProfile(cookieStore.get(PROFILE_COOKIE_NAME)?.value);

  return NextResponse.json({
    activeProfile,
    profiles: AVAILABLE_PROFILES,
  });
}
