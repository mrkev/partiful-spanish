"use client";

import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { EmptyState } from "@/components/Dashboard/EmptyState";
import { EventSection } from "@/components/Dashboard/EventSection";
import { Event, User } from "@/lib/generated/prisma";
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Hola de nuevo, {profile.name}.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {upcomingEvents.length === 0 ? (
                <>
                  No se aproxima ningún evento.{" "}
                  <Link className="hover:underline" href={"/create"}>
                    ¡Organiza uno!
                  </Link>
                </>
              ) : upcomingEvents.length === 1 ? (
                <>
                  Se aproxima un evento.{" "}
                  <Link
                    className="hover:underline"
                    href={`/e/${upcomingEvents[0].id}`}
                  >
                    Este es el link.
                  </Link>
                </>
              ) : (
                <>
                  ¡Se aproximan {upcomingEvents.length} eventos! Checalos abajo.
                </>
              )}
            </p>
          </div>

          {/* Events Sections */}
          {upcomingEvents.length > 0 && (
            <EventSection
              title="Próximos Eventos"
              events={upcomingEvents}
              badgeColor="green"
              className="mb-16"
            />
          )}

          {pastEvents.length > 0 && (
            <EventSection
              title="Eventos Pasados"
              events={pastEvents}
              badgeColor="gray"
            />
          )}

          {/* Empty State */}
          {events.length === 0 && <EmptyState />}
        </div>
      </div>
    </div>
  );
}
