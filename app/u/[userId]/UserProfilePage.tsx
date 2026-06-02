"use client";

import { ProfileImage } from "@/app/e/[eventId]/ProfileImage";
import { updateUserName } from "@/app/actions/user";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { EditableText } from "@/components/EditableText";
import { Button } from "@/components/ui/button";
import { Prisma, RSVPStatus, User } from "@/lib/generated/prisma";
import { formatDateShort } from "@/lib/utils/date";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type UserWithEvents = Prisma.UserGetPayload<{
  include: {
    events: true;
    rsvps: { include: { event: true } };
  };
}>;

function MiniEventCard({
  event,
}: {
  event: { id: string; title: string; start: Date; location: string | null; image: string | null };
}) {
  return (
    <Link href={`/e/${event.id}`} className="flex items-center gap-3 group">
      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
        {event.image && (
          <Image src={event.image} alt={event.title} fill className="object-cover" />
        )}
        {!event.image && (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs font-bold">
            {event.start.getDate()}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white truncate group-hover:text-violet-300 transition-colors">
          {event.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span className="capitalize">{formatDateShort(event.start)}</span>
          </span>
          {event.location && (
            <span className="flex items-center gap-1 min-w-0">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function UserProfilePage({
  user,
  isOwner,
  currentUser,
}: {
  user: UserWithEvents;
  isOwner: boolean;
  currentUser: User | null;
}) {
  const hostedCount = user.events.length;
  const attendedCount = user.rsvps.filter((r) => r.status === RSVPStatus.YES).length;
  const attendedEvents = user.rsvps.map((r) => r.event);

  const upcomingHosted = user.events.filter((e) => e.start.getTime() > Date.now());
  const pastHosted = user.events.filter((e) => e.start.getTime() <= Date.now());

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name ?? user.email);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await updateUserName(name);
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <DashboardHeader profile={currentUser} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Profile header */}
        <div className="flex items-start gap-6 mb-10">
          <ProfileImage profile={user} className="w-20 h-20 text-3xl shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <EditableText
                editable={editing}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-3xl font-bold text-white w-full bg-transparent border-none outline-none"
              />
              {isOwner && !editing && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-500 hover:text-white shrink-0"
                  onClick={() => setEditing(true)}
                >
                  Editar
                </Button>
              )}
              {isOwner && editing && (
                <Button
                  size="sm"
                  className="bg-violet-600 hover:bg-violet-700 text-white shrink-0"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Guardando…" : "Guardar"}
                </Button>
              )}
            </div>
            {user.bio && (
              <p className="text-zinc-400 mt-2 leading-relaxed">{user.bio}</p>
            )}
            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{hostedCount}</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wide">
                  {hostedCount === 1 ? "Evento organizado" : "Eventos organizados"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{attendedCount}</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wide">
                  {attendedCount === 1 ? "Evento asistido" : "Eventos asistidos"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hosted events */}
        {hostedCount > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Eventos organizados
            </h2>
            {upcomingHosted.length > 0 && (
              <div className="mb-6">
                <p className="text-xs text-zinc-600 mb-3">Próximos</p>
                <div className="space-y-4">
                  {upcomingHosted.map((event) => (
                    <MiniEventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
            {pastHosted.length > 0 && (
              <div>
                <p className="text-xs text-zinc-600 mb-3">Pasados</p>
                <div className="space-y-4">
                  {pastHosted.map((event) => (
                    <MiniEventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Attended events */}
        {attendedCount > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Eventos asistidos
            </h2>
            <div className="space-y-4">
              {attendedEvents.map((event) => (
                <MiniEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {hostedCount === 0 && attendedCount === 0 && (
          <p className="text-zinc-600 text-center py-12">
            Aún no hay actividad.
          </p>
        )}
      </div>
    </div>
  );
}
