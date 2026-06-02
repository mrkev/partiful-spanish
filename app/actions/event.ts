"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";
import { emptythrows, nonempty } from "@/lib/utils/string";
import { expectGenLogin } from "./auth";

export type EventWithGoingCount = Prisma.EventGetPayload<{
  include: { _count: { select: { rsvps: true } } };
}>;

export type NewEventData = {
  title: string;
  description: string;
  start: Date;
  location: string;
  coverImage: string | null;
};

export async function createEvent(data: NewEventData) {
  const { profile } = await expectGenLogin();

  return await prisma.event.create({
    data: {
      title: emptythrows(data.title),
      description: nonempty(data.description),
      start: data.start,
      creatorId: profile.id,
      location: nonempty(data.location),
      image: data.coverImage,
    },
  });
}

export async function getEvent(id: string) {
  return await prisma.event.findFirstOrThrow({
    where: { id },
    include: { rsvps: true, creator: true },
  });
}

export async function updateEvent(id: string, data: NewEventData) {
  return await prisma.event.update({
    where: { id },
    data: {
      title: emptythrows(data.title),
      description: nonempty(data.description),
      start: data.start,
      location: nonempty(data.location),
      image: nonempty(data.coverImage),
    },
  });
}

export async function getAuthUserEvents() {
  const { profile } = await expectGenLogin();
  return {
    events: await prisma.event.findMany({
      where: { creatorId: profile.id },
      include: {
        _count: {
          select: { rsvps: { where: { status: { in: ["YES", "MAYBE"] } } } },
        },
      },
    }),
    profile,
  };
}

export async function ownsEvent(profileId: string, eventId: string) {
  const result = await prisma.event.count({
    where: { creatorId: profileId, id: eventId },
  });

  return result > 0;
}
