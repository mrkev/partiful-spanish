"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { emptythrows, nonempty } from "@/lib/utils/string";
import { createClient } from "@/utils/supabase/server";

export type AuthState = { error: string } | null;

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: "Correo electrónico o contraseña incorrectos" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient();

  const email = emptythrows(formData.get("email") as string);
  const password = emptythrows(formData.get("password") as string);
  const name = nonempty(formData.get("name") as string);

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user == null) {
    return { error: "No se pudo crear la cuenta. Inténtalo de nuevo." };
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
