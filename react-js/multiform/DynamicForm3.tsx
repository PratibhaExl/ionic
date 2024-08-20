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




