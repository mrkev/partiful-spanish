"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/UseAuth";

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.name);
    } catch (err: any) {
      setError(err.message || "Error al crear la cuenta");
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="text-lg font-semibold text-gray-700 flex items-center"
        >
          <User className="w-5 h-5 mr-2 text-cyan-500" />
          Nombre
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
          required
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="signup-email"
          className="text-lg font-semibold text-gray-700 flex items-center"
        >
          <Mail className="w-5 h-5 mr-2 text-pink-500" />
          Email
        </Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
          required
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="signup-password"
          className="text-lg font-semibold text-gray-700 flex items-center"
        >
          <Lock className="w-5 h-5 mr-2 text-purple-500" />
          Contraseña
        </Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => updateFormData("password", e.target.value)}
          className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
          required
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="confirm-password"
          className="text-lg font-semibold text-gray-700 flex items-center"
        >
          <Lock className="w-5 h-5 mr-2 text-purple-500" />
          Confirmar Contraseña
        </Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData("confirmPassword", e.target.value)}
          className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Creando cuenta...
          </div>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Crear Cuenta
          </>
        )}
      </Button>

      <div className="text-center text-sm text-gray-600">
        Al crear una cuenta, aceptas nuestros{" "}
        <a href="#" className="text-purple-700 hover:underline">
          Términos de Servicio
        </a>{" "}
        y{" "}
        <a href="#" className="text-purple-700 hover:underline">
          Política de Privacidad
        </a>
      </div>
    </form>
  );
}
