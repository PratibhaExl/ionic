



export const Optional_Benefit_Riders: FieldConfig[] = [
  {
    type: 'select',
    name: 'Number_of_children',
    label: 'Number of Children',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
    ],
    isMandatory: false,
    onChangeFieldTrigger: 'AddMore_Child', // Custom key to identify injection
  },
  {
    name: 'AddMore_Child',
    label: 'Add Child Info',
    type: 'fieldArray',
    fields: [], // Will be populated dynamically
  },
];



import { FE_Child_Fields_default } from './FE_Child_Fields_default';

export const handleChildrenChange = (
  value: number,
  fieldsArray: FieldConfig[]
): FieldConfig[] => {
  const newChildSets = [];

  for (let i = 1; i <= value; i++) {
    const childFields = FE_Child_Fields_default.map((field) => ({
      ...field,
      name: `${field.name}_${i}`,
      label: `${field.label} ${i}`,
    }));
    newChildSets.push(...childFields);
  }

  return fieldsArray.map((field) => {
    if (field.name === 'AddMore_Child') {
      return {
        ...field,
        fields: newChildSets,
      };
    }
    return field;
  });
};


const [formFields, setFormFields] = useState(Optional_Benefit_Riders);

const handleChange = (e: any, field: FieldConfig) => {
  if (field.name === 'Number_of_children') {
    const updated = handleChildrenChange(Number(e.target.value), formFields);
    setFormFields(updated);
  }
};


{formFields.map((fieldConfig, index) => (
  <DynamicFormField
    key={index}
    fieldConfig={fieldConfig}
    control={control}
    onChange={(e) => handleChange(e, fieldConfig)}
  />
))}







