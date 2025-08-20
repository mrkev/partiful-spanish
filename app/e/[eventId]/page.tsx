import { getEvent } from "@/app/actions/event";
import { EventPage } from "./EventPage";

export default async function Page({
  params: paramsPromise,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const params = await paramsPromise;
  const event = await getEvent(params.eventId);

  return <EventPage event={event} />;
}
