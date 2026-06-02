"use client";

import { doRSVP } from "@/app/actions/rsvp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Prisma, RSVP, RSVPStatus, User } from "@/lib/generated/prisma";
import { formatDateShort, formatTimeWithTimezone } from "@/lib/utils/date";
import { MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ProfileImage } from "./ProfileImage";
import "./FancyStyle.css";

function countStatuses(rsvps: RSVP[]): Record<RSVPStatus, Set<string>> {
  const counts: Record<RSVPStatus, Set<string>> = {
    YES: new Set(),
    NO: new Set(),
    MAYBE: new Set(),
  };
  for (const rsvp of rsvps) {
    counts[rsvp.status].add(rsvp.userId);
  }
  return counts;
}

function mapUserToStatus(rsvps: RSVP[]): Record<string, RSVPStatus> {
  const map: Record<string, RSVPStatus> = {};
  for (const rsvp of rsvps) {
    map[rsvp.userId] = rsvp.status;
  }
  return map;
}

export function EventPage({
  event,
  profile,
}: {
  event: Prisma.EventGetPayload<{ include: { rsvps: true; creator: true } }>;
  profile: User | null;
}) {
  const [rsvpCounts, setRsvpCounts] = useState(() =>
    countStatuses(event.rsvps),
  );

  const rsvpStatuses = useMemo(() => mapUserToStatus(event.rsvps), []);
  const [userRSVP, setUserRSVP] = useState<RSVPStatus | null>(
    profile ? (rsvpStatuses[profile.id] ?? null) : null,
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRSVP = async (status: RSVPStatus) => {
    if (profile == null) return;
    if (userRSVP) rsvpCounts[userRSVP].delete(profile.id);
    await doRSVP(event.id, profile.id, status);
    rsvpCounts[status].add(profile.id);
    setRsvpCounts((prev) => ({ ...prev }));
    setUserRSVP(status);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const getConfirmationMessage = () => {
    switch (userRSVP) {
      case "YES":
        return "¡Genial! ¡Nos vemos pronto!";
      case "NO":
        return "¡Te extrañaremos!";
      case "MAYBE":
        return "¡Esperamos que puedas venir!";
      default:
        return "";
    }
  };

  const getConfirmationEmoji = () => {
    switch (userRSVP) {
      case "YES":
        return "🎉";
      case "NO":
        return "😭";
      case "MAYBE":
        return "🤞";
      default:
        return "";
    }
  };

  const theme = "sunrise";
  const totalRsvps =
    rsvpCounts.YES.size + rsvpCounts.MAYBE.size + rsvpCounts.NO.size;

  return (
    <main
      data-theme={theme}
      className={twMerge(
        "min-h-screen bg-linear-to-br",
        "from-pink-100 via-purple-50 to-cyan-100",
        "theme-sunrise:from-sky-100 via-emerald-50 to-amber-100",
      )}
    >
      {/* Screen-reader announcement for RSVP confirmation */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {showConfirmation && userRSVP ? getConfirmationMessage() : ""}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-4 gap-8">
          {/* Event details */}
          <article className="lg:col-span-2 space-y-6 order-2 lg:order-1 row-span-2">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {event.title}
            </h1>

            <p className="text-base text-gray-500">
              Organizado por:{" "}
              <span className="inline-flex items-center gap-1.5 align-middle">
                <ProfileImage
                  profile={event.creator}
                  className="w-8 h-8 text-sm"
                />
                {event.creator.name ?? event.creator.email}
              </span>
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                  Fecha
                </p>
                <p className="text-lg font-bold text-gray-800 capitalize">
                  {formatDateShort(event.start)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                  Hora
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {formatTimeWithTimezone(event.start)}
                </p>
              </div>
            </div>

            {event.location && (
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 bg-linear-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shrink-0"
                >
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                    Ubicación
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    {event.location}
                  </p>
                </div>
              </div>
            )}

            {event.description && (
              <p className="text-gray-700 leading-normal text-lg pt-6 border-t border-gray-200">
                {event.description}
              </p>
            )}

            {/* RSVP count */}
            <section
              aria-label="Respuestas"
              className="bg-linear-to-r from-purple-50 to-pink-50 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <Users
                  aria-hidden="true"
                  className="w-5 h-5 text-purple-600 shrink-0"
                />
                <span className="text-lg font-bold text-purple-800">
                  {totalRsvps} personas han respondido
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {rsvpCounts.YES.size} confirmados · {rsvpCounts.MAYBE.size}{" "}
                indecisos · {rsvpCounts.NO.size} no van
              </p>
            </section>
          </article>

          {/* Cover image */}
          <figure
            className={twMerge(
              "relative rounded-2xl overflow-hidden max-w-md mx-auto lg:col-span-2 order-1 lg:order-2 self-center w-full",
              "transition-shadow hover:shadow-xl shadow-md",
            )}
          >
            <Image
              src={event.image || "/placeholder.svg"}
              alt={`Imagen de portada para ${event.title}`}
              width={400}
              height={400}
              className="w-full aspect-square object-cover"
            />
          </figure>

          {/* RSVP */}
          <section
            aria-labelledby="rsvp-heading"
            className="order-3 lg:col-span-2"
          >
            <Card className="border-0 bg-white/90 backdrop-blur-sm transition-shadow shadow-md hover:shadow-xl">
              <CardContent>
                <h2
                  id="rsvp-heading"
                  className="text-2xl font-bold mb-6 text-center bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                >
                  ¿Vas a Venir?
                </h2>

                <div
                  role="group"
                  aria-label="Opciones de asistencia"
                  className="flex flex-row gap-2 justify-evenly"
                >
                  <Button
                    onClick={() => handleRSVP("YES")}
                    aria-pressed={userRSVP === "YES"}
                    className={twMerge(
                      "flex flex-col gap-0 rounded-full h-fit w-24 text-base font-light py-4 transition-all duration-200 text-white",
                      userRSVP === "YES"
                        ? "bg-linear-to-r from-green-500 to-emerald-600 shadow-lg scale-105 border-4 border-emerald-600"
                        : "bg-linear-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600",
                      userRSVP !== "YES" &&
                        userRSVP != null &&
                        "opacity-70 scale-95",
                    )}
                  >
                    <span aria-hidden="true" className="text-3xl">
                      👍
                    </span>
                    Sí, voy
                  </Button>

                  <Button
                    onClick={() => handleRSVP("MAYBE")}
                    aria-pressed={userRSVP === "MAYBE"}
                    className={twMerge(
                      "flex flex-col gap-0 rounded-full h-fit w-24 text-base font-light py-4 transition-all duration-200 text-white",
                      userRSVP === "MAYBE"
                        ? "bg-linear-to-r from-yellow-500 to-orange-600 shadow-lg scale-105 border-4 border-amber-600"
                        : "bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600",
                      userRSVP !== "MAYBE" &&
                        userRSVP != null &&
                        "opacity-70 scale-95",
                    )}
                  >
                    <span aria-hidden="true" className="text-3xl">
                      🤔
                    </span>
                    Tal vez
                  </Button>

                  <Button
                    onClick={() => handleRSVP("NO")}
                    aria-pressed={userRSVP === "NO"}
                    className={twMerge(
                      "flex flex-col gap-0 rounded-full h-fit w-24 text-base font-light py-4 transition-all duration-200 text-white",
                      userRSVP === "NO"
                        ? "bg-linear-to-r from-red-500 to-pink-600 shadow-lg scale-105 border-4 border-pink-600"
                        : "bg-linear-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600",
                      userRSVP !== "NO" &&
                        userRSVP != null &&
                        "opacity-70 scale-95",
                    )}
                  >
                    <span aria-hidden="true" className="text-3xl">
                      😢
                    </span>
                    No puedo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      {/* Confirmation overlay — visual only, announced via aria-live above */}
      <div
        aria-hidden="true"
        className={twMerge(
          "fixed inset-0 flex items-center justify-center bg-black/20 z-50 transition-all",
          "select-none pointer-events-none opacity-0",
          showConfirmation && userRSVP && "opacity-100",
        )}
      >
        <div
          className={twMerge(
            "w-11/12 md:w-3/4 lg:w-2/3 h-3/4 shadow-2xl rounded-2xl border-0 bg-linear-to-r backdrop-blur-sm text-white flex items-center justify-center",
            "p-8 text-center flex-col gap-6",
            userRSVP === "YES" && "from-green-500/70 to-emerald-500/70",
            userRSVP === "NO" && "from-red-500/70 to-rose-500/70",
            userRSVP === "MAYBE" && "from-blue-500/70 to-sky-500/70",
          )}
        >
          <span className="text-9xl">{getConfirmationEmoji()}</span>
          <p className="font-semibold text-xl">{getConfirmationMessage()}</p>
        </div>
      </div>
    </main>
  );
}
