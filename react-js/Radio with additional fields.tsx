
____first approach 
export const PLAN_ELIGIBILITY_FIELDS_ARRAY: FieldConfig[] = [
  {
    type: 'radio',
    name: 'MailingOption',
    label: 'Do you want to add a mailing address?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    rules: { required: 'Mailing option is required' },
  },
  {
    type: 'text',
    name: 'MailingAddress',
    label: 'Mailing Address',
    rules: { required: 'Mailing address is required' },
    visibilityDependency: 'MailingOption', // Depends on the radio field
    visibilityValue: 'yes', // Visible only if the radio field's value is 'yes'
  },
  {
    type: 'text',
    name: 'MailingCity',
    label: 'City',
    rules: { required: 'City is required' },
    visibilityDependency: 'MailingOption',
    visibilityValue: 'yes',
  },
  {
    type: 'text',
    name: 'MailingState',
    label: 'State',
    rules: { required: 'State is required' },
    visibilityDependency: 'MailingOption',
    visibilityValue: 'yes',
  },
];




import React from 'react';
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

interface FieldOption {
  label: string;
  value: string;
}

interface FieldConfig {
  type: 'text' | 'radio';
  name: string;
  label: string;
  options?: FieldOption[];
  rules?: any;
  visibilityDependency?: string; // Field depends on this name
  visibilityValue?: string; // Field is visible when dependency has this value
}

interface DynamicFormFieldProps {
  fieldConfig: FieldConfig;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ fieldConfig }) => {
  const { control, errors } = useFormContext();

  // Use useWatch to monitor the value of the dependent field
  const dependentValue = useWatch({
    control,
    name: fieldConfig.visibilityDependency,
  });

  // Check if the field should be visible
  const isVisible =
    !fieldConfig.visibilityDependency || dependentValue === fieldConfig.visibilityValue;

  // If the field is not visible, return null
  if (!isVisible) {
    return null;
  }

  if (fieldConfig.type === 'radio') {
    return (
      <FormControl component="fieldset" error={Boolean(errors[fieldConfig.name])}>
        <FormLabel component="legend">{fieldConfig.label}</FormLabel>
        <Controller
          name={fieldConfig.name}
          control={control}
          rules={fieldConfig.rules}
          render={({ field }) => (
            <RadioGroup {...field}>
              {fieldConfig.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          )}
        />
        {errors[fieldConfig.name] && (
          <FormHelperText>{errors[fieldConfig.name].message}</FormHelperText>
        )}
      </FormControl>
    );
  }

  if (fieldConfig.type === 'text') {
    return (
      <Controller
        name={fieldConfig.name}
        control={control}
        rules={fieldConfig.rules}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            label={fieldConfig.label}
            error={Boolean(errors[fieldConfig.name])}
            helperText={errors[fieldConfig.name]?.message}
          />
        )}
      />
    );
  }

  return null;
};

export default DynamicFormField;













---second approach 


export const PLAN_ELIGIBILITY_FIELDS_ARRAY: FieldConfig[] = [
  {
    type: 'radio',
    name: 'MailingOption',
    label: 'Do you want to add a mailing address?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    rules: { required: 'Mailing option is required' },
    additionalFields: [
      {
        type: 'text',
        name: 'MailingAddress',
        label: 'Mailing Address',
        rules: { required: 'Mailing address is required' },
      },
      {
        type: 'text',
        name: 'MailingCity',
        label: 'City',
        rules: { required: 'City is required' },
      },
      {
        type: 'text',
        name: 'MailingState',
        label: 'State',
        rules: { required: 'State is required' },
      },
    ],
  },
  // Other fields...
];



import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FieldOption {
  label: string;
  value: string;
}

interface FieldConfig {
  type: 'text' | 'radio';
  name: string;
  label: string;
  options?: FieldOption[];
  rules?: any;
  additionalFields?: FieldConfig[];
}

interface DynamicFormFieldProps {
  fieldConfig: FieldConfig;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ fieldConfig }) => {
  const { control, errors } = useFormContext();
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  if (fieldConfig.type === 'radio') {
    return (
      <>
        <FormControl component="fieldset" error={Boolean(errors[fieldConfig.name])}>
          <FormLabel component="legend">{fieldConfig.label}</FormLabel>
          <Controller
            name={fieldConfig.name}
            control={control}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Update form state
                  setShowAdditionalFields(e.target.value === 'yes'); // Show additional fields if "Yes" is selected
                }}
              >
                {fieldConfig.options?.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            )}
          />
          {errors[fieldConfig.name] && (
            <FormHelperText>{errors[fieldConfig.name].message}</FormHelperText>
          )}
        </FormControl>

        {/* Render additional fields if "Yes" is selected */}
        {showAdditionalFields &&
          fieldConfig.additionalFields?.map((additionalField) => (
            <Controller
              key={additionalField.name}
              name={additionalField.name}
              control={control}
              rules={additionalField.rules}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label={additionalField.label}
                  error={Boolean(errors[additionalField.name])}
                  helperText={errors[additionalField.name]?.message}
                />
              )}
            />
          ))}
      </>
    );
  }

  // Handle other field types (e.g., text)...
  return null;
};

export default DynamicFormField;




import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Container, Grid, Button } from '@mui/material';
import DynamicFormField from './DynamicFormField';
import { PLAN_ELIGIBILITY_FIELDS_ARRAY } from './array';

const MSANCEnrollPlanEligibility: React.FC = () => {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {PLAN_ELIGIBILITY_FIELDS_ARRAY.map((config, index) => (
              <Grid item xs={12} key={index}>
                <DynamicFormField fieldConfig={config} />
              </Grid>
            ))}
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Container>
      </form>
    </FormProvider>
  );
};

export default MSANCEnrollPlanEligibility;



