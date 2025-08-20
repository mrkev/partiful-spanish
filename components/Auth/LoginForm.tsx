"use client";

import { login } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Sparkles } from "lucide-react";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const { signIn } = useAuth();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     await signIn(email, password);
  //   } catch (err: any) {
  //     setError(err.message || "Error al iniciar sesión");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <form
      // onSubmit={handleSubmit}
      className="space-y-6"
    >
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-lg font-semibold text-gray-700 flex items-center"
        >
          <Mail className="w-5 h-5 mr-2 text-pink-500" />
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
          required
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-lg font-semibold text-gray-700 flex items-center"
        >
          <Lock className="w-5 h-5 mr-2 text-purple-500" />
          Contraseña
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
          required
        />
      </div>

      <Button
        type="submit"
        formAction={login}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Iniciando sesión...
          </div>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Iniciar Sesión
          </>
        )}
      </Button>

      <div className="text-center">
        <Button
          variant="ghost"
          className="text-purple-700 hover:text-purple-900 hover:bg-purple-50"
        >
          ¿Olvidaste tu contraseña?
        </Button>
      </div>
    </form>
  );
}
