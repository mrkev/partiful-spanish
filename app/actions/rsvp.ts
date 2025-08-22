"use server";

import { RSVPStatus } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";

export async function doRSVP(
  eventId: string,
  userId: string,
  status: RSVPStatus
) {
  return await prisma.rSVP.upsert({
    where: { userId_eventId: { userId, eventId } },
    update: {
      status,
    },
    create: {
      userId,
      eventId,
      status,
    },
  });
}
