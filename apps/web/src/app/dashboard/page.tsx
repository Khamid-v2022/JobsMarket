import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PROFILE_COOKIE_NAME, resolveActiveProfile } from "@/shared/auth/profile";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const activeProfile = resolveActiveProfile(cookieStore.get(PROFILE_COOKIE_NAME)?.value);

  if (activeProfile === "freelancer") {
    redirect("/freelancer/dashboard");
  }

  redirect("/client/dashboard");
}
