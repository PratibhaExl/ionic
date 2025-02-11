


.draggable-parent {
  position: fixed; /* Keeps it fixed in the viewport */
  top: 10px;       /* Distance from the top */
  right: 10px;     /* Distance from the right */
  z-index: 1000;   /* Ensures it stays on top */
  cursor: grab;    /* Indicates it's draggable */
  padding: 10px;
  background: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
  border: 2px dashed #007bff; /* Dashed border to show it's draggable */
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.draggable-parent:active {
  cursor: grabbing;
  transform: scale(1.05); /* Slight scale effect when grabbing */
}



import React, { useState, useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import WidgetLibrary from "./WidgetLibrary"; // Import the widget library

export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeCounter, setNodeCounter] = useState(1); // Track node IDs

  // Function to add a node on click
  const addNode = (widgetType) => {
    const position = { x: 200, y: 100 * nodeCounter }; // Auto position new nodes
    const newNodeId = `node-${nodeCounter}`;

    // Define custom node UI
    const newNode = {
      id: newNodeId,
      position,
      data: {
        label: (
          <div style={{ display: "flex", alignItems: "center", padding: "5px" }}>
            <span style={{ marginRight: "10px" }}>📌</span>
            <strong>{widgetType}</strong>
          </div>
        ),
      },
      type: "default",
      draggable: true,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]); // Add new node
    setNodeCounter((count) => count + 1); // Increment node ID counter
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {/* Widget Library (Click to Add Nodes) */}
      <WidgetLibrary onWidgetClick={addNode} />

      {/* React Flow Canvas */}
      <div
        style={{
          flex: 1,
          height: "100vh",
          border: "1px solid #ddd",
          position: "relative",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        />
      </div>
    </div>
  );
}
