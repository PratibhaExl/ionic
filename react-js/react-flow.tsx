





/* Leva-like Dark Theme */
.widget-accordion {
  width: 320px;
  position: fixed;
  top: 10px;
  right: 50%;
  transform: translateX(50%);
  border-radius: 8px;
  background: #1e1e1e;
  color: #ffffff;
  user-select: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  font-family: "Arial", sans-serif;
}

/* Accordion Header */
.accordion-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #252525;
  padding: 8px 12px;
  border-radius: 8px 8px 0 0;
  cursor: grab;
}

.accordion-summary:active {
  cursor: grabbing;
}

/* Left, Center, and Right Icons */
.icon-button {
  color: #aaa;
  transition: color 0.3s;
}

.icon-button:hover {
  color: #ffffff;
}

.menu-icon {
  font-size: 1.5rem;
  cursor: grab;
  color: #888;
}

/* Search Bar */
.search-container {
  display: flex;
  align-items: center;
  background: #333;
  border-radius: 4px;
  padding: 2px 8px;
}

.search-input {
  display: none;
  background: #444;
  border-radius: 4px;
  color: #fff;
  outline: none;
  padding: 4px;
  border: none;
  width: 120px;
  font-size: 14px;
}

.search-input.active {
  display: block;
}

.search-icon {
  color: #aaa;
  cursor: pointer;
  transition: color 0.3s;
}

.search-icon:hover {
  color: #ffffff;
}

/* Accordion Content */
.accordion-details {
  background: #2c2c2c;
  padding: 10px;
  border-radius: 0 0 8px 8px;
}

/* Draggable Cursor */
.draggable {
  position: absolute;
  cursor: grab;
}

.draggable:active {
  cursor: grabbing;
}



import React, { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"; // Six-dot Menu Icon
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "./WidgetAccordion.css";

const WidgetAccordion = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  return (
    <div className="widget-accordion">
      <Accordion expanded={expanded}>
        {/* Header */}
        <AccordionSummary className="accordion-summary">
          {/* Left Arrow Icon */}
          <IconButton className="icon-button">
            <ChevronLeftIcon />
          </IconButton>

          {/* Center Menu Icon (Six Dots) */}
          <DragIndicatorIcon className="menu-icon" />

          {/* Search Icon */}
          <Box className="search-container">
            {searchVisible && <TextField className="search-input active" placeholder="Search..." />}
            <IconButton className="search-icon" onClick={() => setSearchVisible(!searchVisible)}>
              <SearchIcon />
            </IconButton>
          </Box>
        </AccordionSummary>

        {/* Accordion Content */}
        <AccordionDetails className="accordion-details">
          <p>Widget Content Goes Here...</p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default WidgetAccordion;






---------


.widget-accordion {
  width: 300px;
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 5px;
  background: #1e1e1e;
  color: #ffffff;
  user-select: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.accordion-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #252525;
  padding: 8px 12px;
  cursor: grab;
}

.accordion-summary:active {
  cursor: grabbing;
}

.icon-button {
  color: #aaa;
  transition: color 0.3s;
}

.icon-button:hover {
  color: #ffffff;
}

.menu-icon {
  font-size: 1.5rem;
  cursor: grab;
}

.search-container {
  display: flex;
  align-items: center;
  background: #333;
  border-radius: 4px;
  padding: 2px 8px;
}

.search-input {
  display: none;
  background: #444;
  border-radius: 4px;
  color: #fff;
  outline: none;
  padding: 4px;
  border: none;
  width: 120px;
}

.search-input.active {
  display: block;
}

.search-icon {
  color: #aaa;
  cursor: pointer;
  transition: color 0.3s;
}

.search-icon:hover {
  color: #ffffff;
}

.draggable {
  position: absolute;
  cursor: grab;
}

.draggable:active {
  cursor: grabbing;
}


import React, { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"; // Six-dot Menu Icon
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "./WidgetAccordion.css";

const WidgetAccordion = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const dragRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  // Toggle Accordion
  const handleToggle = () => setExpanded(!expanded);

  // Toggle Search Bar
  const handleSearchToggle = () => setSearchVisible(!searchVisible);

  // Dragging Logic
  const handleMouseDown = (event: React.MouseEvent) => {
    if (!dragRef.current) return;
    offset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    setPosition({
      x: event.clientX - offset.current.x,
      y: event.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={dragRef}
      className="draggable"
      style={{ left: position.x, top: position.y }}
    >
      <Accordion expanded={expanded} className="widget-accordion">
        {/* Header */}
        <AccordionSummary className="accordion-summary" onMouseDown={handleMouseDown}>
          {/* Left Arrow Icon */}
          <IconButton className="icon-button">
            <ChevronLeftIcon />
          </IconButton>

          {/* Center Menu Icon (Six Dots) */}
          <DragIndicatorIcon className="menu-icon" />

          {/* Search Icon */}
          <Box className="search-container">
            {searchVisible && <TextField className="search-input active" placeholder="Search..." />}
            <IconButton className="search-icon" onClick={handleSearchToggle}>
              <SearchIcon />
            </IconButton>
          </Box>
        </AccordionSummary>

        {/* Accordion Content */}
        <AccordionDetails>
          <p>Widget Content Goes Here...</p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default WidgetAccordion;
















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
