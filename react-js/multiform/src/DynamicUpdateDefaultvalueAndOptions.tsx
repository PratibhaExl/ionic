To create a global function that updates default values and options for your fields, you can define a helper function in a separate utility file. This function can then be imported and used within your MSANCEnrollPlanEligibility component.

Step 1: Define the Global Function
Create a new file, e.g., formUtils.ts, and define the helper function:

tsx
Copy code
// formUtils.ts
export interface FieldOption {
  value: string;
  label: string;
}

export type TextConfig = {
  type: 'text';
  name: string;
  label: string;
  rules?: any;
  defaultValue?: string;
};

export type SelectConfig = {
  type: 'select';
  name: string;
  label: string;
  options: FieldOption[];
  rules?: any;
  defaultValue?: string;
};

export type RadioConfig = {
  type: 'radio';
  name: string;
  label: string;
  options: FieldOption[];
  rules?: any;
  defaultValue?: string;
};

export type DateConfig = {
  type: 'date';
  name: string;
  label: string;
  rules?: any;
  defaultValue?: string;
};

export type FieldConfig = TextConfig | SelectConfig | RadioConfig | DateConfig;

export const updateFieldConfig = (
  fields: FieldConfig[],
  name: string,
  updates: Partial<FieldConfig>
): FieldConfig[] => {
  return fields.map(field => 
    field.name === name ? { ...field, ...updates } : field
  );
};
Step 2: Use the Global Function in Your Component
Import the updateFieldConfig function and use it to update the field configurations dynamically in your MSANCEnrollPlanEligibility component.

tsx
Copy code
// MSANCEnrollPlanEligibility.tsx
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Container, Grid } from '@mui/material';
import DynamicFormField from './DynamicFormField'; // Adjust the import based on your project structure
import { PLAN_ELIGIBILITY_FIELDS_ARRAY, MAILING_ADDRESS_CONTAINS_FIELDS_ARRAY } from './fieldConfigs'; // Adjust the import path
import { updateFieldConfig, FieldConfig } from './formUtils'; // Adjust the import path

interface MSANCEnrollPlanEligibilityProps {
  formData: any;
  setFormData: any;
  formError: any;
  setFormError: any;
  defaultStates: any;
  isReview: any;
}

const MSANCEnrollPlanEligibility: React.FC<MSANCEnrollPlanEligibilityProps> = ({
  formData,
  setFormData,
  formError,
  setFormError,
  defaultStates,
  isReview
}) => {
  const { control } = useFormContext();
  const [showMailingContent, setShowMailingContent] = useState(false);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowMailingContent(e.target.value === 'yes');
  };

  let updatedFields = PLAN_ELIGIBILITY_FIELDS_ARRAY;

  // Example of updating a specific field's default value and options
  updatedFields = updateFieldConfig(updatedFields, 'MailingOption', {
    defaultValue: 'no',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]
  });

  // Add mailing address fields dynamically based on radio selection
  if (showMailingContent) {
    updatedFields = [
      ...updatedFields.slice(0, updatedFields.findIndex(field => field.name === 'MailingOption') + 1),
      ...MAILING_ADDRESS_CONTAINS_FIELDS_ARRAY,
      ...updatedFields.slice(updatedFields.findIndex(field => field.name === 'MailingOption') + 1)
    ];
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} marginTop={2}>
        {updatedFields.map((config, index) => (
          <DynamicFormField
            key={index}
            fieldConfig={config}
            isReview={isReview}
            onChange={config.name === 'MailingOption' ? handleRadioChange : undefined}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default MSANCEnrollPlanEligibility;
Step 3: Ensure Configurations Include Default Values
Ensure that your field configurations include the necessary default values and options where needed:

tsx
Copy code
// fieldConfigs.ts
import { FieldConfig } from './formUtils';

export const PLAN_ELIGIBILITY_FIELDS_ARRAY: FieldConfig[] = [
  {
    name: 'MailingOption',
    label: 'Do you want to add a mailing address?',
    type: 'radio',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    rules: { required: 'Mailing option is required' },
    defaultValue: 'no'
  },
  // other fields
];

export const MAILING_ADDRESS_CONTAINS_FIELDS_ARRAY: FieldConfig[] = [
  {
    name: 'MailingAddress',
    label: 'Address',
    type: 'text',
    rules: { required: 'Address is required' },
    defaultValue: '123 Main St'
  },
  {
    name: 'Zipcode',
    label: 'Zip Code',
    type: 'text',
    rules: { required: 'Zip is required' },
    defaultValue: '12345'
  },
  {
    name: 'State',
    label: 'State',
    type: 'select',
    options: [
      { value: 'KY', label: 'KY' },
      // other states
    ],
    rules: { required: 'State is required' },
    defaultValue: 'KY'
  },
  {
    name: 'MailingCity',
    label: 'City',
    type: 'text',
    rules: { required: 'City is required' },
    defaultValue: 'Lexington'
  }
];
By following these steps, you ensure that your fields are dynamically updated and default values are correctly populated based on your application's requirements.
  
