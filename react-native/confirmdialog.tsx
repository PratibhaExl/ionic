Creating a dynamic slide dialog in React with MUI (Material-UI) and TypeScript can be achieved by utilizing React hooks such as useState for managing the dialog's open state, and useEffect for any necessary side effects. The following example demonstrates how to create a slide transition dialog that you can trigger via a button click, with dynamic content such as a custom message and button text.

First, make sure you have MUI installed in your project. If not, you can install it via npm or yarn:

bash
Copy code
npm install @mui/material @emotion/react @emotion/styled
or

bash
Copy code
yarn add @mui/material @emotion/react @emotion/styled
Here's an example component ConfirmDialog.tsx that incorporates a slide transition for the dialog and accepts props for customizing the message and button text:

tsx
Copy code
import React, { forwardRef, ReactElement, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmButtonText: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  message,
  confirmButtonText,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>{confirmButtonText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
Then, use this ConfirmDialog in your component like so:

tsx
Copy code
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ConfirmDialog from './ConfirmDialog';

const YourComponent = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // Handle the confirmation action here
    console.log('Confirmed!');
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete Item
      </Button>
      <ConfirmDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message="Are you sure you want to delete?"
        confirmButtonText="OK"
      />
    </div>
  );
};

export default YourComponent;
This example provides a basic framework for a dynamic slide dialog. You can further customize it according to your needs.




