To create a sliding dialog dynamically using MUI (Material-UI) version 5.15.10 with a hook in a React.js application using TypeScript, you can follow the steps outlined below. This example demonstrates how to implement a custom hook that manages the dialog's open state and how to pass a dynamic message to the dialog component.

First, ensure you have MUI installed in your project. If not, you can add it by running:

bash
Copy code
npm install @mui/material @emotion/react @emotion/styled
Step 1: Create a Custom Hook for Dialog State Management
Create a custom hook (useDialog.ts) to manage the open state of the dialog. This hook will provide a way to open and close the dialog, as well as set a dynamic message.

tsx
Copy code
// useDialog.ts
import { useState } from 'react';

interface UseDialogReturn {
  isOpen: boolean;
  message: string;
  openDialog: (message: string) => void;
  closeDialog: () => void;
}

export const useDialog = (): UseDialogReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openDialog = (message: string) => {
    setMessage(message);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setMessage(''); // Optionally reset the message
  };

  return { isOpen, message, openDialog, closeDialog };
};
Step 2: Create the Dialog Component
Next, create a SlideDialog.tsx component. This component will accept isOpen, message, and closeDialog props and use MUI's Dialog component to render the dialog.

tsx
Copy code
// SlideDialog.tsx
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SlideDialogProps {
  isOpen: boolean;
  message: string;
  closeDialog: () => void;
}

export const SlideDialog: React.FC<SlideDialogProps> = ({ isOpen, message, closeDialog }) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeDialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Use Google's services?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Disagree</Button>
        <Button onClick={closeDialog} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
Step 3: Use the Hook and Dialog Component Together
Now, in your main component or any other component where you wish to use the dialog, import useDialog and SlideDialog, and utilize them as shown below.

tsx
Copy code
// App.tsx or any other component
import React from 'react';
import { useDialog } from './useDialog';
import { SlideDialog } from './SlideDialog';
import Button from '@mui/material/Button';

const App = () => {
  const { isOpen, message, openDialog, closeDialog } = useDialog();

  return (
    <div>
      <Button variant="outlined" onClick={() => openDialog('This is a dynamic message!')}>
        Open Slide Dialog
      </Button>
      <SlideDialog isOpen={isOpen} message={message} closeDialog={closeDialog} />
    </div>
  );
};

export default App;
In this setup, the App component (or any other component where you apply this pattern) can dynamically control the open state of the dialog and pass a custom message using the useDialog hook. The SlideDialog component renders the dialog with the provided message, animating it with a slide transition.




