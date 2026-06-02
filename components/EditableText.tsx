"use client";
import { cn } from "@/lib/utils";

export interface EditableTextProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export function EditableText({
  editable = true,
  className,
  value,
  ...rest
}: { editable?: boolean } & Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "readOnly"
>) {
  return editable ? (
    <textarea
      readOnly={!editable}
      rows={1}
      value={value}
      className={cn(
        "ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "align-top resize-none overflow-visible wrap-break-word field-sizing-content appearance-none",
        "border border-input",
        "overflow-auto",
        className,
      )}
      {...rest}
    />
  ) : (
    <span
      className={cn(
        "inline-block align-top wrap-break-word whitespace-pre-wrap",
        className,
      )}
      {...rest}
    >
      {value || " "}
    </span>
  );
}
