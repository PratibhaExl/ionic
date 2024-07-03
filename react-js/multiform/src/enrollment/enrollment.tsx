import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Plan from './plan';
import Health from './health';
import { Grid } from '@mui/material';

const Enrollment: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const planFormRef = useRef<HTMLFormElement>(null);

  const triggerValidation = async () => {
    if (planFormRef.current) {
      const isValid = planFormRef.current.reportValidity();
      return isValid;
    }
    return false;
  };

  const nextStep = async () => {
    if (step === 0) {
      const isValid = await triggerValidation();
      if (isValid) {
        setStep(1);
      } else {
        alert('Please fill out all required fields.');
      }
    } else if (step === 1) {
      setStep(2);
    }
  };

  return (
    <div>
     
     <Grid container spacing={2}>
         
         <Grid item xs={12}>
         {step === 0 && <Plan triggerValidation={triggerValidation} formRef={planFormRef}  />}
         {step === 1 && <Health triggerValidation={triggerValidation} formRef={planFormRef}/>}
         </Grid>
         <Grid item xs={12}>
        <button  onClick={nextStep}>Next</button>
        </Grid>
    </Grid>

     
    </div>
  );
};

export default Enrollment;
