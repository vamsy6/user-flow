import { Handle, Position } from "reactflow"
import { User } from "lucide-react"

export function UserNode({ data }: { data: { label: string } }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-full bg-white border-2 border-blue-500">
      <div className="flex items-center">
        <div className="rounded-full w-10 h-10 flex items-center justify-center bg-blue-100">
          <User className="h-6 w-6 text-blue-500" />
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.label}</div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500" />
    </div>
  )
}

