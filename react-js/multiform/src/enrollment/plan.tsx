import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import TextField from './components/TextField';
import SelectField from './components/SelectField';
import { Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

interface PlanProps {
  triggerValidation: () => Promise<boolean>;
  formRef: React.Ref<HTMLFormElement>;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Plan: React.FC<PlanProps> = ({ triggerValidation, formRef }) => {
  const methods = useForm({
    defaultValues: {
      planName: '',
      planType: '',
    }
  });

  const { handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: any) => {
    console.log('Plan Data:', data);
  };

  return (
    <Container maxWidth="md">
      <h2>Plan </h2>
      <FormProvider {...methods}>
        <form id="plan-form" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="planName"
                control={methods.control}
                label="Plan Name"
                required
                error={!!errors.planName}
                helperText={errors.planName && <span style={{ color: 'red' }}>{errors.planName.message}</span>}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectField
                name="planType"
                control={methods.control}
                label="Plan Type"
                options={[
                  { label: 'Basic', value: 'basic' },
                  { label: 'Premium', value: 'premium' }
                ]}
                required
                error={!!errors.planType}
                helperText={errors.planType && <span style={{ color: 'red' }}>{errors.planType.message}</span>}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
};

export default Plan;
