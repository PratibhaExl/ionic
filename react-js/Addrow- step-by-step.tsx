

Step-by-Step Implementation
1. Update ADD_MORE Configuration
The ADD_MORE array should define configurations for each field or field group (like fieldArray) with properties such as name, label, type, etc.

Example ADD_MORE Configuration:
tsx
Copy code
export const ADD_MORE = [
  {
    name: "prescribedMedications",
    label: "Prescribed Medications",
    type: "fieldArray", // Dynamic array of fields
    fields: [
      { name: "medication", label: "Medication Name", type: "text" },
      { name: "dosage", label: "Dosage", type: "text" },
    ],
  },
  {
    name: "reasonForMedications",
    label: "Reason for Medications (Diagnosis)",
    type: "text",
  },
];
2. Create HealthComponent
The HealthComponent dynamically renders fields from ADD_MORE using DynamicFormField. For fieldArray, leverage the useFieldArray hook.

tsx
Copy code
import { useFieldArray, useFormContext } from "react-hook-form";
import { Grid, Button } from "@mui/material";
import DynamicFormField from "./DynamicFormField";
import { ADD_MORE } from "./config";

const HealthComponent: React.FC<{ isReview: boolean }> = ({ isReview }) => {
  const { control, register } = useFormContext();

  return (
    <Grid container spacing={3} sx={{ marginTop: "20px" }}>
      {ADD_MORE.map((config, index) => {
        if (config.type === "fieldArray") {
          const { fields, append, remove } = useFieldArray({
            control,
            name: config.name,
          });

          return (
            <Grid item xs={12} key={config.name}>
              <h3>{config.label}</h3>
              {fields.map((field, fieldIndex) => (
                <Grid container spacing={2} key={field.id}>
                  {config.fields.map((fieldConfig) => (
                    <Grid item xs={6} key={fieldConfig.name}>
                      <DynamicFormField
                        fieldConfig={{
                          ...fieldConfig,
                          name: `${config.name}[${fieldIndex}].${fieldConfig.name}`,
                        }}
                        isReview={isReview}
                      />
                    </Grid>
                  ))}
                  {!isReview && (
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => remove(fieldIndex)}
                        sx={{ marginTop: "10px" }}
                      >
                        Remove Row
                      </Button>
                    </Grid>
                  )}
                </Grid>
              ))}
              {!isReview && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    append(config.fields.reduce((acc, field) => {
                      acc[field.name] = "";
                      return acc;
                    }, {}))
                  }
                  sx={{ marginTop: "10px" }}
                >
                  Add Row
                </Button>
              )}
            </Grid>
          );
        } else {
          return (
            <Grid item xs={12} key={config.name}>
              <DynamicFormField
                fieldConfig={config}
                isReview={isReview}
              />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default HealthComponent;
3. Create PlanComponent
The PlanComponent follows the same structure but with its own configuration.

4. Reusable DynamicFormField Component
Update DynamicFormField to dynamically handle fields based on the fieldConfig.

tsx
Copy code
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

interface DynamicFormFieldProps {
  fieldConfig: { name: string; label: string; type: string };
  isReview: boolean;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({
  fieldConfig,
  isReview,
}) => {
  const { field } = useController({
    name: fieldConfig.name,
    defaultValue: "",
  });

  return (
    <TextField
      {...field}
      label={fieldConfig.label}
      type={fieldConfig.type}
      disabled={isReview}
      variant="outlined"
      fullWidth
      sx={{ marginBottom: "15px" }}
    />
  );
};

export default DynamicFormField;
5. Integrate in Enrollment Page
The Enrollment page renders the HealthComponent and other components like PlanComponent.

tsx
Copy code
import { useForm, FormProvider } from "react-hook-form";
import HealthComponent from "./HealthComponent";
import PlanComponent from "./PlanComponent";
import { Button } from "@mui/material";

const Enrollment: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      prescribedMedications: [],
      reasonForMedications: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log("Submitted Form Data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Enrollment Page</h1>
        <HealthComponent isReview={false} />
        <PlanComponent isReview={false} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px" }}
        >
          Submit Enrollment
        </Button>
      </form>
    </FormProvider>
  );
};

export default Enrollment;
Final Structure
Global Form Context: Managed in Enrollment using useForm and FormProvider.
Reusable Dynamic Form Fields: Configured in ADD_MORE and rendered using DynamicFormField.
Dynamic Rows for fieldArray: Managed using useFieldArray in the HealthComponent and PlanComponent.
Resulting Behavior
Dynamic Rendering:

Renders text and fieldArray fields dynamically from ADD_MORE.
Add/Remove Rows:

fieldArray fields support adding/removing rows.
Form Submission:

Submits data in the structure:
json
Copy code
{
  "prescribedMedications": [
    { "medication": "Aspirin", "dosage": "100mg" }
  ],
  "reasonForMedications": "Headache"
}


moved health ui to dynamic 

import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Grid, Button } from "@mui/material";
import DynamicFormField from "./DynamicFormField";

interface DynamicFormProps {
  fieldConfig: Array<{
    name: string;
    label: string;
    type: string; // "text", "fieldArray", etc.
    fields?: Array<{ name: string; label: string; type: string }>; // Used for fieldArray
  }>;
  isReview: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fieldConfig, isReview }) => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={3}>
      {fieldConfig.map((config) => {
        if (config.type === "fieldArray" && config.fields) {
          // Handle fieldArray type
          const { fields, append, remove } = useFieldArray({
            control,
            name: config.name,
          });

          return (
            <Grid item xs={12} key={config.name}>
              <h3>{config.label}</h3>
              {fields.map((field, index) => (
                <Grid container spacing={2} key={field.id}>
                  {config.fields.map((subField) => (
                    <Grid item xs={6} key={subField.name}>
                      <DynamicFormField
                        fieldConfig={{
                          ...subField,
                          name: `${config.name}[${index}].${subField.name}`,
                        }}
                        isReview={isReview}
                      />
                    </Grid>
                  ))}
                  {!isReview && (
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => remove(index)}
                        sx={{ marginTop: "10px" }}
                      >
                        Remove Row
                      </Button>
                    </Grid>
                  )}
                </Grid>
              ))}
              {!isReview && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    append(
                      config.fields.reduce((acc: Record<string, string>, field) => {
                        acc[field.name] = ""; // Initialize each subField with an empty string
                        return acc;
                      }, {})
                    )
                  }
                  sx={{ marginTop: "10px" }}
                >
                  Add Row
                </Button>
              )}
            </Grid>
          );
        } else {
          // Handle simple fields
          return (
            <Grid item xs={12} key={config.name}>
              <DynamicFormField
                fieldConfig={config}
                isReview={isReview}
              />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default DynamicForm;







