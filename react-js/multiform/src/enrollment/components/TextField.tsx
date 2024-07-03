import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
 import { Controller, Control, FieldError } from 'react-hook-form';

interface ITextFieldProps extends Omit<MuiTextFieldProps, 'name' | 'error' | 'helperText'> {
  name: string;
  control: Control<any>;
  error?: boolean; // Allow passing error status
  helperText?: React.ReactNode; // Allow passing custom helper text
}

const TextField: React.FC<ITextFieldProps> = ({ name, control, error, helperText, ...props }) => {
  console.log('=========',error)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
        <MuiTextField
          {...field}
          {...props}
          error={!!error || error} // Set error state based on React Hook Form's error object
          helperText={error ? <span style={{ color: 'red' }}>{error.message}</span> : helperText} // Display error message or custom helper text
          fullWidth
        />
        <div>{error ? <span style={{ color: 'red' }}>{error.message}</span> : helperText} </div>
        </>
      )}
    />
  );
};

export default TextField;
