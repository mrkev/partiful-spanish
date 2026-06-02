"use client";

import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="border-b border-zinc-800 sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          GPI
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/create">
            <Button className="bg-violet-600 hover:bg-violet-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Evento
            </Button>
          </Link>
          <Link href="/logout">
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
