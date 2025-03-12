"use client"

import { useState, useEffect } from "react"
import FlowChart from "@/components/flow-chart"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [viewMode, setViewMode] = useState<"simple" | "detailed">("simple")
  const [key, setKey] = useState(0) // Add a key to force re-render

  // Force re-render when viewMode changes
  useEffect(() => {
    setKey((prev) => prev + 1)
  }, [viewMode])

  return (
    <main className="h-screen w-full">
      <FlowChart viewMode="simple" />
    </main>
  )
}

