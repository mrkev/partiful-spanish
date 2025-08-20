"use client";

import { EditEventForm } from "@/components/EditEvent/EditEventForm";
import { Prisma } from "@/lib/generated/prisma";
import { Loader } from "lucide-react";

import { useEffect, useState } from "react";

// Mock event data - in a real app, this would come from your API
const mockEventData = {
  "retro-90s-party": {
    id: "retro-90s-party",
    title: "Fiesta Retro 90s - ¡Volvamos al Pasado!",
    description:
      "¡Prepárate para un viaje en el tiempo! Una noche llena de música de los 90s, karaoke, juegos retro y mucha nostalgia. Ven vestido con tu outfit más 90s y prepárate para bailar hasta el amanecer. Habrá concursos, premios y sorpresas increíbles. ¡No te lo puedes perder!",
    date: "2024-02-15",
    time: "20:00",
    location: "Casa de María - Calle Retro 123, CDMX",
    coverImage: "/90s-party-cover.png",
    isPrivate: false,
  },
  "cumple-ana": {
    id: "cumple-ana",
    title: "Cumpleaños de Ana 🎂",
    description: "Celebremos los 25 años de Ana con una fiesta increíble",
    date: "2024-02-28",
    time: "19:30",
    location: "Salón de Fiestas El Jardín",
    coverImage: "/birthday-party.png",
    isPrivate: true,
  },
};

export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coverImage: string;
  isPrivate: boolean;
}

export function EditEventPage({
  event,
}: {
  event: Prisma.EventGetPayload<{ include: { rsvps: true } }>;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Editar Evento
            </h1>
            <p className="text-xl text-gray-600">
              Actualiza los detalles de tu evento 📝
            </p>
          </div>

          <EditEventForm event={event} />
        </div>
      </div>
    </div>
  );
}
