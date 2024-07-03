import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { MenuItem, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';

interface ISelectFieldProps extends Omit<MuiTextFieldProps, 'name'> {
  name: string;
  control: Control<any>;
  options: { label: string; value: string | number }[];
  rules?: object;
}

const SelectField: React.FC<ISelectFieldProps> = ({ name, control, options, rules, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <MuiTextField
            {...field}
            select
            {...props}
            error={!!error}
            helperText={error ? error.message : null}
            fullWidth
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </MuiTextField>
        </>
      )}
    />
  );
};

export default SelectField;
