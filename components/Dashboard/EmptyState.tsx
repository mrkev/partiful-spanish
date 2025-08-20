import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <Card className="max-w-md mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-12">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Calendar className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            ¡Tu Primera Fiesta te Espera!
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            Aún no has creado ningún evento. ¡Es hora de organizar una
            celebración épica que todos recordarán!
          </p>

          {/* CTA Button */}
          <Link href="/create">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Crear mi Primer Evento
            </Button>
          </Link>

          {/* Fun Elements */}
          <div className="flex justify-center space-x-4 mt-8 text-2xl">
            <span className="animate-bounce">🎉</span>
            <span className="animate-pulse">🎊</span>
            <span className="animate-bounce delay-300">🎈</span>
          </div>
        </CardContent>
      </Card>

      {/* Floating Sparkles */}
      <div className="relative">
        <Sparkles className="absolute -top-20 -left-10 w-6 h-6 text-pink-400 animate-pulse" />
        <Sparkles className="absolute -top-16 right-8 w-4 h-4 text-purple-400 animate-bounce" />
        <Sparkles className="absolute -top-12 left-1/2 w-5 h-5 text-cyan-400 animate-pulse delay-500" />
      </div>
    </div>
  );
}
