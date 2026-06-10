"use client";

import { signup } from "@/app/login/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { useActionState } from "react";

export function SignupForm() {
  const [state, action, isPending] = useActionState(signup, null);

  return (
    <form action={action} className="space-y-5">
      {state?.error && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-lg px-3.5 py-3 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          {state.error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Nombre
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Tu nombre"
          autoComplete="name"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
          Contraseña
        </Label>
        <Input
          id="signup-password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
          Confirmar contraseña
        </Label>
        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-md bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all disabled:pointer-events-none disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creando cuenta...
          </>
        ) : (
          "Crear cuenta"
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        Al registrarte aceptas nuestros{" "}
        <a href="#" className="text-purple-600 hover:underline">Términos de Servicio</a>
        {" "}y{" "}
        <a href="#" className="text-purple-600 hover:underline">Política de Privacidad</a>
      </p>
    </form>
  );
}
