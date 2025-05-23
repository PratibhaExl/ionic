
/* Ensure these styles override Leva's default styles */
:root {
  /* Override Leva text color */
  --leva-colors-text: white !important;
  --leva-colors-background: #1e1e1e !important;
  --leva-colors-accent1: #ffcc00 !important;
  --leva-colors-accent2: #ff9900 !important;
  --leva-colors-elevation1: #333 !important;
  --leva-colors-highlight1: #f8b400 !important;
}

/* Override Leva input text color */
.leva-c-dDhDOW input {
  color: white !important;
}

/* Style Leva buttons */
.leva-c-KvZkh-button {
  background-color: #ffcc00 !important;
  color: black !important;
}

/* Make Leva panel background dark */
.leva-c-JzzMaI {
  background-color: #222 !important;
  border-radius: 8px !important;
  padding: 10px !important;
}

/* Ensure these styles are applied */
.leva-container {
  all: unset !important;
}




/* Change text color inside Leva panel */
.leva-root {
  --leva-colors-text: white;
  --leva-colors-highlight1: #ffcc00;
  --leva-colors-highlight2: #ff9900;
}

/* Make Leva background dark */
.leva-panel {
  background-color: #333 !important;
  border-radius: 8px;
  padding: 10px;
}

/* Customize input field text color */
.leva-input {
  color: white !important;
}

/* Button Styling */
.leva-button {
  background-color: #ffcc00 !important;
  color: black !important;
}


function DynamicFlow() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [nodes, setNodes] = useNodesState([]);

  // Generate dynamic Leva controls
  const layoutOptions = useMemo(() => {
    return Object.fromEntries(
      Object.entries(categoryWidgets).map(([category, options]) => [
        category,
        {
          value: selectedCategory === category ? selectedWidget || options[0] : "Select a widget",
          options: options,
          onChange: (value: string) => {
            setSelectedCategory(category); // Update category
            setSelectedWidget(value); // Update widget
          },
        },
      ])
    );
  }, [selectedCategory, selectedWidget]);

  // Apply Leva controls
  const selectedOptions = useControls({
    ...layoutOptions,
    "Add Root Node": button(() => addRootNode()),
  });

  // Function to add a new node in React Flow
  const addRootNode = () => {
    if (!selectedCategory || !selectedWidget || selectedWidget.startsWith("Select")) {
      alert("Please select a category and widget first!");
      return;
    }

    const newNode = {
      id: String(nodes.length + 1),
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: selectedWidget },
      draggable: true,
      deletable: true,
    };

    setNodes(prevNodes => [...prevNodes, newNode]); // Allow multiple additions
  };

  return <ReactFlow nodes={nodes} />;
}

export default DynamicFlow;






import React, { useState, useMemo } from "react";
import { useControls, button } from "leva";
import ReactFlow, { useNodesState } from "reactflow";

// Mock Widget List
const widgetList: Record<string, { WidgetId: string; WidgetName: string }[]> = {
  "Campaign Triggers": [
    { WidgetId: "14", WidgetName: "InBound Message" },
    { WidgetId: "15", WidgetName: "OutBound Call" },
  ],
  "Decision": [
    { WidgetId: "16", WidgetName: "CheckLeadExists" },
    { WidgetId: "17", WidgetName: "InBound Call" },
  ],
  "Sales": [
    { WidgetId: "18", WidgetName: "Create New Lead" },
    { WidgetId: "19", WidgetName: "Create SOA" },
  ],
};

// Function to get categories with sorted widget names
const getSortedCategoryWidgetNames = (widgetList: Record<string, { WidgetName: string }[]>) =>
  Object.fromEntries(
    Object.entries(widgetList).map(([category, widgets]) => [
      category,
      widgets.map(w => w.WidgetName).sort((a, b) => a.localeCompare(b)),
    ])
  );

const categoryWidgets = getSortedCategoryWidgetNames(widgetList);




