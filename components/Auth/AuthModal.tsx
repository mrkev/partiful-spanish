"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"
import { useState } from "react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {activeTab === "login" ? "¡Bienvenido de Vuelta!" : "¡Únete a la Fiesta!"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Buttons */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <Button
              variant={activeTab === "login" ? "default" : "ghost"}
              onClick={() => setActiveTab("login")}
              className={`flex-1 rounded-lg ${
                activeTab === "login"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Iniciar Sesión
            </Button>
            <Button
              variant={activeTab === "signup" ? "default" : "ghost"}
              onClick={() => setActiveTab("signup")}
              className={`flex-1 rounded-lg ${
                activeTab === "signup"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Crear Cuenta
            </Button>
          </div>

          {/* Form Content */}
          {activeTab === "login" ? <LoginForm /> : <SignupForm />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
