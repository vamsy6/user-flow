import { Handle, Position } from "reactflow"
import { Upload, Search, BookOpen, UserPlus, LogIn, type LucideIcon } from "lucide-react"

type ActionNodeProps = {
  data: {
    label: string
    icon?: string
    description?: string
  }
}

export function ActionNode({ data }: ActionNodeProps) {
  // Map of icon names to components
  const iconMap: Record<string, LucideIcon> = {
    Upload,
    Search,
    BookOpen,
    UserPlus,
    LogIn,
  }

  // Get the icon component or default to Search
  const IconComponent = data.icon ? iconMap[data.icon] : Search

  return (
    <div className="px-4 py-2 shadow-md rounded-lg bg-white border-2 border-purple-500 min-w-[180px]">
      <div className="flex items-center">
        <div className="rounded-full w-10 h-10 flex items-center justify-center bg-purple-100">
          <IconComponent className="h-6 w-6 text-purple-500" />
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.label}</div>
        </div>
      </div>

      {data.description && <div className="mt-2 text-sm text-gray-500">{data.description}</div>}

      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-500" />

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500" />
    </div>
  )
}

