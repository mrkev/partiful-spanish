"use server";

import prisma from "@/lib/prisma";
import { RSVPStatus } from "@/lib/generated/prisma";
import { expectGenLogin } from "./auth";

export async function updateUserName(name: string) {
  const { profile } = await expectGenLogin();
  return prisma.user.update({ where: { id: profile.id }, data: { name } });
}

export async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      events: {
        orderBy: { start: "desc" },
      },
      rsvps: {
        where: { status: RSVPStatus.YES },
        include: { event: true },
        orderBy: { event: { start: "desc" } },
      },
    },
  });

  return user;
}
