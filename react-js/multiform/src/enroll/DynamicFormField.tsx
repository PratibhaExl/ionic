import React from 'react';
import { Controller, useFormContext, FieldErrors } from 'react-hook-form';
import { TextField, FormControl, InputLabel, MenuItem, Select, FormControlLabel, FormLabel, Radio, RadioGroup, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants, Grid } from '@mui/material';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { JSX } from 'react/jsx-runtime';
//npm i @mui/x-date-pickers npm i @mui/lab
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

interface DynamicFormFieldProps {
  fieldConfig: FieldConfig;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ fieldConfig }) => {
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
        <Grid xs={4}>

        <FormControl component="fieldset" error={!!errors[fieldConfig.name]}>
          <FormLabel component="legend">{fieldConfig.label}</FormLabel>
          <Controller
            name={fieldConfig.name}
            control={control}
            defaultValue={fieldConfig.defaultValue || ''}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange();
                }}
              >
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
        <Grid xs={4}>

        <Controller
          name={fieldConfig.name}
          control={control}
          defaultValue={fieldConfig.defaultValue || ''}
          rules={fieldConfig.rules}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                {...field}
                label={fieldConfig.label}
                format="MM/dd/yyyy"
                error={!!errors[fieldConfig.name]}
                helperText={getErrorMessage(errors, fieldConfig.name)}
                onChange={(date: any) => {
                  field.onChange(date);
                  handleChange();
                }}
                renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<OutlinedTextFieldProps | StandardTextFieldProps | FilledTextFieldProps, "variant">) => <TextField {...params} />}
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
