

const handleDragStart = (event: React.DragEvent, item: any) => {
  event.dataTransfer.setData("application/reactflow", JSON.stringify(item));
  event.dataTransfer.effectAllowed = "move";
};

// Modify Draggable Box:
<Box
  onDragStart={(event) => handleDragStart(event, item)}
  draggable
  sx={{
    width: 170,
    height: 160,
    backgroundColor: "#e3f2fd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    cursor: "grab",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  }}
>
  <Typography variant="h4">{item.icon}</Typography>
  <Typography>{item.name}</Typography>
</Box>

flow tsx
import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls, addEdge, Connection, Edge, Handle, Node } from "reactflow";
import "reactflow/dist/style.css";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Flow: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [lastNodeId, setLastNodeId] = useState<string | null>(null);

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const data = JSON.parse(event.dataTransfer.getData("application/reactflow"));

    if (!data) return;

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNodeId = `node-${nodes.length + 1}`;
    const newNode: Node = {
      id: newNodeId,
      type: "customNode",
      position,
      data: { label: data.name, icon: data.icon, id: newNodeId },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);

    if (lastNodeId) {
      const newEdge: Edge = { id: `edge-${lastNodeId}-${newNodeId}`, source: lastNodeId, target: newNodeId };
      setEdges((prevEdges) => [...prevEdges, newEdge]);
    }

    setLastNodeId(newNodeId);
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const deleteNode = (id: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  const deleteEdge = (id: string) => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== id));
  };

  const CustomNode = ({ data }: { data: any }) => (
    <Box
      sx={{
        width: 210,
        height: 200,
        backgroundColor: "#f0f4f8",
        borderRadius: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "0.3s ease-in-out",
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
    <Box sx={{ display: "flex", height: "100vh" }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={{ customNode: CustomNode }}>
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};

export default Flow;

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }: any) => (
  <g>
    <path
      d={`M${sourceX},${sourceY} L${targetX},${targetY}`}
      stroke="black"
      strokeWidth="2"
      fill="none"
    />
    <foreignObject x={(sourceX + targetX) / 2 - 10} y={(sourceY + targetY) / 2 - 10} width={20} height={20}>
      <IconButton onClick={() => deleteEdge(id)} sx={{ background: "white", borderRadius: "50%", padding: 0 }}>
        <DeleteIcon sx={{ fontSize: 14, color: "red" }} />
      </IconButton>
    </foreignObject>
  </g>
);


<ReactFlow edges={edges} edgeTypes={{ default: CustomEdge }} />













//----new


const handleDragStart = (event: React.DragEvent, item: any) => {
  event.dataTransfer.setData("application/reactflow", JSON.stringify(item));
  event.dataTransfer.effectAllowed = "move";
};

// Modify Draggable Box inside Droppable:
<Box
  onDragStart={(event) => handleDragStart(event, item)}
  draggable
  sx={{
    width: 170,
    height: 160,
    backgroundColor: "#e3f2fd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    cursor: "grab",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  }}
>
  <Typography variant="h4">{item.icon}</Typography>
  <Typography>{item.name}</Typography>
</Box>


const [open, setOpen] = useState(false);

const toggleDrawer = () => {
  setOpen((prev) => !prev);
};

// Sidebar Toggle Button
<IconButton onClick={toggleDrawer} sx={{ transition: "0.3s" }}>
  {open ? <ChevronLeft /> : <ChevronRight />}
</IconButton>


flow tsx
const rippleEffect = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
`;

const CustomNode = ({ data }: { data: any }) => (
  <Box
    sx={{
      position: "relative",
      width: 210,
      height: 200,
      backgroundColor: "#f0f4f8",
      borderRadius: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      transition: "0.3s ease-in-out",
      "&:before": data.id === "default" && {
        content: '""',
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        animation: `${rippleEffect} 1.5s infinite`,
      },
    }}
  >
    <Typography variant="h4">{data.icon}</Typography>
    <Typography>{data.label}</Typography>
    <IconButton
      onClick={() => setDeleteConfirm(data.id)}
      sx={{ position: "absolute", top: 5, right: 5, color: "red" }}
    >
      <DeleteIcon />
    </IconButton>
    <Handle type="source" position="right" />
    <Handle type="target" position="left" />
  </Box>
);


import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

const handleDelete = () => {
  setNodes((prevNodes) => prevNodes.filter((node) => node.id !== deleteConfirm));
  setDeleteConfirm(null);
};

<Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
  <DialogTitle>Delete Node?</DialogTitle>
  <DialogContent>
    <Typography>Are you sure you want to delete this node?</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
    <Button onClick={handleDelete} color="error">
      Delete
    </Button>
  </DialogActions>
</Dialog>;






----


import React, { useState, useCallback } from "react";
import ReactFlow, { Background, Controls, addEdge, Node, Edge, Connection, Handle } from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSpring, animated } from "@react-spring/web";

const Flow: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "default", type: "customNode", position: { x: 300, y: 150 }, data: { label: "Default", icon: "🌟", id: "default" } }
  ]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragEnd = (event: any, item: any) => {
    const position = { x: Math.random() * 500 + 50, y: Math.random() * 400 + 50 };
    
    setNodes((prevNodes) => [
      ...prevNodes.filter((node) => node.id !== "default"), // Remove default node when a new one is added
      { id: item.id, type: "customNode", position, data: { label: item.name, icon: item.icon, id: item.id } }
    ]);
  };

  const deleteNode = (id: string) => setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));

  const zoomAnim = useSpring({
    from: { transform: "scale(1)" },
    to: async (next) => {
      while (true) {
        await next({ transform: "scale(1.1)" });
        await next({ transform: "scale(1)" });
      }
    },
    config: { tension: 150, friction: 5 }
  });

  const CustomNode = ({ data }: { data: any }) => (
    <animated.div style={data.id === "default" ? zoomAnim : {}}>
      <Box
        sx={{
          width: 210,
          height: 200,
          backgroundColor: "#f0f4f8",
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "0.3s ease-in-out"
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
    </animated.div>
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
import { useSpring, animated } from "@react-spring/web";

interface SidebarProps {
  onDragEnd: (event: any, item: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onDragEnd }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { id: "1", name: "File", icon: "📁" },
    { id: "2", name: "Folder", icon: "📂" },
    { id: "3", name: "Document", icon: "📄" },
    { id: "4", name: "Image", icon: "🖼️" },
    { id: "5", name: "Video", icon: "🎥" },
    { id: "6", name: "Music", icon: "🎵" }
  ]);

  const toggleDrawer = () => setOpen((prev) => !prev);

  const sidebarAnim = useSpring({ width: open ? 350 : 60, config: { tension: 200, friction: 20 } });

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton onClick={toggleDrawer} sx={{ position: "absolute", left: open ? 350 : 0, transition: "0.3s" }}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>

      <animated.div style={sidebarAnim}>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            "& .MuiDrawer-paper": { width: 350, transition: "0.3s", padding: 2 }
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
                    <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
                      {items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                width: 170,
                                height: 160,
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
      </animated.div>
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



