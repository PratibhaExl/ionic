

import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls, addEdge, Node, Edge, Connection, Handle } from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const initialNodes: Node[] = [
  {
    id: "default",
    type: "customNode",
    position: { x: 250, y: 150 },
    data: { label: "Default Node", icon: "🌟", id: "default" }
  }
];

const Flow: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

  // Remove default node on first drag, add new node
  const onDragEnd = (event: any, item: any) => {
    const position = { x: Math.random() * 400 + 50, y: Math.random() * 300 + 50 };
    
    setNodes((prevNodes) => {
      if (prevNodes.some((n) => n.id === "default")) {
        return [{ id: item.id, type: "customNode", position, data: { label: item.name, icon: item.icon, id: item.id } }];
      }
      return [...prevNodes, { id: item.id, type: "customNode", position, data: { label: item.name, icon: item.icon, id: item.id } }];
    });
  };

  const deleteNode = (id: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  };

  const CustomNode = ({ data }: { data: any }) => (
    <Box
      sx={{
        width: 210,
        height: 200,
        backgroundColor: "#f0f4f8",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Typography variant="h4">{data.icon}</Typography>
      <Typography>{data.label}</Typography>
      <IconButton
        onClick={() => deleteNode(data.id)}
        sx={{ position: "absolute", top: 5, right: 5, color: "red" }}
      >
        <DeleteIcon />
      </IconButton>
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar onDragEnd={onDragEnd} />
      <Box sx={{ flexGrow: 1, height: "100%" }}>
        <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} nodeTypes={{ customNode: CustomNode }}>
          <Background />
          <Controls />
        </ReactFlow>
      </Box>
    </Box>
  );
};

export default Flow;


import React, { useState } from "react";
import { Drawer, IconButton, Accordion, AccordionSummary, AccordionDetails, Box, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, ExpandMore } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface SidebarProps {
  onDragEnd: (event: any, item: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onDragEnd }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { id: "1", name: "File", icon: "📁" },
    { id: "2", name: "Folder", icon: "📂" },
    { id: "3", name: "Document", icon: "📄" }
  ]);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton onClick={toggleDrawer} sx={{ position: "absolute", left: open ? 260 : 0, transition: "0.3s" }}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 260,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 260, transition: "0.3s", padding: 2 }
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Sidebar
        </Typography>

        <Accordion disableGutters elevation={0} sx={{ background: "transparent" }}>
          <AccordionSummary expandIcon={<ExpandMore />} sx={{ padding: 0 }}>
            <ChevronRight sx={{ marginRight: 1 }} />
            <Typography>Drag Elements</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <DragDropContext
              onDragEnd={(result) => {
                if (!result.destination) return;
                const draggedItem = items.find((item) => item.id === result.draggableId);
                if (draggedItem) onDragEnd(result, draggedItem);
              }}
            >
              <Droppable droppableId="droppable" isDropDisabled>
                {(provided) => (
                  <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              width: 210,
                              height: 200,
                              backgroundColor: "#e3f2fd",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 2,
                              cursor: "grab",
                              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                            }}
                          >
                            <Typography variant="h4">{item.icon}</Typography>
                            <Typography>{item.name}</Typography>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </AccordionDetails>
        </Accordion>
      </Drawer>
    </Box>
  );
};

export default Sidebar;




______0.1


import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography
} from "@mui/material";
import { ChevronLeft, ChevronRight, ExpandMore } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { id: "1", name: "Item 1", icon: "📁" },
    { id: "2", name: "Item 2", icon: "📂" },
    { id: "3", name: "Item 3", icon: "📄" }
  ]);

  const toggleDrawer = () => setOpen((prev) => !prev);

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Prevent reordering

    // Add item to the flow (logic to be implemented in Flow.tsx)
    console.log("Dropped item:", items[result.source.index]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Toggle Button */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "absolute",
          left: open ? 260 : 0,
          transition: "0.3s",
          zIndex: 1300
        }}
      >
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 260,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 260, transition: "0.3s", padding: 2 }
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Sidebar
        </Typography>

        <Accordion disableGutters elevation={0} sx={{ background: "transparent" }}>
          <AccordionSummary expandIcon={<ExpandMore />} sx={{ padding: 0 }}>
            <ChevronRight sx={{ marginRight: 1 }} />
            <Typography>Section 1</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" isDropDisabled>
                {(provided) => (
                  <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ display: "flex", gap: 1 }}>
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              width: 110,
                              height: 100,
                              backgroundColor: "lightgray",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 1,
                              cursor: "grab",
                              fontSize: 14,
                              textAlign: "center"
                            }}
                          >
                            <Typography variant="h5">{item.icon}</Typography>
                            <Typography>{item.name}</Typography>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </AccordionDetails>
        </Accordion>
      </Drawer>
    </Box>
  );
};

export default Sidebar;


import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Flow: React.FC = () => {
  const [flowItems, setFlowItems] = useState<{ id: string; name: string; icon: string }[]>([]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    // Example logic to add dragged item to the flow
    setFlowItems((prev) => [...prev, { id: result.draggableId, name: `Dropped ${result.draggableId}`, icon: "🔗" }]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      
      {/* Main Flow Area */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="flow-area">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                flexGrow: 1,
                padding: 2,
                border: "2px dashed gray",
                minHeight: "80vh",
                overflow: "auto"
              }}
            >
              {flowItems.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    width: 110,
                    height: 100,
                    backgroundColor: "lightblue",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    marginBottom: 1
                  }}
                >
                  {item.icon} {item.name}
                </Box>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default Flow;




edit

import React, { useState } from "react";
import { Drawer, IconButton, Accordion, AccordionSummary, AccordionDetails, Box, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, ExpandMore } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { id: "1", name: "Item 1", icon: "📁" },
    { id: "2", name: "Item 2", icon: "📂" },
    { id: "3", name: "Item 3", icon: "📄" }
  ]);

  const toggleDrawer = () => setOpen(!open);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setItems(reordered);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Toggle Button */}
      <IconButton onClick={toggleDrawer} sx={{ position: "absolute", left: open ? 250 : 0, transition: "0.3s" }}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 250, transition: "0.3s" }
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Sidebar</Typography>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Section 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ display: "flex", gap: 1 }}>
                      {items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                width: 60,
                                height: 60,
                                backgroundColor: "lightgray",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 1,
                                cursor: "grab"
                              }}
                            >
                              {item.icon} <br /> {item.name}
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

import React from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const Flow: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, padding: 2 }}> {/* Main Content */}</Box>
    </Box>
  );
};

export default Flow;



