"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { emptythrows, nonempty } from "@/lib/utils/string";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  // todo:
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = emptythrows(formData.get("email") as string);
  const password = emptythrows(formData.get("password") as string);
  const name = nonempty(formData.get("name") as string); // todo: ensure name is not empty string

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || data.user == null) {
    redirect("/error");
  }

  await prisma.user.create({
    data: {
      email,
      name,
      supabase_userId: data.user.id,
    },
  });

  revalidatePath("/", "layout");
  redirect("/");
}
