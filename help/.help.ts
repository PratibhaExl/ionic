



{LocalChildPageData.current.FEChildArray.map((config: any, index: number) =>
  config.name === 'AddMore_Child' && Array.isArray(config.fields) ? (
    config.fields.map((group: FieldConfig[], groupIndex: number) => (
      <div key={groupIndex} className="child-group border p-3 mb-3 rounded">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">Child {groupIndex + 1}</h4>
          <button
            type="button"
            onClick={() =>
              handleDeleteChild(
                groupIndex,
                LocalChildPageData.current.FEChildArray,
                (updated) => {
                  LocalChildPageData.current.FEChildArray = updated;
                  // You may want to force re-render or useState if needed
                }
              )
            }
            className="text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
        {group.map((field: FieldConfig, idx: number) => (
          <RenderField key={idx} field={field} control={control} />
        ))}
      </div>
    ))
  ) : (
    <DynamicformField
      key={index}
      fieldConfig={config}
      isReview={isReview}
      updateState={updateState}
      defaultValues={defaultStates}
      onChange={
        config.name === 'Number_of_children'
          ? (e) => handleBenefitChild(e, config)
          : undefined
      }
      parentFunction={
        config.name === 'Number_of_children'
          ? handleBenefitChild
          : EmptyFunction
      }
    />
  )
)}


export const handleDeleteChild = (
  index: number,
  fieldsArray: FieldConfig[],
  setFieldsArray: (fields: FieldConfig[]) => void
) => {
  const updatedFieldsArray = fieldsArray.map((field) => {
    if (field.name === 'AddMore_Child' && Array.isArray(field.fields)) {
      const newGroups = [...field.fields];
      newGroups.splice(index, 1); // remove one group
      return {
        ...field,
        fields: newGroups,
      };
    }
    return field;
  });

  setFieldsArray(updatedFieldsArray);
};


      






import { FE_Child_Fields_array } from './your-path/array';
import { FE_Child_Fields_default } from './your-path/defaults';

const handleChildFieldUpdate = (childrenCount: number) => {
  // Build multiple child field sets
  const newFieldSets: FieldConfig[][] = [];

  for (let i = 0; i < childrenCount; i++) {
    const indexedFields = FE_Child_Fields_default.map((field) => ({
      ...field,
      name: `${field.name}_${i + 1}`,
      label: `${field.label} ${i + 1}`,
    }));
    newFieldSets.push(indexedFields);
  }

  // Flatten to single array
  const newFields = newFieldSets.flat();

  // Inject new fields into the AddMore_Child block
  const updatedArray = FE_Child_Fields_array.map((item) => {
    if (item.name === 'AddMore_Child') {
      return {
        ...item,
        fields: newFields,
      };
    }
    return item;
  });

  console.log("Updated FE_Child_Fields_array:", updatedArray);
  return updatedArray;
};



const updateAddMoreChildFields = (newFields: FieldConfig[]) => {
  const updatedArray = FE_Child_Fields_array.map((item) => {
    if (item.fields && Array.isArray(item.fields)) {
      const updatedFields = item.fields.map((field) => {
        if (field.name === 'AddMore_Child') {
          return {
            ...field,
            fields: [...newFields], // update AddMore_Child's fields
          };
        }
        return field;
      });

      return {
        ...item,
        fields: updatedFields,
      };
    }
    return item;
  });

  return updatedArray;
};




function buildChildInfoArray(baseChildObjects: any[], numberOfChildren: number): any[] {
  const updatedArray: any[] = [];

  for (let i = 0; i < numberOfChildren; i++) {
    const childObjects = baseChildObjects.map((obj) => {
      const newObj = { ...obj }; // shallow copy
      if (newObj.name === "ChildInfo") {
        newObj.label = `Child-${i + 1}`;
      }
      return newObj;
    });
    updatedArray.push(...childObjects);
  }

  return updatedArray;
}




OnChangeCompany(priQuesId: string, secQuesId: string, event: any) {
  if (!this.ques[priQuesId]) return; // Ensure primary question exists

  let primeQuestData = this.enrollPortReplaceQues.find(q => q.PRIMARY_QUESTION_MASTER_ID === priQuesId);
  if (!primeQuestData) return;

  let secQuesIndex = primeQuestData.SecondaryQuestion.findIndex(q => q.SECONDARY_QUESTION_ID === secQuesId);
  if (secQuesIndex === -1) return;

  let secQuesData = primeQuestData.SecondaryQuestion[secQuesIndex];

  if (event.value === "Other") {
    this.ques[priQuesId][secQuesId] = "Other"; // Store 'Other' selection

    // Check if the input field question already exists
    let addedIndex = primeQuestData.SecondaryQuestion.findIndex(q => q.SECONDARY_QUESTION_ID === secQuesId + "_other");
    if (addedIndex === -1) {
      let newQuestionObj = {
        SECONDARY_QUESTION_ID: secQuesId + "_other",
        SECONDARY_QUESTION_TXT: "Please specify other Company Name",
        ANSWER_TYPE_NM: "text",
      };

      // Insert after "Company Name" question
      primeQuestData.SecondaryQuestion.splice(secQuesIndex + 1, 0, newQuestionObj);
    }

    // Ensure input field is initialized
    if (!this.ques[priQuesId][secQuesId + "_other"]) {
      this.ques[priQuesId][secQuesId + "_other"] = "";
    }
  } else {
    this.ques[priQuesId][secQuesId] = event.value; // Store selected value
    delete this.ques[priQuesId][secQuesId + "_other"]; // Remove extra field

    // Remove dynamically added question
    let addedIndex = primeQuestData.SecondaryQuestion.findIndex(q => q.SECONDARY_QUESTION_ID === secQuesId + "_other");
    if (addedIndex !== -1) {
      primeQuestData.SecondaryQuestion.splice(addedIndex, 1);
    }
  }
}


