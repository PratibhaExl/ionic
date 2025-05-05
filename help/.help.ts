

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
