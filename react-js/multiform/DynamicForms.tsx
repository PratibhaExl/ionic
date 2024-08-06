
dynamic forms validation select and date case and heading case added full row

import React from 'react';
import { Controller, useFormContext, FieldErrors } from 'react-hook-form';
import { TextField, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Radio, RadioGroup, Grid, FormLabel, Typography } from '@mui/material';
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
  | { type: 'date'; name: string; label: string; rules?: any; defaultValue?: string }
  | { type: 'heading'; label: string };

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
          <FormLabel className="field-label">{fieldConfig.label}</FormLabel>
          <Controller
            name={fieldConfig.name}
            control={control}
            defaultValue={fieldConfig.defaultValue || ''}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <TextField
                {...field}
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
          <FormLabel className="field-label">{fieldConfig.label}</FormLabel>
          <FormControl variant="outlined" fullWidth error={!!errors[fieldConfig.name]}>
            <Controller
              name={fieldConfig.name}
              control={control}
              defaultValue={fieldConfig.defaultValue || ''}
              rules={fieldConfig.rules}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
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
                  {errors[fieldConfig.name] && (
                    <FormLabel className="field-error">{getErrorMessage(errors, fieldConfig.name)}</FormLabel>
                  )}
                </>
              )}
            />
          </FormControl>
        </Grid>
      );
    case 'radio':
      return (
        <Grid item xs={4} className="dynamic-form-field">
          <FormLabel className="field-label">{fieldConfig.label}</FormLabel>
          <Controller
            name={fieldConfig.name}
            control={control}
            defaultValue={fieldConfig.defaultValue || ''}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <RadioGroup {...field} onChange={(e) => {
                field.onChange(e);
                handleChange();
              }}>
                {fieldConfig.options.map(option => (
                  <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                ))}
              </RadioGroup>
            )}
          />
        </Grid>
      );
    case 'date':
      return (
        <Grid item xs={4} className="dynamic-form-field">
          <FormLabel className="field-label">{fieldConfig.label}</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name={fieldConfig.name}
              control={control}
              defaultValue={fieldConfig.defaultValue || ''}
              rules={fieldConfig.rules}
              render={({ field }) => (
                <DatePicker
                  {...field}
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
    case 'heading':
      return (
        <Grid item xs={12} className="dynamic-form-field">
          <Typography variant="h6" className="field-heading">{fieldConfig.label}</Typography>
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

.field-label {
  margin-bottom: 8px;
  display: block;
  font-weight: bold;
}

.field-heading {
  margin-bottom: 16px;
  font-weight: bold;
}

.field-error {
  color: #f44336;
  font-size: 0.75rem;
  margin-top: 3px;
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


