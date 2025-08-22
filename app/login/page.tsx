"use client";

import { LoginForm } from "@/components/Auth/LoginForm";
import { SignupForm } from "@/components/Auth/SignupForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/inicio"
            className="flex items-center space-x-2 text-purple-700 hover:text-purple-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver al Inicio</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              GPI
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {isLogin ? "¡Bienvenido de Vuelta!" : "¡Únete a la Fiesta!"}
            </h1>
            <p className="text-lg text-gray-600">
              {isLogin
                ? "Inicia sesión para gestionar tus eventos épicos"
                : "Crea tu cuenta y comienza a organizar fiestas increíbles"}
            </p>
          </div>

          {/* Auth Card */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              {isLogin ? <LoginForm /> : <SignupForm />}

              {/* Toggle between login/signup */}
              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 mb-4">
                  {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-700 hover:text-purple-900 hover:bg-purple-50 font-semibold"
                >
                  {isLogin ? "Crear cuenta nueva" : "Iniciar sesión"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Fun Footer Message */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              🎉 Únete a miles de organizadores de fiestas épicas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
