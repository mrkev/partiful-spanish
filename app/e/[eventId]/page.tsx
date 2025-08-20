"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Share2,
  Sparkles,
  Check,
  X,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Mock data - in a real app, this would come from your API
const mockEventData = {
  id: "retro-90s-party",
  title: "Fiesta Retro 90s - ¡Volvamos al Pasado!",
  description:
    "¡Prepárate para un viaje en el tiempo! Una noche llena de música de los 90s, karaoke, juegos retro y mucha nostalgia. Ven vestido con tu outfit más 90s y prepárate para bailar hasta el amanecer. Habrá concursos, premios y sorpresas increíbles. ¡No te lo puedes perder!",
  date: "2024-02-15",
  time: "20:00",
  location: "Casa de María - Calle Retro 123, CDMX",
  coverImage: "/90s-party-cover.png",
  hostName: "María González",
  isPrivate: false,
  rsvpCounts: {
    yes: 24,
    no: 3,
    maybe: 8,
  },
};

type RSVPStatus = "yes" | "no" | "maybe" | null;

export default function EventPage({ params }: { params: { eventId: string } }) {
  const [userRSVP, setUserRSVP] = useState<RSVPStatus>(null);
  const [rsvpCounts, setRsvpCounts] = useState(mockEventData.rsvpCounts);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRSVP = (status: RSVPStatus) => {
    // Remove previous RSVP count if user had already RSVP'd
    if (userRSVP) {
      setRsvpCounts((prev) => ({
        ...prev,
        [userRSVP]: prev[userRSVP] - 1,
      }));
    }

    // Add new RSVP count
    if (status) {
      setRsvpCounts((prev) => ({
        ...prev,
        [status]: prev[status] + 1,
      }));
    }

    setUserRSVP(status);
    setShowConfirmation(true);

    // Hide confirmation after 3 seconds
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getConfirmationMessage = () => {
    switch (userRSVP) {
      case "yes":
        return "¡Genial! Nos vemos en la fiesta 🎉";
      case "no":
        return "Entendido, te extrañaremos 😢";
      case "maybe":
        return "Esperamos que puedas venir 🤞";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/inicio"
            className="flex items-center space-x-2 text-purple-700 hover:text-purple-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Awebo
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Cover Image */}
          <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={mockEventData.coverImage || "/placeholder.svg"}
              alt={mockEventData.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <Badge className="bg-pink-500 hover:bg-pink-600 mb-2">
                Evento Público
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-2 leading-tight">
                {mockEventData.title}
              </h1>
              <p className="text-lg opacity-90">
                Organizado por {mockEventData.hostName}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date, Time, Location */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                          Fecha
                        </p>
                        <p className="text-lg font-bold text-gray-800 capitalize">
                          {formatDate(mockEventData.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                          Hora
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                          {mockEventData.time} hrs
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                        Ubicación
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        {mockEventData.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Sobre el Evento
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {mockEventData.description}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* RSVP Section */}
            <div className="space-y-6">
              {/* Confirmation Message */}
              {showConfirmation && userRSVP && (
                <Card className="shadow-xl border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse">
                  <CardContent className="p-4 text-center">
                    <Check className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">{getConfirmationMessage()}</p>
                  </CardContent>
                </Card>
              )}

              {/* RSVP Card */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    ¿Vas a Venir?
                  </h3>

                  <div className="space-y-3 mb-6">
                    {/* Yes Button */}
                    <Button
                      onClick={() => handleRSVP("yes")}
                      className={`w-full text-lg py-4 rounded-xl transition-all duration-200 ${
                        userRSVP === "yes"
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105"
                          : "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white"
                      }`}
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Sí, voy ({rsvpCounts.yes})
                      {userRSVP === "yes" && (
                        <Sparkles className="w-5 h-5 ml-2" />
                      )}
                    </Button>

                    {/* Maybe Button */}
                    <Button
                      onClick={() => handleRSVP("maybe")}
                      className={`w-full text-lg py-4 rounded-xl transition-all duration-200 ${
                        userRSVP === "maybe"
                          ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg scale-105"
                          : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
                      }`}
                    >
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Tal vez ({rsvpCounts.maybe})
                      {userRSVP === "maybe" && (
                        <Sparkles className="w-5 h-5 ml-2" />
                      )}
                    </Button>

                    {/* No Button */}
                    <Button
                      onClick={() => handleRSVP("no")}
                      className={`w-full text-lg py-4 rounded-xl transition-all duration-200 ${
                        userRSVP === "no"
                          ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg scale-105"
                          : "bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white"
                      }`}
                    >
                      <X className="w-5 h-5 mr-2" />
                      No puedo ({rsvpCounts.no})
                      {userRSVP === "no" && (
                        <Sparkles className="w-5 h-5 ml-2" />
                      )}
                    </Button>
                  </div>

                  {/* Total Count */}
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span className="text-lg font-bold text-purple-800">
                        {rsvpCounts.yes + rsvpCounts.maybe + rsvpCounts.no}{" "}
                        personas han respondido
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {rsvpCounts.yes} confirmados • {rsvpCounts.maybe}{" "}
                      indecisos • {rsvpCounts.no} no van
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Share Card */}
              <Card className="shadow-xl border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-1">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    ¡Invita a tus Amigos!
                  </h4>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl">
                    <Share2 className="w-5 h-5 mr-2" />
                    Compartir Evento
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
