To populate default values for different field types (text, select, radio, date), ensure that the default values are passed from your form state to the DynamicFormField component and set correctly within the Controller. Here's how to do this:

Step 1: Update the DynamicFormField Component
Ensure the default values are populated for all field types:

tsx
Copy code
// DynamicFormField.tsx
import React from 'react';
import { Controller, useFormContext, FieldErrors } from 'react-hook-form';
import { TextField, FormControl, InputLabel, MenuItem, Select, FormControlLabel, FormLabel, Radio, RadioGroup, Grid } from '@mui/material';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

interface FieldOption {
  value: string;
  label: string;
}

type TextConfig = {
  type: 'text';
  name: string;
  label: string;
  rules?: any;
  defaultValue?: string;
};

type SelectConfig = {
  type: 'select';
  name: string;
  label: string;
  options: FieldOption[];
  rules?: any;
  defaultValue?: string;
};

type RadioConfig = {
  type: 'radio';
  name: string;
  label: string;
  options: FieldOption[];
  rules?: any;
  defaultValue?: string;
};

type DateConfig = {
  type: 'date';
  name: string;
  label: string;
  rules?: any;
  defaultValue?: string;
};

type FieldConfig = TextConfig | SelectConfig | RadioConfig | DateConfig;

interface DynamicFormFieldProps {
  fieldConfig: FieldConfig;
  isReview?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ fieldConfig, isReview, onChange }) => {
  const { control, formState: { errors }, trigger } = useFormContext();

  const getErrorMessage = (errors: FieldErrors, name: string): string | undefined => {
    return errors[name]?.message as string | undefined;
  };

  const handleChange = async () => {
    await trigger(fieldConfig.name); // Trigger validation for the specific field on change
  };

  switch (fieldConfig.type) {
    case 'text':
      return (
        <Grid item xs={4}>
          <label>{fieldConfig.label}</label>
          <Controller
            name={fieldConfig.name}
            control={control}
            defaultValue={fieldConfig.defaultValue || ''}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                fullWidth
                error={!!errors[fieldConfig.name]}
                helperText={getErrorMessage(errors, fieldConfig.name)}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange();
                }}
              />
            )}
          />
        </Grid>
      );
    case 'select':
      return (
        <Grid item xs={4}>
          <label>{fieldConfig.label}</label>
          <FormControl variant="outlined" fullWidth error={!!errors[fieldConfig.name]}>
            <InputLabel>{fieldConfig.label}</InputLabel>
            <Controller
              name={fieldConfig.name}
              control={control}
              defaultValue={fieldConfig.defaultValue || ''}
              rules={fieldConfig.rules}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange();
                  }}
                >
                  {fieldConfig.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
      );
    case 'radio':
      return (
        <Grid item xs={4}>
          <FormControl component="fieldset" error={!!errors[fieldConfig.name]}>
            <FormLabel component="legend">{fieldConfig.label}</FormLabel>
            <Controller
              name={fieldConfig.name}
              control={control}
              defaultValue={fieldConfig.defaultValue || ''}
              rules={fieldConfig.rules}
              render={({ field }) => (
                <RadioGroup {...field} onChange={(e) => {
                  field.onChange(e);
                  if (onChange) onChange(e);
                  handleChange();
                }}>
                  {fieldConfig.options.map((option) => (
                    <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                  ))}
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>
      );
    case 'date':
      return (
        <Grid item xs={4}>
          <label>{fieldConfig.label}</label>
          <Controller
            name={fieldConfig.name}
            control={control}
            defaultValue={fieldConfig.defaultValue || null}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  {...field}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      variant="outlined"
                      fullWidth
                      error={!!errors[fieldConfig.name]}
                      helperText={getErrorMessage(errors, fieldConfig.name)}
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange();
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
      );
    default:
      return null;
  }
};

export default DynamicFormField;
Step 2: Ensure Default Values in Your Configs
Make sure your field configurations include the default values where necessary.

tsx
Copy code
// fieldConfigs.ts
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
Step 3: Use the Updated Dynamic Form Field and Configs
Ensure that the MSANCEnrollPlanEligibility component uses the updated configurations and DynamicFormField correctly.

tsx
Copy code
// MSANCEnrollPlanEligibility.tsx
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Container, Grid } from '@mui/material';
import DynamicFormField from './DynamicFormField'; // Adjust the import based on your project structure
import { PLAN_ELIGIBILITY_FIELDS_ARRAY, MAILING_ADDRESS_CONTAINS_FIELDS_ARRAY } from './fieldConfigs'; // Adjust the import path

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

  const PLAN_ELIGIBILITY_FIELDS = PLAN_ELIGIBILITY_FIELDS_ARRAY.reduce((acc, field) => {
    acc.push(field);
    if (field.name === 'MailingOption' && showMailingContent) {
      acc.push(...MAILING_ADDRESS_CONTAINS_FIELDS_ARRAY);
    }
    return acc;
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} marginTop={2}>
        {PLAN_ELIGIBILITY_FIELDS.map((config, index) => (
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
This approach ensures that default values are populated correctly for different field types and that the handleRadioChange function correctly manages the visibility
