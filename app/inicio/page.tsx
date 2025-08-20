import { DashboardHeader } from "@/components/Dashboard/DashboardHeader"
import { EventSection } from "@/components/Dashboard/EventSection"
import { EmptyState } from "@/components/Dashboard/EmptyState"

// Mock user events data
const mockUserEvents = [
  {
    id: "retro-90s-party",
    title: "Fiesta Retro 90s - ¡Volvamos al Pasado!",
    description: "Una noche llena de música de los 90s, karaoke, juegos retro y mucha nostalgia.",
    date: "2024-02-15",
    time: "20:00",
    location: "Casa de María - Calle Retro 123, CDMX",
    coverImage: "/90s-party-cover.png",
    isPrivate: false,
    rsvpCount: 35,
    status: "upcoming",
  },
  {
    id: "cumple-ana",
    title: "Cumpleaños de Ana 🎂",
    description: "Celebremos los 25 años de Ana con una fiesta increíble",
    date: "2024-02-28",
    time: "19:30",
    location: "Salón de Fiestas El Jardín",
    coverImage: "/birthday-party.png",
    isPrivate: true,
    rsvpCount: 18,
    status: "upcoming",
  },
  {
    id: "karaoke-night",
    title: "Noche de Karaoke Épica",
    description: "Ven a cantar tus canciones favoritas y pasar una noche increíble",
    date: "2024-01-20",
    time: "21:00",
    location: "Karaoke Bar Downtown",
    coverImage: "/karaoke-night.png",
    isPrivate: false,
    rsvpCount: 42,
    status: "past",
  },
  {
    id: "pool-party",
    title: "Pool Party de Verano ☀️",
    description: "Fiesta en la alberca con música, comida y diversión sin límites",
    date: "2024-03-15",
    time: "15:00",
    location: "Casa de Carlos - Zona Residencial",
    coverImage: "/pool-party.png",
    isPrivate: false,
    rsvpCount: 28,
    status: "upcoming",
  },
]

export default function InicioPage() {
  const upcomingEvents = mockUserEvents.filter((event) => event.status === "upcoming")
  const pastEvents = mockUserEvents.filter((event) => event.status === "past")

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Mis Eventos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Gestiona todos tus eventos desde un solo lugar. Edita, comparte y haz que cada celebración sea épica.
            </p>
          </div>

          {/* Events Sections */}
          {upcomingEvents.length > 0 && (
            <EventSection title="Próximos Eventos" events={upcomingEvents} badgeColor="green" className="mb-16" />
          )}

          {pastEvents.length > 0 && <EventSection title="Eventos Pasados" events={pastEvents} badgeColor="gray" />}

          {/* Empty State */}
          {mockUserEvents.length === 0 && <EmptyState />}
        </div>
      </div>
    </div>
  )
}
