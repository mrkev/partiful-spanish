"use client";

import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { EmptyState } from "@/components/Dashboard/EmptyState";
import { EventSection } from "@/components/Dashboard/EventSection";
import { Event, User } from "@/lib/generated/prisma";

export function DashboardPage({
  events,
  profile,
}: {
  events: Event[];
  profile: User;
}) {
  const upcomingEvents = events.filter(
    (event) => event.start.getTime() > Date.now(),
  );
  const pastEvents = events.filter(
    (event) => event.start.getTime() <= Date.now(),
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            Hola, {profile.name}.
          </h1>
          <p className="text-zinc-500 mt-1">Tus eventos</p>
        </div>

        {events.length === 0 && <EmptyState />}

        {upcomingEvents.length > 0 && (
          <EventSection
            title="Próximos"
            events={upcomingEvents}
            badgeColor="green"
            className="mb-10"
          />
        )}

        {pastEvents.length > 0 && (
          <EventSection
            title="Pasados"
            events={pastEvents}
            badgeColor="gray"
          />
        )}
      </div>
    </div>
  );
}
