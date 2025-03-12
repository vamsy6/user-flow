import { Handle, Position } from "reactflow"
import { Server, Image, Sparkles, Database, Shield } from "lucide-react"

type ServiceNodeProps = {
  data: {
    label: string
    description?: string
    service?: string
  }
}

export function ServiceNode({ data }: ServiceNodeProps) {
  // Choose icon based on service type
  let Icon = Server
  let iconColor = "text-green-500"
  let borderColor = "border-green-500"
  let bgColor = "bg-green-100"

  if (data.service === "vision") {
    Icon = Image
    iconColor = "text-teal-500"
    borderColor = "border-teal-500"
    bgColor = "bg-teal-100"
  } else if (data.service === "gemini") {
    Icon = Sparkles
    iconColor = "text-indigo-500"
    borderColor = "border-indigo-500"
    bgColor = "bg-indigo-100"
  } else if (data.service === "database") {
    Icon = Database
    iconColor = "text-amber-500"
    borderColor = "border-amber-500"
    bgColor = "bg-amber-100"
  } else if (data.service === "auth") {
    Icon = Shield
    iconColor = "text-orange-500"
    borderColor = "border-orange-500"
    bgColor = "bg-orange-100"
  }

  return (
    <div className={`px-4 py-2 shadow-md rounded-lg bg-white border-2 ${borderColor} min-w-[180px]`}>
      <div className="flex items-center">
        <div className={`rounded-full w-10 h-10 flex items-center justify-center ${bgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.label}</div>
        </div>
      </div>

      {data.description && <div className="mt-2 text-sm text-gray-500">{data.description}</div>}

      <Handle type="target" position={Position.Left} className={`w-3 h-3 ${borderColor.replace("border", "bg")}`} />

      <Handle type="source" position={Position.Right} className={`w-3 h-3 ${borderColor.replace("border", "bg")}`} />

      <Handle
        type="source"
        position={Position.Bottom}
        className={`w-3 h-3 ${borderColor.replace("border", "bg")}`}
        id="b"
      />
    </div>
  )
}

