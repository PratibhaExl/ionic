1-

    // Insert mailing address fields immediately after MailingOption field
  const PLAN_ELIGIBILITY_FIELDS = PLAN_ELIGIBILITY_FIELDS_ARRAY.reduce((acc, field) => {
    acc.push(field);
    if (field.name === 'MailingOption' && showMailingContent) {
      acc.push(...MAILING_ADDRESS_CONTAINS_FIELDS_ARRAY);
    }
    return acc;
  }, []);




