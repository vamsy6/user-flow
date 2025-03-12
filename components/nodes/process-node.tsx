import { Handle, Position } from "reactflow"
import { Cpu } from "lucide-react"

type ProcessNodeProps = {
  data: {
    label: string
    description?: string
  }
}

export function ProcessNode({ data }: ProcessNodeProps) {
  return (
    <div className="px-4 py-2 shadow-md rounded-lg bg-white border-2 border-rose-500 min-w-[180px]">
      <div className="flex items-center">
        <div className="rounded-full w-10 h-10 flex items-center justify-center bg-rose-100">
          <Cpu className="h-6 w-6 text-rose-500" />
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.label}</div>
        </div>
      </div>

      {data.description && <div className="mt-2 text-sm text-gray-500">{data.description}</div>}

      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-rose-500" />

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-rose-500" />
    </div>
  )
}

