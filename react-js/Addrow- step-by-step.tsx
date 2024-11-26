


Step-by-Step Implementation
1. Setup the Parent Page (Enrollment.tsx)
The Enrollment page will act as the parent, managing the global form context and rendering the HealthComponent and PlanComponent.

tsx
Copy code
import { useForm, FormProvider } from "react-hook-form";
import HealthComponent from "./HealthComponent";
import PlanComponent from "./PlanComponent";
import { Button } from "@mui/material";

const Enrollment: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      healthInfoArray: [{ field1: "", field2: "" }], // Default values for health
      planInfoArray: [{ planName: "", premium: "" }], // Default values for plan
    },
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = (data: any) => {
    console.log("Submitted Form Data:", data); // All form data
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Enrollment Page</h1>
        <HealthComponent />
        <PlanComponent />
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
2. Create the HealthComponent
This component will use the reusable DynamicForm to manage fields specific to health information.

tsx
Copy code
import DynamicForm from "./DynamicForm";

const HealthComponent: React.FC = () => {
  const healthFieldConfig = [
    { name: "field1", label: "Field 1", defaultValue: "" },
    { name: "field2", label: "Field 2", defaultValue: "" },
  ];

  return (
    <div>
      <h2>Health Information</h2>
      <DynamicForm name="healthInfoArray" fieldConfig={healthFieldConfig} />
    </div>
  );
};

export default HealthComponent;
3. Create the PlanComponent
Similar to HealthComponent, this component will use the DynamicForm for plan-specific fields.

tsx
Copy code
import DynamicForm from "./DynamicForm";

const PlanComponent: React.FC = () => {
  const planFieldConfig = [
    { name: "planName", label: "Plan Name", defaultValue: "" },
    { name: "premium", label: "Premium", defaultValue: "" },
  ];

  return (
    <div>
      <h2>Plan Information</h2>
      <DynamicForm name="planInfoArray" fieldConfig={planFieldConfig} />
    </div>
  );
};

export default PlanComponent;
4. Create the Reusable DynamicForm
The DynamicForm will manage dynamic rows for the given name (e.g., healthInfoArray, planInfoArray) and field configurations.

tsx
Copy code
import { useFieldArray, useFormContext } from "react-hook-form";
import { Grid, TextField, Button } from "@mui/material";

interface DynamicFormProps {
  name: string;
  fieldConfig: { name: string; label: string; defaultValue: string }[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ name, fieldConfig }) => {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name, // Dynamic name for the field array
  });

  const addRow = () => {
    const newRow = fieldConfig.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || "";
      return acc;
    }, {});
    append(newRow);
  };

  return (
    <Grid container spacing={3}>
      {fields.map((item, index) => (
        <Grid item xs={12} key={item.id}>
          {fieldConfig.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              {...register(`${name}[${index}].${field.name}`)}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "15px" }}
            />
          ))}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => remove(index)}
            sx={{ marginTop: "10px" }}
          >
            Remove Row
          </Button>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={addRow}
          sx={{ marginTop: "10px" }}
        >
          Add Row
        </Button>
      </Grid>
    </Grid>
  );
};

export default DynamicForm;
Step-by-Step Changes Explanation
Parent Page (Enrollment.tsx)

Sets up the useForm context with default values for healthInfoArray and planInfoArray.
Uses FormProvider to share the useForm methods with child components.
Child Components (HealthComponent and PlanComponent)

Both consume the DynamicForm component with their respective name (healthInfoArray or planInfoArray) and field configurations.
DynamicForm

Manages dynamic rows using useFieldArray.
Handles append and remove to dynamically add or remove rows.
Dynamically generates form fields based on the provided fieldConfig.
Resulting Behavior
Dynamic Rows: Users can add/remove rows in both HealthComponent and PlanComponent.
Seamless Form Submission: On submitting the Enrollment form, the dynamic rows from both components are included in the final formData.
Reusability: The DynamicForm can be reused for other components (e.g., DentalComponent, VisionComponent) by passing the respective name and fieldConfig.
Final Form Data on Submission
When submitted, the form data will look like:

json
Copy code
{
  "healthInfoArray": [
    { "field1": "value1", "field2": "value2" },
    { "field1": "value3", "field2": "value4" }
  ],
  "planInfoArray": [
    { "planName": "Gold Plan", "premium": "200" },
    { "planName": "Silver Plan", "premium": "150" }
  ]
}
Let me know if you need further clarification!







