parent


import { useForm, FormProvider } from "react-hook-form";
import ChildInfo from "./ChildInfo";

const Enrollment = () => {
  const methods = useForm({
  defaultValues: {
    numberOfChildren: 1,
    AddMore_Child: FE_child_arr,
  },
});


  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    console.log("Submitted data:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ChildInfo />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => reset()}>Reset</button>
      </form>
    </FormProvider>
  );
};

export default Enrollment;





child



import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { FE_child_arr } from "./yourConstantsFile"; // import the structure

const ChildInfo = () => {
  const { register, setValue, getValues, watch, control } = useFormContext();

  const { fields, replace } = useFieldArray({
    control,
    name: "AddMore_Child",
  });

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value);
    setValue("numberOfChildren", count);

    const newArray = Array.from({ length: count }, () => ({
      ...FE_child_arr[0], // use the structure
    }));

    replace(newArray);
  };

  const numberOfChildren = watch("numberOfChildren");

  return (
    <>
      <label>Number of Children</label>
      <select value={numberOfChildren} onChange={handleDropdownChange}>
        {[1, 2, 3, 4].map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>

      {fields.map((item, index) => (
        <div key={item.id} style={{ marginTop: "10px" }}>
          <input
            {...register(`AddMore_Child.${index}.childName`)}
            placeholder="Child Name"
          />
          <input
            {...register(`AddMore_Child.${index}.childAge`)}
            placeholder="Child Age"
          />
          <input
            {...register(`AddMore_Child.${index}.childGender`)}
            placeholder="Child Gender"
          />
        </div>
      ))}
    </>
  );
};

export default ChildInfo;











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







