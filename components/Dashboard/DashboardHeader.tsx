"use client";

import { ProfileImage } from "@/app/e/[eventId]/ProfileImage";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/generated/prisma";
import { LogOut, Plus } from "lucide-react";
import Link from "next/link";

export function DashboardHeader({ profile }: { profile: User | null }) {
  return (
    <header className="border-b border-zinc-800 sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          GPI
        </Link>
        {profile ? (
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
            <Link href={`/u/${profile.id}`}>
              <ProfileImage
                profile={profile}
                className="w-8 h-8 text-sm hover:ring-2 hover:ring-violet-500 transition-all"
              />
            </Link>
          </div>
        ) : (
          <Link href="/login">
            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
              Iniciar sesión
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
