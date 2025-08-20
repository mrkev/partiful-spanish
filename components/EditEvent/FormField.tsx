"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Sparkles } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  type: "text" | "textarea" | "datetime-local";
  placeholder?: string;
  value: string | null;
  onChange: (value: string) => void;
  icon?: "sparkles" | "calendar" | "mapPin";
  required?: boolean;
}

export function FormField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  required,
}: FormFieldProps) {
  const getIcon = () => {
    switch (icon) {
      case "sparkles":
        return <Sparkles className="w-5 h-5 mr-2 text-pink-500" />;
      case "calendar":
        return <Calendar className="w-5 h-5 mr-2 text-purple-500" />;
      case "mapPin":
        return <MapPin className="w-5 h-5 mr-2 text-cyan-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="text-lg font-semibold text-gray-700 flex items-center"
      >
        {getIcon()}
        {label}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl min-h-[120px]"
          required={required}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="text-lg p-4 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
          required={required}
        />
      )}
    </div>
  );
}
