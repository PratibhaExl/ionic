
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





