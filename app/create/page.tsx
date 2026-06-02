"use client";

import type React from "react";

import { ImagePickerModal } from "@/components/ImagePickerModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_EVENT_IMAGES } from "@/lib/constants";
import { datestrForDatetimeInput } from "@/lib/utils/date";
import { BlobCanvas } from "@/components/BlobCanvas";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEvent, NewEventData } from "../actions/event";

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<NewEventData>({
    title: "",
    description: "",
    start: new Date(),
    location: "",
    coverImage: null,
  });
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleImageSelect = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, coverImage: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const event = await createEvent(formData);
    router.push(`/e/${event.id}`);
  };

  return (
    <div className="relative min-h-screen">
      <BlobCanvas />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/inicio"
            className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
          <span className="text-sm font-semibold text-stone-900">GPI</span>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-xl">
        <h1 className="text-3xl font-bold text-stone-900 mb-10">
          Nuevo evento
        </h1>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Cover image */}
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest font-semibold text-stone-400">
              Imagen de portada
            </Label>
            <button
              type="button"
              onClick={() => setIsImageModalOpen(true)}
              className="w-full aspect-video rounded-xl overflow-hidden border border-stone-200 hover:border-violet-400 transition-colors relative group bg-stone-50"
            >
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Portada"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 group-hover:text-violet-500 transition-colors">
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <span className="text-sm">Seleccionar imagen</span>
                </div>
              )}
              {formData.coverImage && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Cambiar imagen
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-xs uppercase tracking-widest font-semibold text-stone-400"
            >
              Título
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="ej. Fiesta de cumpleaños retro 90s"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="border-stone-200 focus-visible:ring-violet-400 rounded-lg text-base"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-xs uppercase tracking-widest font-semibold text-stone-400"
            >
              Descripción
            </Label>
            <Textarea
              id="description"
              placeholder="¿Qué lo hace especial?"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="border-stone-200 focus-visible:ring-violet-400 rounded-lg text-base min-h-25"
            />
          </div>

          {/* Date & time */}
          <div className="space-y-2">
            <Label
              htmlFor="datetime"
              className="text-xs uppercase tracking-widest font-semibold text-stone-400"
            >
              Fecha y hora
            </Label>
            <Input
              id="datetime"
              type="datetime-local"
              value={datestrForDatetimeInput(formData.start)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  start: new Date(e.target.value),
                }))
              }
              className="border-stone-200 focus-visible:ring-violet-400 rounded-lg text-base"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="text-xs uppercase tracking-widest font-semibold text-stone-400"
            >
              Ubicación
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="ej. Casa de Ana, Café Central..."
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="border-stone-200 focus-visible:ring-violet-400 rounded-lg text-base"
              required
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl"
            >
              Crear evento
            </Button>
          </div>
        </form>
      </div>

      <ImagePickerModal
        existingImages={DEFAULT_EVENT_IMAGES}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageSelect={handleImageSelect}
        noCategories
      />
    </div>
  );
}
