"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Sparkles, Zap, Heart } from "lucide-react";
import { AuthModal } from "@/components/Auth/AuthModal";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function LandingPage() {
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    tab: "login" | "signup";
  }>({
    isOpen: false,
    tab: "login",
  });

  const openAuthModal = (tab: "login" | "signup") => {
    setAuthModal({ isOpen: true, tab });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, tab: "login" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Awebo
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              className="text-purple-700 hover:text-purple-900 hover:bg-purple-100"
              onClick={() => openAuthModal("login")}
            >
              Iniciar Sesión
            </Button>
            <Button
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg"
              onClick={() => openAuthModal("signup")}
            >
              Registrarse
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              Crea Fiestas
              <br />
              <span className="text-4xl md:text-6xl">Épicas 🎉</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              La plataforma más cool para organizar eventos increíbles.
              <span className="font-semibold text-purple-700">
                Invita, organiza y celebra
              </span>{" "}
              como en los 90s pero con estilo 2024.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Crear un Evento
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 text-lg px-8 py-4 rounded-full bg-transparent"
              >
                Ver Demo
              </Button>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-3xl p-8 shadow-2xl">
                <Image
                  src="/90s-party-invite-app.png"
                  alt="Awebo App Interface"
                  width={800}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -top-2 -right-8 w-8 h-8 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 left-8 w-10 h-10 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ¿Cómo Funciona?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Organizar la fiesta perfecta nunca fue tan fácil. Solo 3 pasos y
              listo para rockear.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-4 right-4 bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  01
                </div>
                <h3 className="text-2xl font-bold text-pink-800 mb-4">
                  Crea tu Evento
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Añade todos los detalles: fecha, lugar, descripción y sube una
                  imagen súper cool para tu evento.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-4 right-4 bg-purple-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  02
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-4">
                  Invita a tu Crew
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Comparte el link con tus amigos por WhatsApp, Instagram o
                  donde sea. Ellos confirman con un click.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-cyan-50 to-cyan-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-4 right-4 bg-cyan-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  03
                </div>
                <h3 className="text-2xl font-bold text-cyan-800 mb-4">
                  ¡A Celebrar!
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Recibe confirmaciones en tiempo real y disfruta de la mejor
                  fiesta. Nosotros nos encargamos del resto.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-1 rounded-3xl inline-block">
              <div className="bg-white rounded-3xl px-12 py-8">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  ¿Listo para la Fiesta?
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Únete a miles de millennials que ya están organizando eventos
                  épicos
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  onClick={() => openAuthModal("signup")}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Crear mi Primer Evento
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">Awebo</span>
          </div>
          <p className="text-purple-200 mb-4">
            Haciendo que cada celebración sea inolvidable desde 2024
          </p>
          <div className="flex justify-center space-x-6 text-sm text-purple-300">
            <Link href="#" className="hover:text-white transition-colors">
              Términos
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        defaultTab={authModal.tab}
      />
    </div>
  );
}
