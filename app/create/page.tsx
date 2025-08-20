"use client";

import type React from "react";

import { ImagePickerModal } from "@/components/ImagePickerModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_EVENT_IMAGES } from "@/lib/constants";
import { datestrForDatetimeInput } from "@/lib/utils/date";
import {
  ArrowLeft,
  Calendar,
  ImageIcon,
  MapPin,
  Sparkles,
  Upload,
} from "lucide-react";
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
    coverImage: null as string | null,
  });
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleImageSelect = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      coverImage: imageUrl,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const event = await createEvent(formData);
    alert("¡Evento creado exitosamente! 🎉");

    router.push(`/e/${event.id}`);
    console.log("Event data:", formData);
    // Here you would typically send the data to your backend
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setFormData((prev) => ({ ...prev, coverImage: file }));
  //   }
  // };

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
              Awebo
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Form Card */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Event Title */}
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-lg font-semibold text-gray-700 flex items-center"
                  >
                    <Sparkles className="w-5 h-5 mr-2 text-pink-500" />
                    Título del Evento
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="ej. Fiesta de Cumpleaños Retro 90s"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Cuéntanos sobre tu evento... ¿Qué lo hace especial?"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl min-h-[120px]"
                    required
                  />
                </div>

                {/* Date & Time */}
                <div className="space-y-2">
                  <Label
                    htmlFor="datetime"
                    className="text-lg font-semibold text-gray-700 flex items-center"
                  >
                    <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                    Fecha y Hora
                  </Label>
                  <Input
                    id="datetime"
                    type="datetime-local"
                    value={datestrForDatetimeInput(formData.start)}
                    onChange={(e) => {
                      console.log("change to ", new Date(e.target.value));
                      setFormData((prev) => ({
                        ...prev,
                        start: new Date(e.target.value),
                      }));
                    }}
                    className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-lg font-semibold text-gray-700 flex items-center"
                  >
                    <MapPin className="w-5 h-5 mr-2 text-cyan-500" />
                    Ubicación
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="ej. Mi casa, Café Central, Parque de la Ciudad..."
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                    required
                  />
                </div>

                {/* Cover Image Upload */}
                {/* <div className="space-y-2">
                  <Label
                    htmlFor="coverImage"
                    className="text-lg font-semibold text-gray-700 flex items-center"
                  >
                    <ImageIcon className="w-5 h-5 mr-2 text-pink-500" />
                    Imagen de Portada
                  </Label>
                  <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors">
                    <input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label htmlFor="coverImage" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                      <p className="text-lg text-gray-600 mb-2">
                        {formData.coverImage
                          ? formData.coverImage.name
                          : "Haz click para subir una imagen"}
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG hasta 10MB
                      </p>
                    </Label>
                  </div>
                </div> */}

                <div className="space-y-4">
                  <Button onClick={() => setIsImageModalOpen(true)}>
                    Seleccionar Imagen
                  </Button>

                  <div className="space-y-2">
                    <div className="w-64 h-64 border rounded-lg overflow-hidden">
                      <img
                        src={formData.coverImage || "/placeholder.svg"}
                        alt="Selected"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <ImagePickerModal
                  existingImages={DEFAULT_EVENT_IMAGES}
                  isOpen={isImageModalOpen}
                  onClose={() => setIsImageModalOpen(false)}
                  onImageSelect={handleImageSelect}
                  noCategories
                />

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl py-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                    Crear Evento
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Fun Footer Message */}
          <div className="text-center mt-8">
            <p className="text-gray-600 text-lg">
              ¡Tu evento va a estar increíble! 🎊 Prepárate para recibir
              confirmaciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
