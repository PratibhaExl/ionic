import React from 'react';
import DynamicFormField, { FieldConfig } from './DynamicFormField';

const fieldConfigs: FieldConfig[] = [
  {
    type: 'text',
    name: 'firstName',
    label: 'First Name',
    rules: { required: 'First Name is required' },
    defaultValue: 'John'
  },
  {
    type: 'select',
    name: 'country',
    label: 'Country',
    options: [
      { value: 'usa', label: 'USA' },
      { value: 'canada', label: 'Canada' },
      { value: 'uk', label: 'UK' },
      { value: 'australia', label: 'Australia' },
      { value: 'india', label: 'India' }
    ],
    defaultValue: 'usa'
  },
  {
    type: 'radio',
    name: 'gender',
    label: 'Gender',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ],
    defaultValue: 'male'
  },
  {
    type: 'date',
    name: 'dob',
    label: 'Date of Birth',
    rules: { required: 'Date of Birth is required' },
    defaultValue: '01/01/2000'
  }
];

const Plan = () => (
  <form>
    {fieldConfigs.map((config, index) => (
      <DynamicFormField key={index} fieldConfig={config} />
    ))}
    {/* Other form elements and submit button */}
  </form>
);

export default Plan;