OnUpdateCompany(priQuesId: string, secQuesId: string, inputValue: string) {
  if (!this.ques[priQuesId] || this.ques[priQuesId][secQuesId] !== "Other") return;

  if (inputValue.trim()) {
    this.ques[priQuesId][secQuesId] = inputValue; // Store user input
  } else {
    this.ques[priQuesId][secQuesId] = "Other"; // Keep selection if empty
  }
}




/////
updateCompanyName(priQuesId: string, secQuesId: string, secAnsType: string) {
  if (!this.ques[priQuesId]) return; // Ensure primary question exists

  let primeQuestData = this.enrollPortReplaceQues.find(q => q.PRIMARY_QUESTION_MASTER_ID === priQuesId);
  if (!primeQuestData) return;

  let secQuesIndex = primeQuestData.SecondaryQuestion.findIndex(q => q.SECONDARY_QUESTION_ID === secQuesId);
  if (secQuesIndex === -1) return;

  let secQuesData = primeQuestData.SecondaryQuestion[secQuesIndex];

  // Check if question is "Company Name" and "Other" is selected
  if (secAnsType === "Company Name" && this.ques[priQuesId][secQuesId] === "Other") {
    if (!this.ques[priQuesId][secQuesId + "_other"]) {
      this.ques[priQuesId][secQuesId + "_other"] = ""; // Initialize empty input field
    }

    // Check if the new object is already added
    let addedIndex = primeQuestData.SecondaryQuestion.findIndex(q => q.SECONDARY_QUESTION_ID === secQuesId + "_other");
    if (addedIndex === -1) {
      // Create a new object for the additional selection
      let newQuestionObj = {
        SECONDARY_QUESTION_ID: secQuesId + "_other",
        SECONDARY_QUESTION_TXT: "Please specify other Company Name",
        ANSWER_TYPE_NM: "select",
        OPTIONS: ["Other"], // Predefined select option
      };

      // Insert new object right after "Company Name" question
      primeQuestData.SecondaryQuestion.splice(secQuesIndex + 1, 0, newQuestionObj);
    }
  } else {
    // If "Other" is not selected or is removed, delete the extra field and question object
    delete this.ques[priQuesId][secQuesId + "_other"];

    let addedIndex = primeQuestData.SecondaryQuestion.findIndex(q => q.SECONDARY_QUESTION_ID === secQuesId + "_other");
    if (addedIndex !== -1) {
      primeQuestData.SecondaryQuestion.splice(addedIndex, 1);
    }
  }
}



updateCompanyName(priQuesId: string, secQuesId: string, secAnsType: string) {
  if (!this.ques[priQuesId]) return; // Ensure primary question exists

  let primeQuestData = this.enrollPortReplaceQues.find(q => q.PRIMARY_QUESTION_MASTER_ID === priQuesId);
  if (!primeQuestData) return;

  let secQuesIndex = primeQuestData.SecondaryQuestion.findIndex(q => q.SECONDARY_QUESTION_ID === secQuesId);
  if (secQuesIndex === -1) return;

  let secQuesData = primeQuestData.SecondaryQuestion[secQuesIndex];

  // Check if answer type is "Company Name" and "Other" is selected
  if (secAnsType === "Company Name" && this.ques[priQuesId][secQuesId] === "Other") {
    if (this.ques[priQuesId][secQuesId + "_other"]?.trim()) {
      // Replace "Other" with user input
      this.ques[priQuesId][secQuesId] = this.ques[priQuesId][secQuesId + "_other"];

      // Create a new object for the updated company name
      let newQuestionObj = {
        SECONDARY_QUESTION_ID: secQuesId + "_other",
        SECONDARY_QUESTION_TXT: "Updated Company Name",
        ANSWER_TYPE_NM: "text",
      };

      // Insert new object right below the original question
      primeQuestData.SecondaryQuestion.splice(secQuesIndex + 1, 0, newQuestionObj);
    }
  } else {
    // If "Other" is not selected or deselected, remove additional input field
    delete this.ques[priQuesId][secQuesId + "_other"];

    // Find and remove the dynamically added question
    let addedQuestionIndex = primeQuestData.SecondaryQuestion.findIndex(q => q.SECONDARY_QUESTION_ID === secQuesId + "_other");
    if (addedQuestionIndex !== -1) {
      primeQuestData.SecondaryQuestion.splice(addedQuestionIndex, 1);
    }
  }
}
