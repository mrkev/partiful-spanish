"use client";

import { Label } from "@/components/ui/label";
import { DEFAULT_EVENT_IMAGES } from "@/lib/constants";
import { ImageIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ImagePickerModal } from "../ImagePickerModal";
import { Button } from "../ui/button";

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
  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     onImageSelect(file);
  //   }
  // };

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label
        htmlFor="coverImage"
        className="text-lg font-semibold text-gray-700 flex items-center"
      >
        <ImageIcon className="w-5 h-5 mr-2 text-pink-500" />
        Imagen de Portada
      </Label>

      <div className="space-y-4">
        <Button onClick={() => setIsImageModalOpen(true)}>
          Seleccionar Imagen
        </Button>

        <div className="space-y-2">
          <div className="w-64 h-64 border rounded-lg overflow-hidden">
            <img
              src={selectedFile || "/placeholder.svg"}
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
        onImageSelect={onImageSelect}
        noCategories
      />
    </div>
  );
}
