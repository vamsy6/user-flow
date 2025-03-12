"use client"

import { useCallback, useEffect, useState } from "react"

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"
import { UserNode } from "./nodes/user-node"
import { ServiceNode } from "./nodes/service-node"
import { ActionNode } from "./nodes/action-node"
import { FeatureNode } from "./nodes/feature-node"
import { DataNode } from "./nodes/data-node"
import { ProcessNode } from "./nodes/process-node"

// Custom node types
const nodeTypes = {
  userNode: UserNode,
  serviceNode: ServiceNode,
  actionNode: ActionNode,
  featureNode: FeatureNode,
  dataNode: DataNode,
  processNode: ProcessNode,
}

type FlowChartProps = {
  viewMode: "simple" | "detailed"
}

function FlowChartComponent({ viewMode }: FlowChartProps) {
  // Add client-side only rendering check
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Create the nodes based on the current view mode
  const createNodes = () => {
    // Base nodes that are always visible
    const baseNodes: Node[] = [
      // User
      {
        id: "user",
        type: "userNode",
        data: { label: "User" },
        position: viewMode === "detailed" ? { x: 50, y: 400 } : { x: 50, y: 300 },
      },

      // Web App Actions
      {
        id: "submit",
        type: "actionNode",
        data: {
          label: "Submit Image",
          icon: "Upload",
          description: viewMode === "detailed" ? "User uploads artwork for analysis" : "",
        },
        position: viewMode === "detailed" ? { x: 300, y: 200 } : { x: 350, y: 100 },
      },
      {
        id: "analyze",
        type: "actionNode",
        data: {
          label: "Analyzes Image",
          icon: "Search",
          description: viewMode === "detailed" ? "Process image with AI services" : "",
        },
        position: viewMode === "detailed" ? { x: 300, y: 400 } : { x: 350, y: 250 },
      },
      {
        id: "story",
        type: "actionNode",
        data: {
          label: "Create Story",
          icon: "BookOpen",
          description: viewMode === "detailed" ? "Generate creative narrative based on image analysis" : "",
        },
        position: viewMode === "detailed" ? { x: 300, y: 600 } : { x: 350, y: 400 },
      },
      {
        id: "account",
        type: "actionNode",
        data: {
          label: "Account Creation",
          icon: "UserPlus",
          description: viewMode === "detailed" ? "New user registration" : "",
        },
        position: viewMode === "detailed" ? { x: 300, y: 800 } : { x: 350, y: 550 },
      },
      {
        id: "login",
        type: "actionNode",
        data: {
          label: "Login",
          icon: "LogIn",
          description: viewMode === "detailed" ? "User authentication" : "",
        },
        position: viewMode === "detailed" ? { x: 300, y: 950 } : { x: 350, y: 700 },
      },

      // External Services
      {
        id: "vision",
        type: "serviceNode",
        data: {
          label: "Google Vision",
          description: viewMode === "detailed" ? "Extracts detailed information from uploaded images" : "",
          service: "vision",
        },
        position: viewMode === "detailed" ? { x: 600, y: 200 } : { x: 650, y: 100 },
      },
      {
        id: "gemini",
        type: "serviceNode",
        data: {
          label: "Google Gemini",
          description: viewMode === "detailed" ? "Generates creative stories based on image analysis data" : "",
          service: "gemini",
        },
        position: viewMode === "detailed" ? { x: 600, y: 500 } : { x: 650, y: 325 },
      },
      {
        id: "database",
        type: "serviceNode",
        data: {
          label: "Database",
          description: viewMode === "detailed" ? "Stores user accounts and artwork data" : "",
          service: "database",
        },
        position: viewMode === "detailed" ? { x: 600, y: 800 } : { x: 650, y: 550 },
      },
      {
        id: "auth",
        type: "serviceNode",
        data: {
          label: "Authentication",
          description: viewMode === "detailed" ? "Handles user authentication" : "",
          service: "auth",
        },
        position: viewMode === "detailed" ? { x: 600, y: 950 } : { x: 650, y: 700 },
      },
    ]

    // Detailed view nodes
    if (viewMode === "detailed") {
      return [
        ...baseNodes,
        // Process flow nodes - positioned first to be behind other nodes
        {
          id: "extracted-data",
          type: "dataNode",
          data: {
            label: "Extracted Image Data",
            description: "Structured data from Vision API",
          },
          position: { x: 1200, y: 350 },
        },
        {
          id: "story-generation",
          type: "processNode",
          data: {
            label: "Story Generation",
            description: "AI-powered narrative creation",
          },
          position: { x: 1000, y: 550 },
        },

        // Vision API Features - Left Column (moved much further right)
        {
          id: "label-detection",
          type: "featureNode",
          data: { label: "Label Detection", icon: "Tag" },
          position: { x: 1000, y: 50 },
        },
        {
          id: "face-detection",
          type: "featureNode",
          data: { label: "Face Detection", icon: "User" },
          position: { x: 1000, y: 130 },
        },
        {
          id: "object-detection",
          type: "featureNode",
          data: { label: "Object Detection", icon: "Box" },
          position: { x: 1000, y: 210 },
        },
        {
          id: "image-properties",
          type: "featureNode",
          data: { label: "Image Properties", icon: "Palette" },
          position: { x: 1000, y: 290 },
        },

        // Vision API Features - Right Column (moved much further right)
        {
          id: "landmark-detection",
          type: "featureNode",
          data: { label: "Landmark Detection", icon: "MapPin" },
          position: { x: 1400, y: 50 },
        },
        {
          id: "text-detection",
          type: "featureNode",
          data: { label: "Text Detection", icon: "Type" },
          position: { x: 1400, y: 130 },
        },
        {
          id: "logo-detection",
          type: "featureNode",
          data: { label: "Logo Detection", icon: "Bookmark" },
          position: { x: 1400, y: 210 },
        },
      ]
    }

    return baseNodes
  }

  // Create the edges based on the current view mode
  const createEdges = () => {
    // Base edges that are always visible
    const baseEdges: Edge[] = [
      // User to Web App connections
      { id: "user-submit", source: "user", target: "submit", animated: true, style: { stroke: "#6366f1" } },
      { id: "user-analyze", source: "user", target: "analyze", animated: true, style: { stroke: "#6366f1" } },
      { id: "user-story", source: "user", target: "story", animated: true, style: { stroke: "#6366f1" } },
      { id: "user-account", source: "user", target: "account", animated: true, style: { stroke: "#6366f1" } },
      { id: "user-login", source: "user", target: "login", animated: true, style: { stroke: "#6366f1" } },

      // Web App to Services connections
      {
        id: "submit-vision",
        source: "submit",
        target: "vision",
        animated: true,
        style: { stroke: "#10b981" },
        markerEnd: { type: MarkerType.ArrowClosed },
        label: viewMode === "detailed" ? "Upload Image" : "",
        labelStyle: { fill: "#10b981", fontWeight: 500 },
      },
      {
        id: "vision-analyze",
        source: "vision",
        target: "analyze",
        animated: true,
        style: { stroke: "#10b981" },
        markerEnd: { type: MarkerType.ArrowClosed },
        label: viewMode === "detailed" ? "Image Analysis Results" : "",
        labelStyle: { fill: "#10b981", fontWeight: 500 },
      },
      {
        id: "analyze-gemini",
        source: "analyze",
        target: "gemini",
        animated: true,
        style: { stroke: "#10b981" },
        markerEnd: { type: MarkerType.ArrowClosed },
        label: viewMode === "detailed" ? "Send Analysis Data" : "",
        labelStyle: { fill: "#10b981", fontWeight: 500 },
      },
      {
        id: "gemini-story",
        source: "gemini",
        target: "story",
        animated: true,
        style: { stroke: "#10b981" },
        markerEnd: { type: MarkerType.ArrowClosed },
        label: viewMode === "detailed" ? "Generated Narrative" : "",
        labelStyle: { fill: "#10b981", fontWeight: 500 },
      },
      {
        id: "account-database",
        source: "account",
        target: "database",
        animated: true,
        style: { stroke: "#f59e0b" },
        markerEnd: { type: MarkerType.ArrowClosed },
      },
      {
        id: "login-auth",
        source: "login",
        target: "auth",
        animated: true,
        style: { stroke: "#f59e0b" },
        markerEnd: { type: MarkerType.ArrowClosed },
      },
    ]

    // Detailed view edges
    if (viewMode === "detailed") {
      return [
        ...baseEdges,
        // Vision API to Features connections - using custom paths to avoid overlapping
        {
          id: "vision-label",
          source: "vision",
          target: "label-detection",
          style: { stroke: "#10b981" },
          type: "smoothstep",
          sourceHandle: "b",
        },
        {
          id: "vision-face",
          source: "vision",
          target: "face-detection",
          style: { stroke: "#10b981" },
          type: "smoothstep",
          sourceHandle: "b",
        },
        {
          id: "vision-object",
          source: "vision",
          target: "object-detection",
          style: { stroke: "#10b981" },
          type: "smoothstep",
          sourceHandle: "b",
        },
        {
          id: "vision-properties",
          source: "vision",
          target: "image-properties",
          style: { stroke: "#10b981" },
          type: "smoothstep",
          sourceHandle: "b",
        },
        {
          id: "vision-landmark",
          source: "vision",
          target: "landmark-detection",
          style: { stroke: "#10b981" },
          type: "smoothstep",
          sourceHandle: "b",
        },
        {
          id: "vision-text",
          source: "vision",
          target: "text-detection",
          style: { stroke: "#10b981" },
          type: "smoothstep",
          sourceHandle: "b",
        },
        {
          id: "vision-logo",
          source: "vision",
          target: "logo-detection",
          style: { stroke: "#10b981" },
          type: "smoothstep",
          sourceHandle: "b",
        },

        // Connect all features to the extracted data node
        {
          id: "label-data",
          source: "label-detection",
          target: "extracted-data",
          style: { stroke: "#10b981" },
          type: "smoothstep",
        },
        {
          id: "face-data",
          source: "face-detection",
          target: "extracted-data",
          style: { stroke: "#10b981" },
          type: "smoothstep",
        },
        {
          id: "object-data",
          source: "object-detection",
          target: "extracted-data",
          style: { stroke: "#10b981" },
          type: "smoothstep",
        },
        {
          id: "properties-data",
          source: "image-properties",
          target: "extracted-data",
          style: { stroke: "#10b981" },
          type: "smoothstep",
        },
        {
          id: "landmark-data",
          source: "landmark-detection",
          target: "extracted-data",
          style: { stroke: "#10b981" },
          type: "smoothstep",
        },
        {
          id: "text-data",
          source: "text-detection",
          target: "extracted-data",
          style: { stroke: "#10b981" },
          type: "smoothstep",
        },
        {
          id: "logo-data",
          source: "logo-detection",
          target: "extracted-data",
          style: { stroke: "#10b981" },
          type: "smoothstep",
        },

        // Connect extracted data to Gemini
        {
          id: "data-gemini",
          source: "extracted-data",
          target: "gemini",
          animated: true,
          style: { stroke: "#10b981" },
          markerEnd: { type: MarkerType.ArrowClosed },
          label: "Send Structured Data",
          labelStyle: { fill: "#10b981", fontWeight: 500 },
          type: "smoothstep",
        },

        // Connect Gemini to story generation process
        {
          id: "gemini-process",
          source: "gemini",
          target: "story-generation",
          style: { stroke: "#10b981" },
          markerEnd: { type: MarkerType.ArrowClosed },
          type: "smoothstep",
        },

        // Connect story generation to story output
        {
          id: "process-story",
          source: "story-generation",
          target: "story",
          animated: true,
          style: { stroke: "#10b981" },
          markerEnd: { type: MarkerType.ArrowClosed },
          label: "Generated Story",
          labelStyle: { fill: "#10b981", fontWeight: 500 },
          type: "smoothstep",
        },
      ]
    }

    return baseEdges
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(createNodes())
  const [edges, setEdges, onEdgesChange] = useEdgesState(createEdges())

  // Update nodes and edges when viewMode changes
  useEffect(() => {
    setNodes(createNodes())
    setEdges(createEdges())
  }, [viewMode, setNodes, setEdges])

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  // Return null or loading state if not client-side
  if (!isClient) {
    return null // or return a loading spinner/placeholder
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        minZoom={0.1}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}

// Create a new default export using dynamic import with loading state
import dynamic from 'next/dynamic'

const FlowChart = dynamic(() => Promise.resolve(FlowChartComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  ),
})

export default FlowChart

