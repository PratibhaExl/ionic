



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
