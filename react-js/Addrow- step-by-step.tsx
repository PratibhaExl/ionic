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











