working

Certainly! You can create a custom hook for handling different types of alerts (error, success, info, warning) with dynamic messages using Material-UI 5.15.10 in a React TypeScript (tsx) component. Here's an example:

Create a useAlert hook:
tsx
Copy code
// useAlert.ts
import { useState } from 'react';

export type AlertType = 'error' | 'success' | 'info' | 'warning';

interface AlertOptions {
  message: string;
}

const useAlert = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<AlertType>('info');

  const showAlert = (type: AlertType, options: AlertOptions) => {
    setAlertType(type);
    setMessage(options.message);
    setOpen(true);
  };

  const closeAlert = () => {
    setOpen(false);
  };

  return {
    open,
    message,
    alertType,
    showAlert,
    closeAlert,
  };
};

export default useAlert;
Use the useAlert hook in your main component:
tsx
Copy code
// YourMainComponent.tsx
import React from 'react';
import useAlert, { AlertType } from './useAlert';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const YourMainComponent: React.FC = () => {
  const { open, message, alertType, showAlert, closeAlert } = useAlert();

  const handleShowAlert = (type: AlertType, customMessage: string) => {
    showAlert(type, { message: customMessage });
  };

  return (
    <div>
      {/* Your main component content */}
      <button onClick={() => handleShowAlert('success', 'Success message')}>
        Show Success Alert
      </button>
      <button onClick={() => handleShowAlert('error', 'Error message')}>
        Show Error Alert
      </button>
      <button onClick={() => handleShowAlert('info', 'Info message')}>
        Show Info Alert
      </button>
      <button onClick={() => handleShowAlert('warning', 'Warning message')}>
        Show Warning Alert
      </button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={alertType}
          onClose={closeAlert}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default YourMainComponent;
In this example, the useAlert hook provides a simple interface to handle different types of alerts with dynamic messages. You can use the showAlert function to display alerts of different types and customize the messages dynamically.
