case added for add agent row



import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface AgentSplitCommissionConfig {
  type: 'agentsplitcommissionrow';
  name: string;
  label: string;
}

type FieldConfig = 
  | TextConfig 
  | SelectConfig 
  | RadioConfig 
  | DateConfig 
  | AgentSplitCommissionConfig;

interface DynamicFormFieldProps {
  fieldConfig: FieldConfig;
  isReview?: boolean;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ fieldConfig, isReview }) => {
  const { control, formState: { errors } } = useFormContext();
  const [agentRows, setAgentRows] = useState([{ id: 1 }]);

  const addRow = () => {
    if (agentRows.length < 4) {
      setAgentRows([...agentRows, { id: agentRows.length + 1 }]);
    }
  };

  switch (fieldConfig.type) {
    case 'agentsplitcommissionrow':
      return (
        <Grid container spacing={2}>
          {agentRows.map((row, index) => (
            <Grid container item xs={12} spacing={2} key={row.id}>
              <Grid item xs={3}>
                <Controller
                  name={`${fieldConfig.name}[${index}].agentNumber`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Agent Number"
                      fullWidth
                      variant="outlined"
                      error={!!errors?.[`${fieldConfig.name}[${index}].agentNumber`]}
                      helperText={errors?.[`${fieldConfig.name}[${index}].agentNumber`]?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name={`${fieldConfig.name}[${index}].agentName`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Agent Name"
                      fullWidth
                      variant="outlined"
                      error={!!errors?.[`${fieldConfig.name}[${index}].agentName`]}
                      helperText={errors?.[`${fieldConfig.name}[${index}].agentName`]?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  name={`${fieldConfig.name}[${index}].agentCommission`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Agent Commission"
                      fullWidth
                      variant="outlined"
                      error={!!errors?.[`${fieldConfig.name}[${index}].agentCommission`]}
                      helperText={errors?.[`${fieldConfig.name}[${index}].agentCommission`]?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                {index === agentRows.length - 1 && agentRows.length < 4 && (
                  <IconButton onClick={addRow}>
                    <AddCircleIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      );
    // Other cases (text, select, etc.) remain unchanged
    default:
      return null;
  }
};



ex -2


import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextField,
  Grid,
  IconButton,
  FormLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface AgentSplitCommissionRowConfig {
  type: 'agentSplitCommissionRow';
  name: string;
  agentRows: { agentNumber: string; agentName: string; agentCommission: string }[];
  setAgentRows: (rows: { agentNumber: string; agentName: string; agentCommission: string }[]) => void;
}

type FieldConfig = 
  | AgentSplitCommissionRowConfig
  // Include other field types like text, select, etc.

interface DynamicFormFieldProps {
  fieldConfig: FieldConfig;
  isReview: boolean;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ fieldConfig, isReview }) => {
  const { control } = useFormContext();

  if (fieldConfig.type === 'agentSplitCommissionRow') {
    const { agentRows, setAgentRows } = fieldConfig;

    const addRow = () => {
      if (agentRows.length < 4) {
        setAgentRows([...agentRows, { agentNumber: '', agentName: '', agentCommission: '' }]);
      }
    };

    const removeRow = (index: number) => {
      const updatedRows = [...agentRows];
      updatedRows.splice(index, 1);
      setAgentRows(updatedRows);
    };

    return (
      <>
        {agentRows.map((row, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={3}>
              <FormLabel>Agent Number</FormLabel>
              <Controller
                name={`${fieldConfig.name}[${index}].agentNumber`}
                control={control}
                defaultValue={row.agentNumber}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    disabled={isReview}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Agent Name</FormLabel>
              <Controller
                name={`${fieldConfig.name}[${index}].agentName`}
                control={control}
                defaultValue={row.agentName}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    disabled={isReview}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <FormLabel>Agent Commission</FormLabel>
              <Controller
                name={`${fieldConfig.name}[${index}].agentCommission`}
                control={control}
                defaultValue={row.agentCommission}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    disabled={isReview}
                  />
                )}
              />
            </Grid>
            <Grid item xs={3} container alignItems="center">
              {agentRows.length > 1 && (
                <IconButton onClick={() => removeRow(index)}>
                  <DeleteIcon />
                </IconButton>
              )}
              {index === agentRows.length - 1 && (
                <IconButton onClick={addRow} disabled={agentRows.length >= 4}>
                  <AddIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}
      </>
    );
  }

  return null; // Handle other field types
};

export default DynamicFormField;




ex 3-



// useAgentRows.tsx

import { useState } from 'react';

interface AgentRow {
  agentNumber: string;
  agentName: string;
  agentCommission: string;
}

export const useAgentRows = () => {
  const [agentRows, setAgentRows] = useState<AgentRow[]>([]);

  const addAgentRow = () => {
    if (agentRows.length < 4) {
      setAgentRows([
        ...agentRows,
        { agentNumber: '', agentName: '', agentCommission: '' }
      ]);
    }
  };

  const removeAgentRow = (index: number) => {
    setAgentRows(agentRows.filter((_, i) => i !== index));
  };

  const updateAgentRow = (index: number, updatedRow: Partial<AgentRow>) => {
    setAgentRows(
      agentRows.map((row, i) =>
        i === index ? { ...row, ...updatedRow } : row
      )
    );
  };

  return { agentRows, addAgentRow, removeAgentRow, updateAgentRow };
};


// DynamicFormField.tsx

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Radio, RadioGroup, FormLabel, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAgentRows } from './useAgentRows'; // Adjust the path as needed

export type FieldOption = {
  value: string;
  label: string;
};

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
  defaultValue?: Date;
};

export type HeadingConfig = {
  type: 'heading';
  label: string;
};

export type FieldConfig =
  | TextConfig
  | SelectConfig
  | RadioConfig
  | DateConfig
  | HeadingConfig;

interface DynamicFormFieldProps {
  fieldConfig: FieldConfig;
  isReview: boolean;
}

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({ fieldConfig, isReview }) => {
  const { control, formState: { errors }, trigger } = useFormContext();

  const getErrorMessage = (name: string): string | undefined => {
    return errors[name]?.message as string | undefined;
  };

  const handleChange = async (name: string) => {
    await trigger(name); // Trigger validation for the specific field on change
  };

  switch (fieldConfig.type) {
    case 'text':
      return (
        <Grid item xs={12}>
          <FormLabel>{fieldConfig.label}</FormLabel>
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
                error={Boolean(errors[fieldConfig.name])}
                helperText={getErrorMessage(fieldConfig.name)}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(fieldConfig.name);
                }}
              />
            )}
          />
        </Grid>
      );

    case 'select':
      return (
        <Grid item xs={12}>
          <FormLabel>{fieldConfig.label}</FormLabel>
          <FormControl variant="outlined" fullWidth error={Boolean(errors[fieldConfig.name])}>
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
                    handleChange(fieldConfig.name);
                  }}
                >
                  {fieldConfig.options?.map(option => (
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
        <Grid item xs={12}>
          <FormLabel>{fieldConfig.label}</FormLabel>
          <Controller
            name={fieldConfig.name}
            control={control}
            defaultValue={fieldConfig.defaultValue || ''}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <FormControl component="fieldset" error={Boolean(errors[fieldConfig.name])}>
                <RadioGroup
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(fieldConfig.name);
                  }}
                >
                  {fieldConfig.options?.map(option => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
                {getErrorMessage(fieldConfig.name) && (
                  <FormHelperText>{getErrorMessage(fieldConfig.name)}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>
      );

    case 'date':
      return (
        <Grid item xs={12}>
          <FormLabel>{fieldConfig.label}</FormLabel>
          <Controller
            name={fieldConfig.name}
            control={control}
            defaultValue={fieldConfig.defaultValue || new Date()}
            rules={fieldConfig.rules}
            render={({ field }) => (
              <DatePicker
                {...field}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors[fieldConfig.name])}
                    helperText={getErrorMessage(fieldConfig.name)}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange(fieldConfig.name);
                    }}
                  />
                )}
              />
            )}
          />
        </Grid>
      );

    case 'heading':
      return (
        <Grid item xs={12}>
          <FormLabel>{fieldConfig.label}</FormLabel>
        </Grid>
      );

    case 'agentsplitcommissionrow':
      const { agentRows, addAgentRow, removeAgentRow, updateAgentRow } = useAgentRows();
      return (
        <>
          {agentRows.map((row, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={4}>
                <FormLabel>Agent Number</FormLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={row.agentNumber}
                  onChange={(e) => updateAgentRow(index, { agentNumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={4}>
                <FormLabel>Agent Name</FormLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={row.agentName}
                  onChange={(e) => updateAgentRow(index, { agentName: e.target.value })}
                />
              </Grid>
              <Grid item xs={4}>
                <FormLabel>Agent Commission</FormLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={row.agentCommission}
                  onChange={(e) => updateAgentRow(index, { agentCommission: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <IconButton onClick={() => removeAgentRow(index)} disabled={agentRows.length <= 1}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <IconButton onClick={addAgentRow} disabled={agentRows.length >= 4}>
            <AddIcon />
          </IconButton>
        </>
      );

    default:
      return null;
  }
};

export default DynamicFormField;







  


  





export default DynamicFormField;


how array structure 

export const PLAN_ELIGIBILITY_FIELDS_ARRAY: FieldConfig[] = [
  {
    type: 'text',
    name: 'ApplicantName',
    label: 'Applicant Name',
    rules: { required: 'Applicant Name is required' },
  },
  {
    type: 'agentsplitcommissionrow',
    name: 'AgentSplitCommission',
    label: 'Agent Split Commission',
  },
  // Other fields...
];




