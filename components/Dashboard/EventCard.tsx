"use client";

import { EventWithGoingCount } from "@/app/actions/event";
import { formatTimeShort } from "@/lib/utils/date";
import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface EventCardProps {
  event: EventWithGoingCount;
}

export function EventCard({ event }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const goingCount = event._count.rsvps;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((rect.height / 2 - y) / rect.height) * 12;
    const ry = ((x - rect.width / 2) / rect.width) * 12;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
    card.style.boxShadow = `0 24px 48px rgba(0,0,0,0.5)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
    card.style.boxShadow = "";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl overflow-hidden h-72 bg-zinc-900 will-change-transform cursor-default"
      style={{
        transition: "transform 0.12s ease-out, box-shadow 0.12s ease-out",
      }}
    >
      {/* Background image */}
      {event.image && (
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      )}

      {/* Gradient overlay — always present so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

      {/* Date — top left */}
      <div className="absolute top-4 left-4">
        <div className="text-xs uppercase tracking-wide text-white/60 leading-none mb-0.5">
          {event.start.toLocaleDateString("es-ES", { month: "short" })}
        </div>
        <div className="text-3xl font-bold text-white leading-none">
          {event.start.getDate()}
        </div>
      </div>

      {/* Going count — top right */}
      <div className="absolute top-4 right-4">
        <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-black/50 text-white/80">
          <Users className="w-3 h-3" />
          {goingCount}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-bold text-white text-lg leading-tight mb-1 line-clamp-2">
          {event.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatTimeShort(event.start)}
          </span>
          {event.location && (
            <span className="flex items-center gap-1 min-w-0">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/editar/${event.id}`} className="flex-1">
            <button className="w-full text-xs py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer">
              Editar
            </button>
          </Link>
          <Link href={`/e/${event.id}`} className="flex-1">
            <button className="w-full text-xs py-1.5 rounded-lg bg-violet-600/80 hover:bg-violet-600 text-white transition-colors cursor-pointer">
              Ver
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
