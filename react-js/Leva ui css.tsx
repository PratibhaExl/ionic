


/* Leva-Style Accordion */
.widget {
  width: 300px;
  position: fixed;
  top: 10px;
  right: 50%;
  transform: translateX(50%);
  background: #1e1e1e;
  color: #fff;
  border-radius: 8px;
  font-family: "Arial", sans-serif;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  user-select: none;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #252525;
  padding: 6px 10px;
  border-radius: 8px 8px 0 0;
  height: 40px;
  cursor: grab;
}

.header:active {
  cursor: grabbing;
}

/* Icons */
.icon {
  color: #aaa;
  transition: 0.3s;
  cursor: pointer;
}

.icon:hover {
  color: #fff;
}

/* Search Panel */
.search-panel {
  display: none;
  background: #333;
  border-radius: 4px;
  padding: 5px;
  margin: 5px;
}

.search-panel.active {
  display: block;
}

/* Content */
.content {
  background: #2c2c2c;
  padding: 10px;
  border-radius: 0 0 8px 8px;
}

/* Draggable Cursor */
.drag {
  cursor: grab;
}

.drag:active {
  cursor: grabbing;
}




import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, IconButton, TextField, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "./widget.css";

const Widget = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <div className="widget">
      <Accordion expanded={expanded}>
        {/* Header */}
        <AccordionSummary className="header">
          <IconButton className="icon">
            <ChevronLeftIcon />
          </IconButton>

          <DragIndicatorIcon className="icon drag" />

          <IconButton className="icon" onClick={() => setShowSearch(!showSearch)}>
            <SearchIcon />
          </IconButton>
        </AccordionSummary>

        {/* Search Panel */}
        <Box className={`search-panel ${showSearch ? "active" : ""}`}>
          <TextField placeholder="Search..." fullWidth variant="outlined" size="small" />
        </Box>

        {/* Accordion Content */}
        <AccordionDetails className="content">
          <p>Widget Content Goes Here...</p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Widget;

