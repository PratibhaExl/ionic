

Revised Approach

formfield component


import React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';

type MenuItemType = {
  Value: string;
  Label: string;
};

type FieldType = {
  Id: string;
  FieldName: string;
  Type: 'TextField' | 'SelectField' | 'RadioField' | 'CheckboxField';
  MenuItem?: MenuItemType[];
  rules?: { required: string };
};

type FormFieldProps = {
  field: FieldType;
  value: string | string[] | boolean;
  handleChange: (fieldId: string, value: string | boolean, checkboxValue?: string) => void;
  error?: boolean;
  helperText?: string; // Correct type for helperText
  handleBlur: (fieldId: string) => void;
};

const FormField: React.FC<FormFieldProps> = ({ field, value, handleChange, error, helperText, handleBlur }) => {
  const { Id, FieldName, Type, MenuItem: menuItems } = field;

  switch (Type) {
    case 'SelectField':
      return (
        <FormControl fullWidth margin="normal" error={!!error}>
          <Select
            id={Id}
            value={value as string}
            onChange={(e) => handleChange(Id, e.target.value as string)}
            onBlur={() => handleBlur(Id)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select {FieldName}
            </MenuItem>
            {menuItems?.map((item) => (
              <MenuItem key={item.Value} value={item.Value}>
                {item.Label}
              </MenuItem>
            ))}
          </Select>
          {helperText && <div>{helperText}</div>}
        </FormControl>
      );
    case 'RadioField':
      return (
        <FormControl component="fieldset" fullWidth margin="normal" error={!!error}>
          <FormLabel component="legend">{FieldName}</FormLabel>
          <RadioGroup
            id={Id}
            value={value as string}
            onChange={(e) => handleChange(Id, e.target.value)}
            onBlur={() => handleBlur(Id)}
          >
            {menuItems?.map((item) => (
              <FormControlLabel
                key={item.Value}
                value={item.Value}
                control={<Radio />}
                label={item.Label}
              />
            ))}
          </RadioGroup>
          {helperText && <div>{helperText}</div>}
        </FormControl>
      );
    case 'CheckboxField':
      return (
        <FormControl component="fieldset" fullWidth margin="normal" error={!!error}>
          <FormLabel component="legend">{FieldName}</FormLabel>
          {menuItems?.map((item) => (
            <FormControlLabel
              key={item.Value}
              control={
                <Checkbox
                  checked={(value as string[]).includes(item.Value)}
                  onChange={(e) => handleChange(Id, e.target.checked, item.Value)}
                  onBlur={() => handleBlur(Id)}
                />
              }
              label={item.Label}
            />
          ))}
          {helperText && <div>{helperText}</div>}
        </FormControl>
      );
    default:
      return (
        <TextField
          id={Id}
          label={FieldName}
          value={value as string}
          onChange={(e) => handleChange(Id, e.target.value)}
          onBlur={() => handleBlur(Id)}
          error={!!error}
          helperText={helperText} // Ensure helperText is of type string or undefined
          variant="outlined"
          fullWidth
          margin="normal"
        />
      );
  }
};

export default FormField;


Form Component:

The Form component remains mostly unchanged, focusing on rendering fields and managing their state visually.

tsx
Copy code
import React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';

type MenuItemType = {
  Value: string;
  Label: string;
};

type FieldType = {
  Id: string;
  FieldName: string;
  Type: 'TextField' | 'SelectField' | 'RadioField' | 'CheckboxField';
  MenuItem?: MenuItemType[];
  rules?: { required: string };
};

type FormFieldProps = {
  field: FieldType;
  value: string | string[] | boolean;
  handleChange: (fieldId: string, value: string | boolean, checkboxValue?: string) => void;
  error?: boolean;
  helperText?: string;
  handleBlur: (fieldId: string) => void;
};

const FormField: React.FC<FormFieldProps> = ({ field, value, handleChange, error, helperText, handleBlur }) => {
  const { Id, FieldName, Type, MenuItem: menuItems } = field;

  switch (Type) {
    case 'SelectField':
      return (
        <FormControl fullWidth margin="normal" error={!!error}>
          <Select
            id={Id}
            value={value as string}
            onChange={(e) => handleChange(Id, e.target.value as string)}
            onBlur={() => handleBlur(Id)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select {FieldName}
            </MenuItem>
            {menuItems?.map((item) => (
              <MenuItem key={item.Value} value={item.Value}>
                {item.Label}
              </MenuItem>
            ))}
          </Select>
          {helperText && <div>{helperText}</div>}
        </FormControl>
      );
    case 'RadioField':
      return (
        <FormControl component="fieldset" fullWidth margin="normal" error={!!error}>
          <FormLabel component="legend">{FieldName}</FormLabel>
          <RadioGroup
            id={Id}
            value={value as string}
            onChange={(e) => handleChange(Id, e.target.value)}
            onBlur={() => handleBlur(Id)}
          >
            {menuItems?.map((item) => (
              <FormControlLabel
                key={item.Value}
                value={item.Value}
                control={<Radio />}
                label={item.Label}
              />
            ))}
          </RadioGroup>
          {helperText && <div>{helperText}</div>}
        </FormControl>
      );
    case 'CheckboxField':
      return (
        <FormControl component="fieldset" fullWidth margin="normal" error={!!error}>
          <FormLabel component="legend">{FieldName}</FormLabel>
          {menuItems?.map((item) => (
            <FormControlLabel
              key={item.Value}
              control={
                <Checkbox
                  checked={(value as string[]).includes(item.Value)}
                  onChange={(e) => handleChange(Id, e.target.checked, item.Value)}
                  onBlur={() => handleBlur(Id)}
                />
              }
              label={item.Label}
            />
          ))}
          {helperText && <div>{helperText}</div>}
        </FormControl>
      );
    default:
      return (
        <TextField
          id={Id}
          label={FieldName}
          value={value as string}
          onChange={(e) => handleChange(Id, e.target.value)}
          onBlur={() => handleBlur(Id)}
          error={!!error}
          helperText={helperText}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      );
  }
};

const Form: React.FC<{ fields: FieldType[]; formData: any; handleChange: (fieldId: string, value: string | boolean, checkboxValue?: string) => void; errors: { [key: string]: boolean }; touched: { [key: string]: boolean }; handleBlur: (fieldId: string) => void; }> = ({ fields, formData, handleChange, errors, touched, handleBlur }) => {
  return (
    <form>
      {fields.map((field) => (
        <FormField
          key={field.Id}
          field={field}
          value={formData[field.Id]}
          handleChange={handleChange}
          error={touched[field.Id] && errors[field.Id]}
          helperText={touched[field.Id] ? errors[field.Id] : undefined}
          handleBlur={handleBlur}
        />
      ))}
    </form>
  );
};

export default Form;
Child Component:

The Child component manages its own state, validation, and error handling. It passes form data changes back to the parent via a callback.

tsx
Copy code
import React, { useState, useEffect } from 'react';
import Form from './Form';

type MenuItemType = {
  Value: string;
  Label: string;
};

type FieldType = {
  Id: string;
  FieldName: string;
  Type: 'TextField' | 'SelectField' | 'RadioField' | 'CheckboxField';
  MenuItem?: MenuItemType[];
  rules?: { required: string };
};

const fields: FieldType[] = [
  {
    Id: 'firstname',
    FieldName: 'First Name',
    Type: 'TextField',
    rules: { required: 'First Name is required' }
  },
  {
    Id: 'lastname',
    FieldName: 'Last Name',
    Type: 'TextField',
    rules: { required: 'Last Name is required' }
  },
  {
    Id: 'paymentMethod',
    FieldName: 'Payment Method',
    Type: 'SelectField',
    MenuItem: [
      { Value: 'eft', Label: 'EFT' },
      { Value: 'direct bill', Label: 'Direct Bill' },
      { Value: 'ss billing', Label: 'SS Billing' }
    ],
    rules: { required: 'Payment Method is required' }
  }
  // Add more fields as needed
];

type ChildProps = {
  onFormDataChange: (formData: { [key: string]: string | boolean | string[] }) => void;
};

const Child: React.FC<ChildProps> = ({ onFormDataChange }) => {
  const [formData, setFormData] = useState<{ [key: string]: string | boolean | string[] }>(
    fields.reduce((acc, field) => {
      acc[field.Id] = field.Type === 'CheckboxField' ? [] : '';
      return acc;
    }, {} as { [key: string]: string | boolean | string[] })
  );

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleBlur = (fieldId: string) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [fieldId]: true,
    }));
  };

  const handleChange = (fieldId: string, value: string | boolean, checkboxValue?: string) => {
    setFormData((prevData) => {
      if (checkboxValue !== undefined) {
        const newValues = (prevData[fieldId] as string[]).includes(checkboxValue)
          ? (prevData[fieldId] as string[]).filter((val) => val !== checkboxValue)
          : [...(prevData[fieldId] as string[]), checkboxValue];
        return { ...prevData, [fieldId]: newValues };
      }
      return { ...prevData, [fieldId]: value };
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: boolean } = {};
    fields.forEach((field) => {
      const value = formData[field.Id];
      if (field.rules?.required && (!value || (Array.isArray(value) && value.length === 0))) {
        newErrors[field.Id] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [formData]);

  useEffect(() => {
    onFormDataChange(formData);
  }, [formData, onFormDataChange]);

  return (
    <Form
      fields={fields}
      formData={formData}
      handleChange={handleChange}
      errors={errors}
      touched={touched}
      handleBlur={handleBlur}
    />
  );
};

export default Child;
Changes Made:

Child Component: The onFormDataChange prop now correctly handles form data changes, which are passed up to the parent component.
App Component:

The App component manages multiple instances of the Child component, each handling its own form data.

tsx
Copy code
import React from 'react';
import Child from './Child';
import Button from '@mui/material/Button';

const App: React.FC = () => {
  const handleSubmit = (formData: { [key: string]: string | boolean | string[] }) => {
    console.log('Form data submitted:', formData);
    // Handle submission logic here
  };

  return (
    <div>
      <h1>Child 1 Form</h1>
      <Child onFormDataChange={handleSubmit} />
      <h1>Child 2 Form</h1>
      <Child onFormDataChange={handleSubmit} />
      {/* Add more Child components as needed */}
    </div>
  );
};

export default App;
Changes Made:

App Component: The handleSubmit function now receives form data directly from each Child component, allowing the parent to handle final submission logic.



next click handle form validation 

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Form from './Form';

type MenuItemType = {
  Value: string;
  Label: string;
};

type FieldType = {
  Id: string;
  FieldName: string;
  Type: 'TextField' | 'SelectField' | 'RadioField' | 'CheckboxField';
  MenuItem?: MenuItemType[];
  rules?: { required: string };
};

const fields: FieldType[] = [
  {
    Id: 'firstname',
    FieldName: 'First Name',
    Type: 'TextField',
    rules: { required: 'First Name is required' }
  },
  {
    Id: 'lastname',
    FieldName: 'Last Name',
    Type: 'TextField',
    rules: { required: 'Last Name is required' }
  },
  {
    Id: 'paymentMethod',
    FieldName: 'Payment Method',
    Type: 'SelectField',
    MenuItem: [
      { Value: 'eft', Label: 'EFT' },
      { Value: 'direct bill', Label: 'Direct Bill' },
      { Value: 'ss billing', Label: 'SS Billing' }
    ],
    rules: { required: 'Payment Method is required' }
  }
  // Add more fields as needed
];

type ChildProps = {
  onValidate: () => boolean; // Function to trigger validation and return validation status
  getFormData: () => { [key: string]: string | boolean | string[] }; // Function to get form data
};

const Child: React.ForwardRefRenderFunction<ChildProps> = ({ onValidate, getFormData }, ref) => {
  const [formData, setFormData] = useState<{ [key: string]: string | boolean | string[] }>(
    fields.reduce((acc, field) => {
      acc[field.Id] = field.Type === 'CheckboxField' ? [] : '';
      return acc;
    }, {} as { [key: string]: string | boolean | string[] })
  );

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleBlur = (fieldId: string) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [fieldId]: true,
    }));
  };

  const handleChange = (fieldId: string, value: string | boolean, checkboxValue?: string) => {
    setFormData((prevData) => {
      if (checkboxValue !== undefined) {
        const newValues = (prevData[fieldId] as string[]).includes(checkboxValue)
          ? (prevData[fieldId] as string[]).filter((val) => val !== checkboxValue)
          : [...(prevData[fieldId] as string[]), checkboxValue];
        return { ...prevData, [fieldId]: newValues };
      }
      return { ...prevData, [fieldId]: value };
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: boolean } = {};
    fields.forEach((field) => {
      const value = formData[field.Id];
      if (field.rules?.required && (!value || (Array.isArray(value) && value.length === 0))) {
        newErrors[field.Id] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Expose functions to parent component using useImperativeHandle and forwardRef
  useImperativeHandle(ref, () => ({
    validate,
    getFormData
  }));

  return (
    <div>
      <Form
        fields={fields}
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        touched={touched}
        handleBlur={handleBlur}
      />
    </div>
  );
};

export default forwardRef(Child);


import React, { useRef } from 'react';
import Child from './Child';

const App: React.FC = () => {
  const childRef = useRef<{ validate: () => boolean; getFormData: () => { [key: string]: string | boolean | string[] } }>(null);

  const handleChildValidate = () => {
    const isValid = childRef.current?.validate() ?? false; // Validate Child form
    console.log('Child form validation status:', isValid);
    return isValid;
  };

  const handleChildNextClick = () => {
    const isValid = handleChildValidate();
    if (isValid) {
      const formData = childRef.current?.getFormData(); // Retrieve Child form data
      console.log('Child form data:', formData);
      // Proceed to next step or perform desired action
    } else {
      // Optionally handle validation failure
      console.log('Child form validation failed.');
    }
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <Child onValidate={handleChildValidate} getFormData={() => childRef.current?.getFormData()} ref={childRef} />
      {/* Example button to trigger validation */}
      <button onClick={handleChildNextClick}>Next</button>
    </div>
  );
};

export default App;

  
