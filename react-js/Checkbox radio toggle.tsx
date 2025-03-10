

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





