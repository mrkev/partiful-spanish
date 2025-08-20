import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/lib/generated/prisma";
import { formatDateShort, formatTimeShort } from "@/lib/utils/date";
import { Calendar, Edit, Eye, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const isUpcoming = event.start.getTime() > Date.now();

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-0 gap-0">
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg?height=200&width=400"}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            className={`${isUpcoming ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"} text-white`}
          >
            {isUpcoming ? "Próximo" : "Pasado"}
          </Badge>
        </div>

        {/* Private Badge */}
        {/* {event.isPrivate && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
              <Lock className="w-3 h-3 mr-1" />
              Privado
            </Badge>
          </div>
        )} */}

        {/* Title Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
            {event.title}
          </h3>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-pink-500" />
            <span>
              {formatDateShort(event.start)} • {formatTimeShort(event.start)}
            </span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-purple-500" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* <div className="flex items-center text-gray-600 text-sm">
            <Users className="w-4 h-4 mr-2 text-cyan-500" />
            <span>{event.rsvpCount} confirmados</span>
          </div> */}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-6 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link href={`/editar/${event.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </Link>

          <Link href={`/e/${event.id}`} className="flex-1">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
