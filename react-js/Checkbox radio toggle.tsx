


{fieldConfig.type === "checkbox" && (
  <Grid item xs={12} className="dynamic-form-field">
    <FormLabel className="field-label">
      {fieldConfig.label}{" "}
      {fieldConfig.isMandatory && <MandatoryMark />}
    </FormLabel>

    <Controller
      name={fieldConfig.name}
      control={control}
      render={({ field }) => (
        <FormGroup>
          {fieldConfig.options.map((option: { key: string; value: string }) => (
            <FormControlLabel
              key={option.key}
              control={
                <Checkbox
                  checked={field.value?.includes(option.key) || false}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(field.value || []), option.key] // Add checked value
                      : field.value?.filter((v: string) => v !== option.key); // Remove unchecked value
                    field.onChange(newValue);
                  }}
                />
              }
              label={option.value}
            />
          ))}
        </FormGroup>
      )}
    />
  </Grid>
)}

const FORM_FIELDS = [
  {
    name: "features",
    label: "Select Features",
    type: "checkbox",
    isMandatory: true,
    options: [
      { key: "feature1", value: "Feature 1" },
      { key: "feature2", value: "Feature 2" },
      { key: "feature3", value: "Feature 3" },
    ],
  },
];




//multiple checked 





{
  name: "assignToSelf",
  label: "Assign to Self",
  type: "toggle",
  options: ["Not Assigned", "Assigned"]
}


{fieldConfig.type === "toggle" && (
  <Controller
    name={fieldConfig.name}
    control={control}
    render={({ field }) => (
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>{fieldConfig.options?.[0] || "No"}</Typography>
        <Switch
          checked={field.value}
          onChange={(e) => setValue(fieldConfig.name, e.target.checked)}
        />
        <Typography>{fieldConfig.options?.[1] || "Yes"}</Typography>
      </Stack>
    )}
  />
)}







