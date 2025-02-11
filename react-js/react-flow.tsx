

import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const WidgetAccordion = () => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion expanded={expanded} sx={styles.accordion}>
      {/* Header */}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={styles.summary}
        onClick={handleToggle}
      >
        {/* Left Arrow Icon */}
        <IconButton sx={styles.icon}>
          <ChevronLeftIcon />
        </IconButton>

        {/* Middle Menu Icon */}
        <MenuIcon sx={styles.menuIcon} />

        {/* Right Arrow Icon */}
        <IconButton sx={styles.icon}>
          <ChevronRightIcon />
        </IconButton>

        {/* Search Box on Right */}
        <Box sx={styles.searchContainer}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={styles.searchInput}
          />
          <IconButton sx={styles.searchIcon}>
            <SearchIcon />
          </IconButton>
        </Box>
      </AccordionSummary>

      {/* Accordion Content */}
      <AccordionDetails>
        <Typography>Widget Content Goes Here...</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default WidgetAccordion;

const styles = {
  accordion: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    background: "#1e1e1e", // Dark background like Leva
    color: "#ffffff",
  },
  summary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#252525", // Slightly lighter than main background
    color: "#ffffff",
  },
  icon: {
    color: "#aaa", // Light gray for icons
    "&:hover": { color: "#ffffff" },
  },
  menuIcon: {
    color: "#ffffff",
    fontSize: "1.5rem",
    marginLeft: "10px",
    marginRight: "10px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    background: "#333",
    borderRadius: "4px",
    padding: "2px 8px",
  },
  searchInput: {
    background: "#444",
    borderRadius: "4px",
    color: "#fff",
    input: { color: "#fff" },
    "& fieldset": { border: "none" },
  },
  searchIcon: {
    color: "#aaa",
  },
};






import React from "react";
import Draggable from "react-draggable";

export default function DraggableSection() {
  return (
    <Draggable handle=".drag-handle" cancel=".dnd-item">
      <div className="draggable-section">
        {/* This is the handle to drag the entire section */}
        <div className="drag-handle">Drag Me (Entire Section)</div>

        {/* These elements will NOT move the whole section */}
        <div className="dnd-item">Drag & Drop Element 1</div>
        <div className="dnd-item">Drag & Drop Element 2</div>
      </div>
    </Draggable>
  );
}


.draggable-section {
  width: 300px;
  padding: 10px;
  border: 2px dashed #007bff;
  background: #f8f9fa;
  position: absolute;
}

.drag-handle {
  cursor: grab;
  background: #007bff;
  color: white;
  padding: 8px;
  text-align: center;
}

.dnd-item {
  padding: 8px;
  margin: 5px 0;
  background: white;
  border: 1px solid #ddd;
  cursor: move;
}






const DraggableParent = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  cursor: grab;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px dashed #007bff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:active {
    cursor: grabbing;
    transform: scale(1.05);
  }
`;

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
