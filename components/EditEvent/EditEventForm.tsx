"use client";

import { updateEvent } from "@/app/actions/event";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Prisma } from "@/lib/generated/prisma";
import { datestrForDatetimeInput } from "@/lib/utils/date";
import { Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { FormField } from "./FormField";
import { ImageUpload } from "./ImageUpload";

export function EditEventForm({
  event,
}: {
  event: Prisma.EventGetPayload<{ include: { rsvps: true } }>;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    datetime: datestrForDatetimeInput(event.start),
    location: event.location,
    coverImage: event.image,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateEvent(event.id, {
      title: formData.title,
      description: formData.description ?? "",
      start: new Date(formData.datetime),
      location: formData.location ?? "",
      coverImage: formData.coverImage,
    });
    console.log("Updated event data:", formData);
    // Here you would typically send the updated data to your backend
    alert("¡Evento actualizado exitosamente! 🎉");
    router.push(`/e/${event.id}`);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="text-center mb-8">
        <Link href={`/e/${event.id}`} target="_blank">
          <Button
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
          >
            Ver Página del Evento
          </Button>
        </Link>
      </div>

      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              id="title"
              label="Título del Evento"
              type="text"
              placeholder="ej. Fiesta de Cumpleaños Retro 90s"
              value={formData.title}
              onChange={(value) => updateFormData("title", value)}
              icon="sparkles"
              required
            />

            <FormField
              id="description"
              label="Descripción"
              type="textarea"
              placeholder="Cuéntanos sobre tu evento... ¿Qué lo hace especial?"
              value={formData.description}
              onChange={(value) => updateFormData("description", value)}
              required
            />

            <FormField
              id="datetime"
              label="Fecha y Hora"
              type="datetime-local"
              value={formData.datetime}
              onChange={(value) => updateFormData("datetime", value)}
              icon="calendar"
              required
            />

            <FormField
              id="location"
              label="Ubicación"
              type="text"
              placeholder="ej. Mi casa, Café Central, Parque de la Ciudad..."
              value={formData.location}
              onChange={(value) => updateFormData("location", value)}
              icon="mapPin"
              required
            />

            <ImageUpload
              currentImage={event.image}
              selectedFile={formData.coverImage}
              onImageSelect={(file) => updateFormData("coverImage", file)}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="submit"
                size="lg"
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl py-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Save className="w-6 h-6 mr-3" />
                Guardar Cambios
              </Button>
              <Link href={`/e/${event.id}`} className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-xl py-6 rounded-xl bg-transparent"
                >
                  <X className="w-6 h-6 mr-3" />
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