function DynamicFlow() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [nodes, setNodes] = useNodesState([]);

  // Generate dynamic Leva controls
  const layoutOptions = useMemo(() => {
    return Object.fromEntries(
      Object.entries(categoryWidgets).map(([category, options]) => [
        category,
        {
          value: selectedCategory === category ? options[0] : "Select a widget",
          options: options,
          onChange: () => setSelectedCategory(category), // Reset others on selection
        },
      ])
    );
  }, [selectedCategory]);

  // Apply Leva controls
  const selectedOptions = useControls({
    ...layoutOptions,
    "Add Root Node": button(() => addRootNode()),
  });

  // Function to add a node in React Flow
  const addRootNode = () => {
    if (!selectedCategory) {
      alert("Please select a category first!");
      return;
    }

    const selectedWidget = selectedOptions[selectedCategory];

    if (!selectedWidget || selectedWidget.startsWith("Select")) {
      alert("Please select a widget first!");
      return;
    }

    const newNode = {
      id: String(nodes.length + 1),
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: selectedWidget },
      draggable: true,
      deletable: true,
    };

    setNodes(prevNodes => [...prevNodes, newNode]);
  };

  return <ReactFlow nodes={nodes} />;
}

export default DynamicFlow;


.leva-root {
  max-width: 300px;
  background-color: #2e2e2e; /* Dark theme */
  border-radius: 10px;
  padding: 10px;
}

.leva-root .leva-controls {
  color: white;
}

.leva-root .leva-input {
  background-color: #444;
  color: white;
}






function getCategoryWidgetNames(widgetList: Record<string, { WidgetName: string }[]>) {
  return Object.fromEntries(
    Object.entries(widgetList).map(([category, widgets]) => [
      category,
      widgets.map(widget => widget.WidgetName),
    ])
  );
}

// Example usage:
const categoryWidgets = getCategoryWidgetNames(widgetList);
console.log(categoryWidgets);



function useDynamicControls() {
  const layoutOptions = useMemo(() => {
    return Object.entries(widgetList).reduce((acc, [category, widgets]) => {
      acc[category] = {
        value: widgets.length > 0 ? widgets[0].WidgetName : "Select an option",
        options: widgets.map((widget) => widget.WidgetName),
      };
      return acc;
    }, {} as Record<string, { value: string; options: string[] }>);
  }, []);

  return useControls(layoutOptions);
}




import { ReactNode } from "react";

interface Widget {
  WidgetId: string | number | null;
  WidgetName: string;
  WidgetType: string;
  Content: string;
  Question?: string;
  TextEditor?: string;
  AddToGroupNode?: string;
  Icon?: ReactNode;
  DefaultIcon?: ReactNode;
  Category?: string;
}




const widgetList = {
  "Campaign Triggers": [
    { WidgetId: "14", WidgetName: "InBound Message", Category: "Campaign Triggers" },
    { WidgetId: "15", WidgetName: "OutBound Call", Category: "Campaign Triggers" },
  ],
  "Decision": [
    { WidgetId: "16", WidgetName: "CheckLeadExists", Category: "Decision" },
    { WidgetId: "17", WidgetName: "InBound Call", Category: "Decision" },
  ],
  "Sales": [
    { WidgetId: "18", WidgetName: "Create New Lead", Category: "Sales" },
    { WidgetId: "19", WidgetName: "Create SOA", Category: "Sales" },
  ],
};




import { useControls } from "leva";
import { useMemo } from "react";

function useDynamicControls() {
  const layoutOptions = useMemo(() => {
    let options = {};

    Object.entries(widgetList).forEach(([category, widgets]) => {
      options[category] = {
        value: widgets[0]?.WidgetName || "Select an option",
        options: widgets.map(({ WidgetName }) => WidgetName),
      };
    });

    return options;
  }, []);

  return useControls(layoutOptions);
}

import { useState } from "react";
import ReactFlow, { useNodesState } from "reactflow";
import { button, useControls } from "leva";

function DynamicFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  // Use the dynamic controls to get the selected options
  const selectedOptions = useDynamicControls();

  const addRootNode = () => {
    const selectedWidget = selectedOptions["Campaign Triggers"]; // Change based on category

    if (!selectedWidget || selectedWidget.startsWith("Select")) {
      alert("Please select a widget first!");
      return;
    }

    const newNode = {
      id: String(nodes.length + 1),
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: selectedWidget },
      draggable: true,
      deletable: true,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  useControls({
    "Add Root Node": button(() => addRootNode()),
  });

  return <ReactFlow nodes={nodes} onNodesChange={onNodesChange} />;
}

export default DynamicFlow;





