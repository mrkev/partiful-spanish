import { getEvent } from "@/app/actions/event";
import { EventPage } from "./EventPage";
import { genLogin } from "@/app/actions/auth";

export default async function Page({
  params: paramsPromise,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const params = await paramsPromise;
  const event = await getEvent(params.eventId);
  const login = await genLogin();
  return <EventPage event={event} profile={login.profile} />;
}
