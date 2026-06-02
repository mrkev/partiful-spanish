import { EventWithGoingCount } from "@/app/actions/event";
import { cn } from "@/lib/utils";
import { EventCard } from "./EventCard";

interface EventSectionProps {
  title: string;
  events: EventWithGoingCount[];
  className?: string;
}

export function EventSection({ title, events, className }: EventSectionProps) {
  return (
    <section className={cn(className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm uppercase tracking-widest font-semibold text-zinc-500">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
