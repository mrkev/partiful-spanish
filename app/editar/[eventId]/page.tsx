"use server";

import { getEvent } from "@/app/actions/event";
import { EditEventPage } from "./EditEventPage";

export default async function Page({
  params: paramsPromise,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const params = await paramsPromise;
  const event = await getEvent(params.eventId);

  return <EditEventPage event={event} />;
}
