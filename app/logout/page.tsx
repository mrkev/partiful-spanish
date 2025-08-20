import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error != null) {
    throw error;
  }
  redirect("/");
}
