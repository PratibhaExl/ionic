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