export const FORM_FIELDS = [
  { name: "requestType", label: "Request Type", type: "selectTypeSubType", isMandatory: true },
  { name: "callBackNumber", label: "Call Back Number", type: "text" },
  { name: "products", label: "Products", type: "text" },
  { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"] },
  { name: "email", label: "Email", type: "text" },
  { name: "contactDate", label: "Contact Date", type: "date" },
  { name: "contactMethod", label: "Contact Method", type: "select", options: ["Phone", "Email"] },
  { name: "team", label: "Team", type: "text" },
  { name: "commentsTemplate", label: "Comments Template", type: "textarea" },
  { name: "comments", label: "Comments", type: "textarea" },
  { name: "assignToSelf", label: "Assign to Self", type: "toggle" },
  {
    name: "selectedCheckboxes",
    label: "Select Interests",
    type: "checkbox",
    options: ["Option1", "Option2", "Option3"]
  },
  {
    name: "selectedRadio",
    label: "Choose an Option",
    type: "radio",
    options: ["Option A", "Option B"]
  },
  { name: "uploadFile", label: "Upload Files", type: "file" }
];

const DynamicForm: React.FC<{ fields: any[]; control: any; setValue: any }> = ({ fields, control, setValue }) => {
  return (
    <Grid container spacing={2}>
      {fields.map((fieldConfig) => (
        <Grid item xs={12} md={4} key={fieldConfig.name} className="dynamic-form-field">
          <FormLabel className="field-label">
            {fieldConfig.label} {fieldConfig.isMandatory && <span style={{ color: "red" }}>*</span>}
          </FormLabel>

          {fieldConfig.type === "text" && (
            <Controller name={fieldConfig.name} control={control} render={({ field }) => <TextField {...field} fullWidth />} />
          )}

          {fieldConfig.type === "textarea" && (
            <Controller name={fieldConfig.name} control={control} render={({ field }) => <TextField {...field} multiline rows={3} fullWidth />} />
          )}

          {fieldConfig.type === "select" && (
            <Controller
              name={fieldConfig.name}
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth>
                  {fieldConfig.options.map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          )}

          {fieldConfig.type === "radio" && (
            <Controller
              name={fieldConfig.name}
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  {fieldConfig.options.map((option: string) => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              )}
            />
          )}

          {fieldConfig.type === "checkbox" && (
            <Controller
              name={fieldConfig.name}
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FormGroup row>
                  {fieldConfig.options.map((option: string) => (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          checked={field.value.includes(option)}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...field.value, option]
                              : field.value.filter((item: string) => item !== option);
                            setValue(fieldConfig.name, newValue);
                          }}
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>
              )}
            />
          )}

          {fieldConfig.type === "toggle" && (
            <Controller
              name={fieldConfig.name}
              control={control}
              render={({ field }) => (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>No</Typography>
                  <Switch checked={field.value} onChange={(e) => setValue(fieldConfig.name, e.target.checked)} />
                  <Typography>Yes</Typography>
                </Stack>
              )}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};


const RequestCreate: React.FC = () => {
  const location = useLocation();
  const prepopulatedData = location.state || {
    requestType: "General Inquiry",
    priority: "High",
    selectedCheckboxes: ["Option1"],
    selectedRadio: "Option A",
    assignToSelf: true,
    uploadFile: []
  };

  const methods = useForm({ defaultValues: prepopulatedData });
  const { handleSubmit, reset, setValue, control } = methods;
  const [files, setFiles] = useState(prepopulatedData.uploadFile || []);

  useEffect(() => {
    Object.entries(prepopulatedData).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, [setValue]);

  const onSubmit = (data: any) => {
    console.log("Submitted Data:", { ...data, uploadFile: files });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && files.length < 4) {
      setFiles([...files, ...Array.from(event.target.files)].slice(0, 4));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DynamicForm fields={FORM_FIELDS} control={control} setValue={setValue} />

        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Typography variant="h6">Uploaded Files</Typography>
          <input type="file" multiple onChange={handleFileUpload} />
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} 
                <IconButton size="small" onClick={() => removeFile(index)}>
                  <DeleteIcon />
                </IconButton>
              </li>
            ))}
          </ul>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={() => reset(prepopulatedData)}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};











////////

<Controller
  name="isToggleEnabled"
  control={control}
  render={({ field }) => (
    <Switch
      checked={field.value}
      onChange={(e) => setValue("isToggleEnabled", e.target.checked)}
    />
  )}
/>


<Controller
  name="selectedRadio"
  control={control}
  render={({ field }) => (
    <RadioGroup
      {...field}
      onChange={(e) => setValue("selectedRadio", e.target.value)}
    >
      <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
      <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
    </RadioGroup>
  )}
/>

<Controller
  name="selectedCheckboxes"
  control={control}
  render={({ field }) => (
    <FormGroup>
      {["option1", "option2", "option3"].map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={field.value.includes(option)}
              onChange={(e) => {
                const updatedValues = e.target.checked
                  ? [...field.value, option]
                  : field.value.filter((v: string) => v !== option);
                setValue("selectedCheckboxes", updatedValues);
              }}
            />
          }
          label={option}
        />
      ))}
    </FormGroup>
  )}
/>





/////





{fieldConfig.type === "toggle" && (
  <Grid item xs={12} className="dynamic-form-field">
    <FormLabel className="field-label">
      {fieldConfig.label} {fieldConfig.isMandatory && <MandatoryMark />}
    </FormLabel>

    <Controller
      name={fieldConfig.name}
      control={control}
      defaultValue={fieldConfig.defaultValue || false} // Ensure defaultValue
      render={({ field }) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>No</Typography>
          <Switch
            {...field}
            checked={field.value} // Bind value properly
            onChange={(e) => field.onChange(e.target.checked)} // Update form value
          />
          <Typography>Yes</Typography>
        </Stack>
      )}
    />
  </Grid>
)}



{fieldConfig.type === "radio" && (
  <Grid item xs={12} className="dynamic-form-field">
    <FormLabel className="field-label">
      {fieldConfig.label} {fieldConfig.isMandatory && <MandatoryMark />}
    </FormLabel>

    <Controller
      name={fieldConfig.name}
      control={control}
      defaultValue={fieldConfig.defaultValue || ""}
      render={({ field }) => (
        <RadioGroup {...field} row>
          {fieldConfig.options.map((option: { value: string; label: string }) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  </Grid>
)}



{fieldConfig.type === "checkbox" && (
  <Grid item xs={12} className="dynamic-form-field">
    <FormLabel className="field-label">
      {fieldConfig.label} {fieldConfig.isMandatory && <MandatoryMark />}
    </FormLabel>

    <Controller
      name={fieldConfig.name}
      control={control}
      defaultValue={fieldConfig.defaultValue || []} // Ensure defaultValue is an array
      render={({ field }) => (
        <FormGroup>
          {fieldConfig.options.map((option: { value: string; label: string }) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={field.value.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      field.onChange([...field.value, option.value]);
                    } else {
                      field.onChange(field.value.filter((v: string) => v !== option.value));
                    }
                  }}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
      )}
    />
  </Grid>
)}





