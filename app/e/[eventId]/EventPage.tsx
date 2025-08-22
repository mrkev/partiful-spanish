"use client";

import { doRSVP } from "@/app/actions/rsvp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Prisma, RSVP, RSVPStatus, User } from "@/lib/generated/prisma";
import { formatDateShort, formatTimeWithTimezone } from "@/lib/utils/date";
import { MapPin, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ProfileImage } from "./ProfileImage";

function countStatuses(rsvps: RSVP[]): Record<RSVPStatus, Set<string>> {
  // Initialize counts
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
    countStatuses(event.rsvps)
  );

  const rsvpStatuses = useMemo(() => {
    return mapUserToStatus(event.rsvps);
  }, []);
  const [userRSVP, setUserRSVP] = useState<RSVPStatus | null>(
    profile ? (rsvpStatuses[profile.id] ?? null) : null
  );

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRSVP = async (status: RSVPStatus) => {
    if (profile == null) {
      return;
    }

    // Remove previous RSVP count if user had already RSVP'd
    if (userRSVP) {
      rsvpCounts[userRSVP].delete(profile.id);
    }

    await doRSVP(event.id, profile.id, status);

    rsvpCounts[status].add(profile.id);

    setRsvpCounts((prev) => ({ ...prev }));
    setUserRSVP(status);
    setShowConfirmation(true);

    // Hide confirmation after 3 seconds
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Event Details */}
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1 row-span-2">
              <Card className="border-0 bg-white/70 backdrop-blur-sm transition-shadow hover:shadow-xl shadow-md">
                <CardContent>
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {event.title}
                  </h1>
                  <div className="text-base opacity-90 mb-4 text-gray-500">
                    Organizado por:{" "}
                    <span>
                      <ProfileImage
                        profile={event.creator}
                        className="w-8 h-8 text-sm"
                      />{" "}
                      {event.creator.name ?? event.creator.email}{" "}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col items-start space-x-4">
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                        Fecha
                      </p>
                      <p className="text-lg font-bold text-gray-800 capitalize">
                        {formatDateShort(event.start)}
                      </p>
                    </div>
                    <div className="flex flex-col items-start space-x-4">
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                        Hora
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        {formatTimeWithTimezone(event.start)}
                      </p>
                    </div>
                  </div>
                  {event.location && (
                    <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-gray-200">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
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
                    <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-gray-200">
                      <p className="text-gray-700 leading-normal text-lg">
                        {event.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Cover Image */}
            <div
              className={twMerge(
                "relative rounded-2xl overflow-hidden max-w-md mx-auto lg:col-span-2 order-1 lg:order-2 self-center w-full",
                "transition-shadow hover:shadow-xl shadow-md"
              )}
            >
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title} // todo: another alt text?
                width={400}
                height={400}
                className="w-full aspect-square object-cover"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <Badge className="bg-pink-500 hover:bg-pink-600 mb-2">
                  Evento Público
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                  {event.title}
                </h1>
                <p className="text-lg opacity-90">
                  Organizado por {event.creator.name ?? event.creator.email}
                </p>
              </div> */}
            </div>

            {/* <Card className="shadow-xl border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-1 lg:col-span-2 order-3">
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  ¡Invita a tus Amigos!
                </h4>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl">
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartir Evento
                </Button>
              </div>
            </Card> */}

            {/* Confirmation Message */}
            <div
              className={twMerge(
                "fixed inset-0 flex items-center justify-center bg-black/20 z-50 transition-all",
                "select-none pointer-events-none opacity-0",
                showConfirmation && userRSVP && "opacity-100"
              )}
            >
              <div
                className={twMerge(
                  "w-11/12 md:w-3/4 lg:w-2/3 h-3/4 shadow-2xl rounded-2xl border-0 bg-gradient-to-r backdrop-blur-sm text-white flex items-center justify-center",
                  "p-8 text-center flex-col gap-6",
                  userRSVP === "YES" && "from-green-500/70 to-emerald-500/70",
                  userRSVP === "NO" && "from-red-500/70 to-rose-500/70",
                  userRSVP === "MAYBE" && "from-blue-500/70 to-sky-500/70"
                )}
              >
                <span className="text-9xl">{getConfirmationEmoji()}</span>
                <p className="font-semibold text-xl">
                  {getConfirmationMessage()}
                </p>
              </div>
            </div>

            {/* RSVP Section */}
            <div className="space-y-6 order-3 lg:col-span-2">
              {/* RSVP Card */}
              <Card className="border-0 bg-white/90 backdrop-blur-sm transition-shadow shadow-md hover:shadow-xl">
                <CardContent>
                  <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    ¿Vas a Venir?
                  </h3>

                  <div className="flex flex-row gap-2 mb-6 justify-evenly">
                    <Button
                      onClick={() => handleRSVP("YES")}
                      className={twMerge(
                        `flex flex-col gap-0 rounded-full h-fit w-24 text-base font-light py-4 transition-all duration-200 text-white`,
                        userRSVP === "YES"
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg scale-105 border-4 border-emerald-600"
                          : "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600",
                        userRSVP !== "YES" &&
                          userRSVP != null &&
                          "opacity-70 scale-95"
                      )}
                    >
                      <span className="text-3xl">👍</span>
                      Sí, voy
                    </Button>

                    <Button
                      onClick={() => handleRSVP("MAYBE")}
                      className={twMerge(
                        `flex flex-col gap-0 rounded-full h-fit w-24 text-base font-light py-4 transition-all duration-200 text-white`,
                        userRSVP === "MAYBE"
                          ? "bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg scale-105 border-4 border-amber-600"
                          : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600",
                        userRSVP !== "MAYBE" &&
                          userRSVP != null &&
                          "opacity-70 scale-95"
                      )}
                    >
                      <span className="text-3xl">🤔</span>
                      Tal vez
                    </Button>

                    <Button
                      onClick={() => handleRSVP("NO")}
                      className={twMerge(
                        `flex flex-col gap-0 rounded-full h-fit w-24 text-base font-light py-4 transition-all duration-200 text-white`,
                        userRSVP === "NO"
                          ? "bg-gradient-to-r from-red-500 to-pink-600 shadow-lg scale-105 border-4 border-pink-600"
                          : "bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600",
                        userRSVP !== "NO" &&
                          userRSVP != null &&
                          "opacity-70 scale-95"
                      )}
                    >
                      <span className="text-3xl">😢</span>No puedo
                    </Button>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span className="text-lg font-bold text-purple-800">
                        {rsvpCounts.YES.size +
                          rsvpCounts.MAYBE.size +
                          rsvpCounts.NO.size}{" "}
                        personas han respondido
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {rsvpCounts.YES.size} confirmados •{" "}
                      {rsvpCounts.MAYBE.size} indecisos • {rsvpCounts.NO.size}{" "}
                      no van
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
