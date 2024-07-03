import React from 'react';
import { Controller, useFormContext, FieldErrors } from 'react-hook-form';
import { TextField, FormControl, InputLabel, MenuItem, Select, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

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

export type FieldConfig = TextConfig | SelectConfig | RadioConfig;

interface DynamicFormFieldProps {
  fieldConfig: FieldConfig;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ fieldConfig }) => {
  const { control, formState: { errors } } = useFormContext();

  // Helper function to safely access error message
  const getErrorMessage = (errors: FieldErrors, name: string): string | undefined => {
    return errors[name]?.message as string | undefined;
  };

  switch (fieldConfig.type) {
    case 'text':
      return (
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
            />
          )}
        />
      );
    case 'select':
      return (
        <FormControl variant="outlined" fullWidth error={!!errors[fieldConfig.name]}>
          <InputLabel>{fieldConfig.label}</InputLabel>
          <Controller
            name={fieldConfig.name}
            control={control}
            defaultValue={fieldConfig.defaultValue || ''}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <Select {...field} label={fieldConfig.label}>
                {fieldConfig.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      );
    case 'radio':
      return (
        <FormControl component="fieldset" error={!!errors[fieldConfig.name]}>
          <FormLabel component="legend">{fieldConfig.label}</FormLabel>
          <Controller
            name={fieldConfig.name}
            control={control}
            defaultValue={fieldConfig.defaultValue || ''}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <RadioGroup {...field}>
                {fieldConfig.options.map((option) => (
                  <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>
      );
    default:
      return null;
  }
};

export default DynamicFormField;
