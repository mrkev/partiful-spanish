"use client";

import type React from "react";

import { Label } from "@/components/ui/label";
import { Upload, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  currentImage: string | null;
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
}

export function ImageUpload({
  currentImage,
  selectedFile,
  onFileSelect,
}: ImageUploadProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label
        htmlFor="coverImage"
        className="text-lg font-semibold text-gray-700 flex items-center"
      >
        <ImageIcon className="w-5 h-5 mr-2 text-pink-500" />
        Imagen de Portada
      </Label>

      {/* Current Image Preview */}
      {currentImage && !selectedFile && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
            <Image
              src={currentImage || "/placeholder.svg"}
              alt="Current cover image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Selected File Preview */}
      {selectedFile && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Nueva imagen seleccionada:
          </p>
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-purple-300">
            <Image
              src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
              alt="Selected cover image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Upload Area */}
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
            {selectedFile
              ? `Archivo seleccionado: ${selectedFile.name}`
              : currentImage
                ? "Haz click para cambiar la imagen"
                : "Haz click para subir una imagen"}
          </p>
          <p className="text-sm text-gray-500">PNG, JPG hasta 10MB</p>
        </Label>
      </div>
    </div>
  );
}
