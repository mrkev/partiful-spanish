"use client";

import { Button } from "@/components/ui/button";
import { Plus, Sparkles, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/UseAuth";

export function DashboardHeader() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Awebo
          </span>
        </Link>
        <div className="flex items-center space-x-3">
          {user && (
            <span className="text-sm text-gray-600 hidden sm:block">
              ¡Hola, {user.user_metadata?.name || user.email}!
            </span>
          )}
          <Link href="/create">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Evento
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
}
