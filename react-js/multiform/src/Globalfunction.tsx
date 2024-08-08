import { FieldConfig, TextConfig, SelectConfig, RadioConfig, DateConfig } from './formUtils';

export const updateFieldConfig = (
  fields: FieldConfig[],
  name: string,
  updates: Partial<TextConfig & SelectConfig & RadioConfig & DateConfig>
): FieldConfig[] => {
  return fields.map((field) => {
    if (field.name === name) {
      // Ensure the type remains the same when updating the field
      if (field.type === 'text') {
        return { ...field, ...updates } as TextConfig;
      } else if (field.type === 'select') {
        return { ...field, ...updates } as SelectConfig;
      } else if (field.type === 'radio') {
        return { ...field, ...updates } as RadioConfig;
      } else if (field.type === 'date') {
        return { ...field, ...updates } as DateConfig;
      }
    }
    return field;
  });
};




import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Container, Grid } from '@mui/material';
import DynamicFormField from './DynamicFormField';
import { PLAN_ELIGIBILITY_FIELDS_ARRAY, MAILING_ADDRESS_CONTAINS_FIELDS_ARRAY } from './fieldConfigs';
import { updateFieldConfig } from './formUtils';

const MSANCEnrollPlanEligibility: React.FC = () => {
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
            isReview={false}
            onChange={config.name === 'MailingOption' ? handleRadioChange : undefined}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default MSANCEnrollPlanEligibility;



import { FieldConfig, TextConfig, SelectConfig, RadioConfig, DateConfig } from './formUtils';

export const updateFieldConfig = (
  fields: FieldConfig[],
  name: string,
  updates: Partial<TextConfig & SelectConfig & RadioConfig & DateConfig>
): FieldConfig[] => {
  return fields.map((field) => {
    if (field.name === name) {
      // Explicitly handle each field type
      if (field.type === 'text') {
        return { ...field, ...updates } as TextConfig;
      } else if (field.type === 'select') {
        return { ...field, ...updates } as SelectConfig;
      } else if (field.type === 'radio') {
        return { ...field, ...updates } as RadioConfig;
      } else if (field.type === 'date') {
        return { ...field, ...updates } as DateConfig;
      }
    }
    return field;
  });
};




ponit-  update immediately after given name in the array global function 


export const insertFieldsAfter = (
  fieldsArray: FieldConfig[], // The original array of fields
  name: string,               // The name of the field after which to insert
  fieldsToInsert: FieldConfig[], // The fields to insert
  condition: boolean          // Condition to check whether to insert the fields
): FieldConfig[] => {
  // Find the index of the field with the specified name
  const insertIndex = fieldsArray.findIndex(field => field.name === name);

  if (insertIndex === -1) {
    // If the field isn't found, return the original array unchanged
    return fieldsArray;
  }

  // Create a new array with the fields inserted after the specified field
  return [
    ...fieldsArray.slice(0, insertIndex + 1), // Fields before and including the found field
    ...(condition ? fieldsToInsert : []),     // Insert fields if the condition is true
    ...fieldsArray.slice(insertIndex + 1)     // Fields after the inserted fields
  ];
};


uses

import { insertFieldsAfter } from './path-to-your-utils-file';

// Assuming `showMailingContent` is a boolean that determines if mailing address fields should be shown
const PLAN_ELIGIBILITY_FIELDS = insertFieldsAfter(
  PLAN_ELIGIBILITY_FIELDS_ARRAY,   // The original array of fields
  'MailingOption',                 // The field name after which to insert
  MAILING_ADDRESS_CONTAINS_FIELDS_ARRAY, // The fields to insert
  showMailingContent               // The condition to check
);

// Now, `PLAN_ELIGIBILITY_FIELDS` will contain the updated array with fields inserted if `showMailingContent` is true








