"use server";

import prisma from "@/lib/prisma";

export async function testAction() {
  // return await prisma.user.create({
  //   data: {
  //     email: "mr.kev@me.com",
  //     // todo: ensure name is not empty string
  //   },
  // });

  return prisma.supabase_user.findMany();
}
