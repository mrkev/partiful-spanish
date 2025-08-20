import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/UseAuth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FiestaFácil - Crea Fiestas Épicas",
  description: "La plataforma más cool para organizar eventos increíbles",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
