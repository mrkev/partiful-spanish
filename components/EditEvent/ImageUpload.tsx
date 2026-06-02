"use client";

import { Label } from "@/components/ui/label";
import { DEFAULT_EVENT_IMAGES } from "@/lib/constants";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { ImagePickerModal } from "../ImagePickerModal";

interface ImageUploadProps {
  currentImage: string | null;
  selectedFile: string | null;
  onImageSelect: (file: string | null) => void;
}

export function ImageUpload({
  currentImage,
  selectedFile,
  onImageSelect,
}: ImageUploadProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const displayImage = selectedFile ?? currentImage;

  return (
    <div className="space-y-2">
      <Label
        htmlFor="coverImage"
        className="text-xs uppercase tracking-widest font-semibold text-stone-400"
      >
        Imagen de portada
      </Label>
      <button
        type="button"
        onClick={() => setIsImageModalOpen(true)}
        className="w-full aspect-video rounded-xl overflow-hidden border border-stone-200 hover:border-violet-400 transition-colors relative group bg-stone-50"
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt="Portada"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 group-hover:text-violet-500 transition-colors">
            <ImageIcon className="w-8 h-8 mb-2" />
            <span className="text-sm">Seleccionar imagen</span>
          </div>
        )}
        {displayImage && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Cambiar imagen
            </span>
          </div>
        )}
      </button>
      <ImagePickerModal
        existingImages={DEFAULT_EVENT_IMAGES}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageSelect={onImageSelect}
        noCategories
      />
    </div>
  );
}
