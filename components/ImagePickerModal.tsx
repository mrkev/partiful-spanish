"use client";

import type React from "react";

import { useState, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImagePickerProps = {
  existingImages: { [category: string]: string[] };
  onImageUpload?: (file: File) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  onImageSelect?: (imageUrl: string) => void;
  noCategories?: boolean;
};

export function ImagePickerModal({
  existingImages,
  onImageUpload,
  isOpen,
  onClose,
  onImageSelect,
  noCategories = false,
}: ImagePickerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const categories = Object.keys(existingImages);

  const allImages = useMemo(() => {
    return Object.values(existingImages).flat();
  }, [existingImages]);

  const enhancedCategories = useMemo(() => {
    return ["all", ...categories];
  }, [categories]);

  useState(() => {
    if (noCategories) {
      setSelectedCategory("all");
    } else if (enhancedCategories.length > 0 && !selectedCategory) {
      setSelectedCategory(enhancedCategories[0]);
    }
  });

  const currentImages = useMemo(() => {
    if (selectedCategory === "all") {
      return allImages;
    }
    return existingImages[selectedCategory] || [];
  }, [selectedCategory, allImages, existingImages]);

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!onImageUpload) return;

      setIsUploading(true);
      try {
        await onImageUpload(file);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [onImageUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        handleFileUpload(imageFile);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  const handleImageClick = useCallback(
    (imageUrl: string) => {
      onImageSelect?.(imageUrl);
      onClose();
    },
    [onImageSelect, onClose]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Seleccionar Imagen</DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 gap-4 min-h-0">
          {!noCategories && (
            <div className="w-48 flex-shrink-0">
              <h3 className="text-sm font-medium mb-3">Categorías</h3>
              <div className="space-y-1">
                {enhancedCategories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "ghost"
                    }
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "Todas" : category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col min-h-0">
            {onImageUpload && (
              <div className="mb-4">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                    isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25 hover:border-primary/50"
                  )}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm">
                      <span className="font-medium">
                        {isUploading ? "Subiendo..." : "Haz clic para subir"}
                      </span>
                      {!isUploading && (
                        <span className="text-muted-foreground">
                          {" "}
                          o arrastra una imagen aquí
                        </span>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            )}

            {(selectedCategory || noCategories) && (
              <ScrollArea className="flex-1 max-h-full">
                <div className="grid grid-cols-4 gap-3 p-1">
                  {currentImages.map((imageUrl, index) => (
                    <div
                      key={`${selectedCategory}-${index}`}
                      className="aspect-square relative group cursor-pointer rounded-lg overflow-hidden border hover:border-primary transition-colors"
                      onClick={() => handleImageClick(imageUrl)}
                    >
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                  ))}

                  {currentImages.length === 0 && (
                    <div className="col-span-4 flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <ImageIcon className="h-12 w-12 mb-3" />
                      <p>No hay imágenes disponibles</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
