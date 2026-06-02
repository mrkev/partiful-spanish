"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EditableText } from "../../components/EditableText";

export default function Test() {
  const [value, setValue] = useState("");
  const [editable, setEditable] = useState(true);

  return (
    <div className="p-4 space-y-4">
      <EditableText
        editable={editable}
        className={cn(
          "rounded-md caret-gray-800",
          "text-4xl md:text-5xl font-bold leading-tight bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent",
          "border border-red-50",
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe algo..."
      />
      <Button
        onClick={async () => {
          setEditable(() => !editable);
        }}
      >
        test
      </Button>
    </div>
  );
}
