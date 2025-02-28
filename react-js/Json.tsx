
import ACARequestArray from "./data.json"; // Import JSON file

const updateMultipleFields = (updates: Record<string, string>) => {
  console.log("ACARequestArray", ACARequestArray);
  debugger;

  ACARequestArray[0].fields.forEach((field: { Question: string; DropDownValue: string }) => {
    console.log("field--", field);

    if (updates[field.Question] !== undefined) {
      field.DropDownValue = updates[field.Question]; // ✅ Fix: Correctly access `Question` as a key
    }
  });
};

// Example Usage (Updating multiple fields)
updateMultipleFields({
  "Request Type": "Request Type 02",
  "Sub Request Type": "Sub Request Type 2A, Sub Request Type 2B",
  "Call Back Number": "1234567890",
});

console.log(ACARequestArray[0].fields); // Verify updated values





import ACARequest from "./data.json"; // Directly importing JSON

// Function to update multiple questions with new values
const updateMultipleFields = (updates: Record<string, string>) => {
  ACARequest.fields.forEach((field) => {
    if (updates[field.Question] !== undefined) {
      field.DropDownValue = updates[field.Question];
    }
  });
};

// Example Usage (Updating multiple fields)
updateMultipleFields({
  "Request Type": "Request Type 02",
  "Sub Request Type": "Sub Request Type 2A, Sub Request Type 2B",
  "Call Back Number": "1234567890",
});

console.log(ACARequest.fields); // Verify that values are updated

----


  import ACARequest from "./data.json"; // Directly importing JSON

// Function to update dropdown value based on "Question"
const updateDropdownValue = (question: string, newValue: string) => {
  const field = ACARequest.fields.find((field) => field.Question === question);
  if (field) {
    field.DropDownValue = newValue;
  }
};

// Function to populate "Sub Request Type" when "Request Type" is selected
const handleRequestTypeChange = (selectedType: string) => {
  updateDropdownValue("Request Type", selectedType);

  // Define mapping for Request Type -> Sub Request Type
  const subRequestMap: Record<string, string[]> = {
    "Request Type 01": ["Sub Request Type 1A", "Sub Request Type 1B"],
    "Request Type 02": ["Sub Request Type 2A", "Sub Request Type 2B"],
    "Request Type 03": ["Sub Request Type 3A", "Sub Request Type 3B"],
  };

  // Find "Sub Request Type" field and update it
  const subRequestField = ACARequest.fields.find((field) => field.Question === "Sub Request Type");
  if (subRequestField) {
    subRequestField.DropDownValue = subRequestMap[selectedType]?.join(", ") || "";
  }
};

// Example Usage (Simulating a dropdown selection)
handleRequestTypeChange("Request Type 01");

console.log(ACARequest.fields); // Verify that values are updated in the imported JSON
✅ How It Works
updateDropdownValue – Finds and updates the DropDownValue for any Question in ACARequest.fields.
handleRequestTypeChange – Calls updateDropdownValue("Request Type", selectedType), then:
Finds "Sub Request Type" field.
Populates it with mapped values based on Request Type.
Directly Modifies ACARequest.fields – No state is used.
✅ Example Output (console.log(ACARequest.fields))
After selecting "Request Type 01", this will update:

json
Copy code
[
  {
    "Question": "Request Type",
    "fieldType": "Dropdown",
    "DropDownValue": "Request Type 01"
  },
  {
    "Question": "Sub Request Type",
    "fieldType": "Dropdown",
    "DropDownValue": "Sub Request Type 1A, Sub Request Type 1B"
  }
]
This method updates ACARequest.fields directly without using React state. 🚀





You said:
Similarly create one method to find and update multiple questions 
ChatGPT said:
Here's a method that can find and update multiple questions in the ACARequest JSON dynamically.

✅ Method to Update Multiple Questions
tsx
Copy code
import ACARequest from "./data.json"; // Directly importing JSON

// Function to update multiple questions with new values
const updateMultipleFields = (updates: Record<string, string>) => {
  ACARequest.fields.forEach((field) => {
    if (updates[field.Question] !== undefined) {
      field.DropDownValue = updates[field.Question];
    }
  });
};

// Example Usage (Updating multiple fields)
updateMultipleFields({
  "Request Type": "Request Type 02",
  "Sub Request Type": "Sub Request Type 2A, Sub Request Type 2B",
  "Call Back Number": "1234567890",
});

console.log(ACARequest.fields); // Verify that values are updated
✅ How It Works
updateMultipleFields(updates):
Accepts an object where keys are Question names and values are new DropDownValue.
Loops through ACARequest.fields and updates matching fields.
Example Usage:
Updates "Request Type", "Sub Request Type", and "Call Back Number" in one call.
Directly Modifies ACARequest.fields – No state used.
✅ Example Output (console.log(ACARequest.fields))
After running the function, the JSON updates like this:

json
Copy code
[
  {
    "Question": "Request Type",
    "fieldType": "Dropdown",
    "DropDownValue": "Request Type 02"
  },
  {
    "Question": "Sub Request Type",
    "fieldType": "Dropdown",
    "DropDownValue": "Sub Request Type 2A, Sub Request Type 2B"
  },
  {
    "Question": "Call Back Number",
    "fieldType": "Text",
    "DropDownValue": "1234567890"
  }
]


  

