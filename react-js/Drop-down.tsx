const [requestTypeData, setRequestTypeData] = useState([
  { requestType: "General Inquiry", subTypes: ["Billing", "Claims", "Coverage"] },
  { requestType: "IFP Commission", subTypes: ["Renewal", "Payment", "Adjustment"] },
  { requestType: "Policy Issue", subTypes: ["Endorsement", "Cancellation", "Reinstatement"] },
]);

const [selectedRequestType, setSelectedRequestType] = useState("");
const [subTypeOptions, setSubTypeOptions] = useState<string[]>([]);
const [selectedSubType, setSelectedSubType] = useState("");

const handleRequestTypeChange = (event: SelectChangeEvent<string>) => {
  const value = event.target.value;
  setSelectedRequestType(value);
  const selectedType = requestTypeData.find((type) => type.requestType === value);
  setSubTypeOptions(selectedType ? selectedType.subTypes : []);
  setSelectedSubType(selectedType?.subTypes[0] || ""); // Auto-select first subType
};

return (
  <>
    {/* Request Type Dropdown */}
    <FormControl fullWidth variant="outlined">
      <InputLabel>Request Type</InputLabel>
      <Select value={selectedRequestType} onChange={handleRequestTypeChange} label="Request Type">
        <MenuItem value="">-- Select --</MenuItem>
        {requestTypeData.map((option) => (
          <MenuItem key={option.requestType} value={option.requestType}>
            {option.requestType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Sub Request Type Dropdown */}
    <FormControl fullWidth variant="outlined" disabled={!subTypeOptions.length}>
      <InputLabel>Sub Request Type</InputLabel>
      <Select
        value={selectedSubType}
        onChange={(e) => setSelectedSubType(e.target.value)}
        label="Sub Request Type"
      >
        {subTypeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </>
);
