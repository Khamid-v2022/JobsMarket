export type UserProfileRole = "freelancer" | "client";

export const PROFILE_COOKIE_NAME = "jp_active_profile";
export const DEFAULT_PROFILE_ROLE: UserProfileRole = "freelancer";

export const AVAILABLE_PROFILES: UserProfileRole[] = ["freelancer", "client"];

export function isUserProfileRole(value: unknown): value is UserProfileRole {
  return value === "freelancer" || value === "client";
}

export function resolveActiveProfile(rawValue: string | null | undefined): UserProfileRole {
  if (isUserProfileRole(rawValue)) {
    return rawValue;
  }

  return DEFAULT_PROFILE_ROLE;
}
