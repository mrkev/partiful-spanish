import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

export function EditEventHeader() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-purple-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/inicio"
          className="flex items-center space-x-2 text-purple-700 hover:text-purple-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Volver al Dashboard</span>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            FiestaFácil
          </span>
        </div>
      </div>
    </header>
  )
}
