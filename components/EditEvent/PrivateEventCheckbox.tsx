import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface PrivateEventCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function PrivateEventCheckbox({ checked, onChange }: PrivateEventCheckboxProps) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
      <Checkbox
        id="isPrivate"
        checked={checked}
        onCheckedChange={(checked) => onChange(checked as boolean)}
        className="w-5 h-5"
      />
      <Label htmlFor="isPrivate" className="text-lg font-medium text-gray-700 cursor-pointer">
        Evento Privado (solo invitados pueden ver los detalles)
      </Label>
    </div>
  )
}
