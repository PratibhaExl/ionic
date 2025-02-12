


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



