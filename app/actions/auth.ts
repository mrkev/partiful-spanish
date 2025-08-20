import type { User as UserProfile } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import type { User } from "@supabase/supabase-js";
import React from "react";

export const genLogin = React.cache(async function (): Promise<
  { profile: null; auth: null } | { profile: UserProfile; auth: User }
> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || data?.user == null) {
    return { auth: null, profile: null };
  }

  const profile = await prisma.user.findFirstOrThrow({
    where: { supabase_userId: data.user.id },
  });

  return { auth: data.user, profile };
});

export async function expectGenLogin() {
  const login = await genLogin();
  if (login.auth == null || login.profile == null) {
    throw new Error("authentication failed");
  }
  return login;
}
