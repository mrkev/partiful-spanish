"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  id: string;
  label: string;
  type: "text" | "textarea" | "datetime-local";
  placeholder?: string;
  value: string | null;
  onChange: (value: string) => void;
  required?: boolean;
}

export function FormField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="text-xs uppercase tracking-widest font-semibold text-stone-400"
      >
        {label}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="border-stone-200 focus-visible:ring-violet-400 rounded-lg text-base min-h-25"
          required={required}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="border-stone-200 focus-visible:ring-violet-400 rounded-lg text-base"
          required={required}
        />
      )}
    </div>
  );
}
