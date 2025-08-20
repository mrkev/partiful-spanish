import { Badge } from "@/components/ui/badge";
import { Event } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { EventCard } from "./EventCard";

interface EventSectionProps {
  title: string;
  events: Event[];
  badgeColor: "green" | "gray";
  className?: string;
}

export function EventSection({
  title,
  events,
  badgeColor,
  className,
}: EventSectionProps) {
  const badgeStyles = {
    green: "bg-green-100 text-green-800",
    gray: "bg-gray-100 text-gray-800",
  };

  const titleStyles = {
    green: "from-green-600 to-emerald-600",
    gray: "from-gray-600 to-gray-700",
  };

  return (
    <section className={cn(className)}>
      <div className="flex items-center justify-between mb-8">
        <h2
          className={cn(
            "text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
            titleStyles[badgeColor]
          )}
        >
          {title}
        </h2>
        <Badge className={cn("text-lg px-4 py-2", badgeStyles[badgeColor])}>
          {events.length} eventos
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
