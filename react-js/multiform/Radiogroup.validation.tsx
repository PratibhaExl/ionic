import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface FieldOption {
  label: string;
  value: string;
}

interface FieldConfig {
  type: 'text' | 'select' | 'radio' | 'date' | 'heading' | 'agentsplitcommissionrow';
  name: string;
  label: string;
  options?: FieldOption[];
  rules?: any;
  defaultValue?: string | any[];
}

interface DynamicFormFieldProps {
  fieldConfig: FieldConfig;
  isReview?: boolean;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ fieldConfig }) => {
  const { control, errors } = useFormContext();

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

  // Handle other types (text, select, etc.) similarly...
  return null;
};

export default DynamicFormField;
