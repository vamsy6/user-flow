import { Handle, Position } from "reactflow"
import { Tag, User, Box, Palette, MapPin, Type, Bookmark, type LucideIcon } from "lucide-react"

type FeatureNodeProps = {
  data: {
    label: string
    icon?: string
  }
}

export function FeatureNode({ data }: FeatureNodeProps) {
  // Map of icon names to components
  const iconMap: Record<string, LucideIcon> = {
    Tag,
    User,
    Box,
    Palette,
    MapPin,
    Type,
    Bookmark,
  }

  // Get the icon component or default to Tag
  const IconComponent = data.icon ? iconMap[data.icon] : Tag

  return (
    <div className="px-3 py-1 shadow-md rounded-lg bg-white border-2 border-teal-500">
      <div className="flex items-center">
        <div className="rounded-full w-6 h-6 flex items-center justify-center bg-teal-100">
          <IconComponent className="h-3 w-3 text-teal-500" />
        </div>
        <div className="ml-2">
          <div className="text-sm font-medium">{data.label}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-teal-500" />

      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-teal-500" />
    </div>
  )
}

