"use server";

import prisma from "@/lib/prisma";
import { emptythrows, nonempty } from "@/lib/utils/string";
import { kevinId } from "./serveronly";

export type NewEventData = {
  title: string;
  description: string;
  start: Date;
  location: string;
  coverImage: File | null;
};

export async function createEvent(data: NewEventData) {
  const id = await kevinId();

  return await prisma.event.create({
    data: {
      title: emptythrows(data.title),
      description: nonempty(data.description),
      start: data.start,
      creatorId: id,
      location: nonempty(data.location),
    },
  });
}

export async function getEvent(id: string) {
  return await prisma.event.findFirstOrThrow({
    where: { id },
    include: { rsvps: true, creator: true },
  });
}
