"use client";

import { BlobCanvas } from "@/components/BlobCanvas";
import { Pill } from "@/components/Pill";
import { Prisma } from "@/lib/generated/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { EditEventForm } from "./EditEventForm";

export function EditEventPage({
  event,
}: {
  event: Prisma.EventGetPayload<{ include: { rsvps: true } }>;
}) {
  return (
    <div className="relative min-h-screen">
      <BlobCanvas />

      <div className="fixed top-4 left-4 z-50">
        <Pill>
          <Link
            href={`/e/${event.id}`}
            className="flex items-center gap-1.5 h-9 px-1 text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
        </Pill>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 max-w-xl">
        <h1 className="text-3xl font-bold text-stone-900 mb-10">
          Editar evento
        </h1>
        <EditEventForm event={event} />
      </div>
    </div>
  );
}
