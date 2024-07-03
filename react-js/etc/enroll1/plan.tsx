import React from 'react';
import DynamicFormField, { FieldConfig } from './DynamicFormField';

const fieldConfigs: FieldConfig[] = [
  {
    type: 'text',
    name: 'firstName',
    label: 'First Name',
    rules: { required: 'First Name is required' },
    defaultValue: ''
  },
  {
    type: 'select',
    name: 'country',
    label: 'Country',
    options: [
      { value: 'usa', label: 'USA' },
      { value: 'canada', label: 'Canada' },
      { value: 'uk', label: 'UK' }
    ],
    rules: { required: 'Select Country is required' },
    defaultValue: ''
  },
  {
    type: 'radio',
    name: 'gender',
    label: 'Gender',
    rules: { required: 'Select Gender is required' },
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ],
    defaultValue: ''
  }
];

const Plan = () => (
  <form>
    {fieldConfigs.map((config, index) => (
      <DynamicFormField key={index} fieldConfig={config} />
    ))}
  </form>
);

export default Plan;
