import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';

interface IRadioButtonProps {
  name: string;
  control: Control<any>;
  label: string;
  options: { label: string; value: string | number }[];
  required?: boolean;
}

const RadioButton: React.FC<IRadioButtonProps> = ({ name, control, label, options, required }) => {
  return (
    <FormControl component="fieldset" required={required}>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <RadioGroup {...field}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
          </>
        )}
      />
    </FormControl>
  );
};

export default RadioButton;
