"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Prisma } from "@/lib/generated/prisma";
import { formatDateShort, formatTimeWithTimezone } from "@/lib/utils/date";
import { MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type RSVPStatus = "yes" | "no" | "maybe" | null;

export function EventPage({
  // event = mockEventData2,
  event,
}: {
  event: Prisma.EventGetPayload<{ include: { rsvps: true; creator: true } }>;
}) {
  const [userRSVP, setUserRSVP] = useState<RSVPStatus>(null);
  const [rsvpCounts, setRsvpCounts] = useState(event.rsvps.length);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // const handleRSVP = (status: RSVPStatus) => {
  //   // Remove previous RSVP count if user had already RSVP'd
  //   if (userRSVP) {
  //     setRsvpCounts((prev) => ({
  //       ...prev,
  //       [userRSVP]: prev[userRSVP] - 1,
  //     }));
  //   }

  //   // Add new RSVP count
  //   if (status) {
  //     setRsvpCounts((prev) => ({
  //       ...prev,
  //       [status]: prev[status] + 1,
  //     }));
  //   }

  //   setUserRSVP(status);
  //   setShowConfirmation(true);

  //   // Hide confirmation after 3 seconds
  //   setTimeout(() => setShowConfirmation(false), 3000);
  // };

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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Event Details */}
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm ">
                <CardContent>
                  <h1 className="text-2xl md:text-3xl font-bold leading-tight bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {event.title}
                  </h1>
                  <p className="text-base opacity-90 mb-4 text-gray-500">
                    Organizado por: {event.creator.name ?? event.creator.email}
                  </p>

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
            <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto lg:col-span-2 order-1 lg:order-2 self-start w-full">
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

            {/* old location of RSVP Section */}
          </div>
        </div>
      </div>
    </div>
  );
}

// place on grid
// {/* RSVP Section */}
//       <div className="space-y-6">
//         {/* Confirmation Message */}
//         {showConfirmation && userRSVP && (
//           <Card className="shadow-xl border-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse">
//             <CardContent className="p-4 text-center">
//               <Check className="w-8 h-8 mx-auto mb-2" />
//               <p className="font-semibold">{getConfirmationMessage()}</p>
//             </CardContent>
//           </Card>
//         )}

//         {/* RSVP Card */}
//         {/* <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
//           <CardContent className="p-6">
//             <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
//               ¿Vas a Venir?
//             </h3>

//             <div className="space-y-3 mb-6">
//               <Button
//                 onClick={() => handleRSVP("yes")}
//                 className={`w-full text-lg py-4 rounded-xl transition-all duration-200 ${
//                   userRSVP === "yes"
//                     ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105"
//                     : "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white"
//                 }`}
//               >
//                 <Check className="w-5 h-5 mr-2" />
//                 Sí, voy ({rsvpCounts.yes})
//                 {userRSVP === "yes" && (
//                   <Sparkles className="w-5 h-5 ml-2" />
//                 )}
//               </Button>

//               <Button
//                 onClick={() => handleRSVP("maybe")}
//                 className={`w-full text-lg py-4 rounded-xl transition-all duration-200 ${
//                   userRSVP === "maybe"
//                     ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg scale-105"
//                     : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
//                 }`}
//               >
//                 <HelpCircle className="w-5 h-5 mr-2" />
//                 Tal vez ({rsvpCounts.maybe})
//                 {userRSVP === "maybe" && (
//                   <Sparkles className="w-5 h-5 ml-2" />
//                 )}
//               </Button>

//               <Button
//                 onClick={() => handleRSVP("no")}
//                 className={`w-full text-lg py-4 rounded-xl transition-all duration-200 ${
//                   userRSVP === "no"
//                     ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg scale-105"
//                     : "bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white"
//                 }`}
//               >
//                 <X className="w-5 h-5 mr-2" />
//                 No puedo ({rsvpCounts.no})
//                 {userRSVP === "no" && (
//                   <Sparkles className="w-5 h-5 ml-2" />
//                 )}
//               </Button>
//             </div>

//             <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
//               <div className="flex items-center justify-center space-x-2 mb-2">
//                 <Users className="w-5 h-5 text-purple-600" />
//                 <span className="text-lg font-bold text-purple-800">
//                   {rsvpCounts.yes + rsvpCounts.maybe + rsvpCounts.no}{" "}
//                   personas han respondido
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600">
//                 {rsvpCounts.yes} confirmados • {rsvpCounts.maybe}{" "}
//                 indecisos • {rsvpCounts.no} no van
//               </p>
//             </div>
//           </CardContent>
//         </Card> */}
//       </div>
