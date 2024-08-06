To implement the enrollment page with multiple steps and dynamic form fields, here's a structured approach with the provided components and functions. I've made necessary adjustments for clarity and functionality:

Enrollment Page
tsx
Copy code
import React, { FormEvent, useState } from 'react';
import { useMultipleStep } from './useMultipleStep';
import { FormProvider, useForm } from 'react-hook-form';
import MSANCEnrollPlanEligibility from './MSANCEnrollPlanEligibility';
import MSANCEnrollHealthInfo from './MSANCEnrollHealthInfo';
import MSANCEnrollPaymentInfo from './MSANCEnrollPaymentInfo';
import MSANCEnrollReviewSignature from './MSANCEnrollReviewSignature';
import { Button, Stack, Item } from '@mui/material';

const Enrollment = () => {
  const formMethods = useForm();
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [isReview, setIsReview] = useState(false);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, goTo, back, next } = useMultipleStep([
    <MSANCEnrollPlanEligibility formData={formData} setFormData={setFormData} formError={formError} setFormError={setFormError} defaultStates={defaultStates} isReview={isReview} />,
    <MSANCEnrollHealthInfo formData={formData} setFormData={setFormData} formError={formError} setFormError={setFormError} defaultStates={defaultStates} isReview={isReview} />,
    <MSANCEnrollPaymentInfo formData={formData} setFormData={setFormData} formError={formError} setFormError={setFormError} defaultStates={defaultStates} isReview={isReview} />,
    <MSANCEnrollReviewSignature formData={formData} setFormData={setFormData} formError={formError} setFormError={setFormError} defaultStates={defaultStates} isReview={isReview} />,
  ]);

  const validateCurrentStep = () => {
    switch (currentStepIndex) {
      case 0:
        return next();
      case 1:
        return next();
      case 2:
        return next();
      case 3:
        if (isLastStep && isReview) {
          alert("Submit");
        } else if (isLastStep) {
          goTo(0);
          setIsReview(true);
        }
        break;
      default:
        return;
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    validateCurrentStep();
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        {step}
        <Stack direction="row" justifyContent="flex-end">
          {isFirstStep && (
            <Item>
              <Button size="small" className="primary-button">Save as draft</Button>
            </Item>
          )}
          {!isFirstStep && (
            <Item>
              <Button size="small" className="secondary-button" type="button" onClick={back}>Back</Button>
            </Item>
          )}
          <Item>
            <Button size="small" className="secondary-button" type="submit">
              {isLastStep ? (isReview ? "Sign and Submit" : "Review") : "Next"}
            </Button>
          </Item>
          {isLastStep && isReview && (
            <Item>
              <Button size="small" className="secondary-button">Send for E-signature</Button>
            </Item>
          )}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default Enrollment;
DynamicFormField Component
tsx
Copy code
import React from 'react';
import { Controller, useFormContext, FieldErrors } from 'react-hook-form';
import { TextField, FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export interface FieldOption {
  value: string;
  label: string;
}

export type FieldConfig = 
  | { type: 'text'; name: string; label: string; rules?: any; defaultValue?: string }
  | { type: 'select'; name: string; label: string; options: FieldOption[]; rules?: any; defaultValue?: string }
  | { type: 'radio'; name: string; label: string; options: FieldOption[]; rules?: any; defaultValue?: string }
  | { type: 'date'; name: string; label: string; rules?: any; defaultValue?: string };

interface DynamicFormFieldProps {
  fieldConfig: FieldConfig;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ fieldConfig }) => {
  const { control, formState: { errors }, trigger } = useFormContext();

  const getErrorMessage = (errors: FieldErrors, name: string): string | undefined => {
    return errors[name]?.message as string | undefined;
  };

  const handleChange = async () => {
    await trigger(fieldConfig.name);
  };

  switch (fieldConfig.type) {
    case 'text':
      return (
        <Grid xs={4}>
          <Controller
            name={fieldConfig.name}
            control={control}
            defaultValue={fieldConfig.defaultValue || ''}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <TextField
                {...field}
                label={fieldConfig.label}
                error={!!errors[fieldConfig.name]}
                helperText={getErrorMessage(errors, fieldConfig.name)}
                variant="outlined"
                fullWidth
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
        <Grid xs={4}>
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
                  label={fieldConfig.label}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange();
                  }}
                >
                  {fieldConfig.options.map(option => (
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
    case 'date':
      return (
        <Grid xs={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name={fieldConfig.name}
              control={control}
              defaultValue={fieldConfig.defaultValue || ''}
              rules={fieldConfig.rules}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label={fieldConfig.label}
                  onChange={(date) => {
                    field.onChange(date);
                    handleChange();
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors[fieldConfig.name]}
                      helperText={getErrorMessage(errors, fieldConfig.name)}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      );
    default:
      return null;
  }
};

export default DynamicFormField;
useMultipleStep Hook
tsx
Copy code
import { ReactElement, useState } from 'react';

export function useMultipleStep(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex(i => (i >= steps.length - 1 ? i : i + 1));
  }

  function back() {
    setCurrentStepIndex(i => (i <= 0 ? i : i - 1));
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
This structure should help you create a multi-step form with dynamic fields and proper navigation through the steps. Make sure to adjust the import paths and any additional configurations according to your project setup.



ponit 2- design update for dynamicformfields

import React from 'react';
import { Controller, useFormContext, FieldErrors } from 'react-hook-form';
import { TextField, FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import './DynamicFormField.css'; // Import the CSS file for custom styles

export interface FieldOption {
  value: string;
  label: string;
}

export type FieldConfig = 
  | { type: 'text'; name: string; label: string; rules?: any; defaultValue?: string }
  | { type: 'select'; name: string; label: string; options: FieldOption[]; rules?: any; defaultValue?: string }
  | { type: 'radio'; name: string; label: string; options: FieldOption[]; rules?: any; defaultValue?: string }
  | { type: 'date'; name: string; label: string; rules?: any; defaultValue?: string };

interface DynamicFormFieldProps {
  fieldConfig: FieldConfig;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ fieldConfig }) => {
  const { control, formState: { errors }, trigger } = useFormContext();

  const getErrorMessage = (errors: FieldErrors, name: string): string | undefined => {
    return errors[name]?.message as string | undefined;
  };

  const handleChange = async () => {
    await trigger(fieldConfig.name);
  };

  switch (fieldConfig.type) {
    case 'text':
      return (
        <Grid item xs={4} className="dynamic-form-field">
          <Controller
            name={fieldConfig.name}
            control={control}
            defaultValue={fieldConfig.defaultValue || ''}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <TextField
                {...field}
                label={fieldConfig.label}
                error={!!errors[fieldConfig.name]}
                helperText={getErrorMessage(errors, fieldConfig.name)}
                variant="outlined"
                fullWidth
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
        <Grid item xs={4} className="dynamic-form-field">
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
                  label={fieldConfig.label}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange();
                  }}
                >
                  {fieldConfig.options.map(option => (
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
    case 'date':
      return (
        <Grid item xs={4} className="dynamic-form-field">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name={fieldConfig.name}
              control={control}
              defaultValue={fieldConfig.defaultValue || ''}
              rules={fieldConfig.rules}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label={fieldConfig.label}
                  onChange={(date) => {
                    field.onChange(date);
                    handleChange();
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors[fieldConfig.name]}
                      helperText={getErrorMessage(errors, fieldConfig.name)}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      );
    default:
      return null;
  }
};

export default DynamicFormField;



.dynamic-form-field {
  margin-bottom: 16px;
}

.dynamic-form-field .MuiFormControl-root {
  width: 100%;
}

.dynamic-form-field .MuiInputLabel-outlined {
  background-color: white;
  padding: 0 4px;
}

.dynamic-form-field .MuiSelect-outlined {
  background-color: white;
}

.dynamic-form-field .MuiTextField-root {
  background-color: white;
}




  
