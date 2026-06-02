"use client";

import { updateEvent } from "@/app/actions/event";
import { Button } from "@/components/ui/button";
import { Prisma } from "@/lib/generated/prisma";
import { datestrForDatetimeInput } from "@/lib/utils/date";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { FormField } from "@/components/EditEvent/FormField";
import { ImageUpload } from "@/components/EditEvent/ImageUpload";

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
    router.push(`/e/${event.id}`);
  };

  const updateFormData = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <FormField
        id="title"
        label="Título"
        type="text"
        placeholder="ej. Fiesta de cumpleaños retro 90s"
        value={formData.title}
        onChange={(value) => updateFormData("title", value)}
        required
      />

      <FormField
        id="description"
        label="Descripción"
        type="textarea"
        placeholder="¿Qué lo hace especial?"
        value={formData.description}
        onChange={(value) => updateFormData("description", value)}
      />

      <FormField
        id="datetime"
        label="Fecha y hora"
        type="datetime-local"
        value={formData.datetime}
        onChange={(value) => updateFormData("datetime", value)}
        required
      />

      <FormField
        id="location"
        label="Ubicación"
        type="text"
        placeholder="ej. Casa de Ana, Café Central..."
        value={formData.location}
        onChange={(value) => updateFormData("location", value)}
        required
      />

      <ImageUpload
        currentImage={event.image}
        selectedFile={formData.coverImage}
        onImageSelect={(file) => updateFormData("coverImage", file)}
      />

      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl"
        >
          Guardar cambios
        </Button>
      </div>
    </form>
  );
}
