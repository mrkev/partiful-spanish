"use server";

import { getAuthUserEvents } from "../actions/event";
import { DashboardPage } from "./DashboardPage";

export default async function InicioPage() {
  const { events, profile } = await getAuthUserEvents();
  return <DashboardPage events={events} profile={profile} />;
}
