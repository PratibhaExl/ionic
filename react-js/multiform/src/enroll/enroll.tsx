import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Grid } from '@mui/material';
import Plan from './plan';

const Enroll = () => {
  const methods = useForm();

  const nextStep = async () => {
    const isValid = await methods.trigger(); // Trigger validation
    if (isValid) {
      console.log(methods.getValues()); // Access form data if valid
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Plan />
        <Grid item xs={12}>
          <button onClick={nextStep}>Next</button>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default Enroll;
