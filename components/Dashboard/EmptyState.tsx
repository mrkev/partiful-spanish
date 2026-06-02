import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="py-24 text-center">
      <p className="text-zinc-500 mb-6">Aún no has creado ningún evento.</p>
      <Link href="/create">
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Crear mi primer evento
        </Button>
      </Link>
    </div>
  );
}
