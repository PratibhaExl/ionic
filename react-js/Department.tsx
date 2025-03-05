//3


const RequestCreate: React.FC = () => {
  const location = useLocation();

  interface RequestData {
    requestType: string;
    callBackNumber: string;
    products: string;
    priority: string;
    email: string;
    contactDate: string;
    contactMethod: string;
    team: string;
    commentsTemplate: string;
    comments: string;
    assignToSelf: string;
    uploadFile: File[];
  }

  const prepopulatedData: RequestData = location.state || {
    requestType: "General Inquiry",
    callBackNumber: "123-456-7890",
    products: "Test Product",
    priority: "High",
    email: "test@example.com",
    contactDate: "2025-03-19",
    contactMethod: "Phone",
    team: "Test Team",
    commentsTemplate: "Default Template",
    comments: "Sample comment",
    assignToSelf: "Yes",
    uploadFile: [],
  };

  const methods = useForm<RequestData>({
    defaultValues: prepopulatedData,
  });

  const { handleSubmit, reset, setValue } = methods;
  const [files, setFiles] = useState<File[]>(prepopulatedData.uploadFile || []);

  useEffect(() => {
    Object.entries(prepopulatedData).forEach(([key, value]) => {
      setValue(key as keyof RequestData, value);
    });
  }, [setValue]);

  const onSubmit = (data: RequestData) => {
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
        <DynamicForm fields={FORM_FIELDS} />

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
            <Button variant="contained" color="primary" type="submit">Save</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={() => reset(prepopulatedData)}>Reset</Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};




///-----2


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DynamicForm from "./DynamicForm";

const FORM_FIELDS = [
  { name: "requestTitle", label: "Request Title", type: "text" },
  { name: "description", label: "Description", type: "textarea", fullRow: true },
  { name: "requestType", label: "Request Type", type: "selectTypeSubType" },
  { name: "priority", label: "Priority", type: "radio", options: ["Low", "Medium", "High"] },
  { name: "dueDate", label: "Due Date", type: "date" },
  { name: "isUrgent", label: "Urgent Request", type: "checkbox" },
  { name: "notifyAgent", label: "Notify Agent", type: "toggle" },
  { name: "attachment", label: "Attachments", type: "file" },
];

const RequestCreate: React.FC = () => {
  const location = useLocation();
  const prepopulatedData = location.state || {};
  const methods = useForm({ defaultValues: prepopulatedData });

  const { handleSubmit, reset, setValue } = methods;
  const [files, setFiles] = useState<File[]>(prepopulatedData.files || []);

  useEffect(() => {
    if (prepopulatedData) {
      Object.entries(prepopulatedData).forEach(([key, value]) => setValue(key, value));
    }
  }, [prepopulatedData, setValue]);

  const onSubmit = (data: any) => {
    console.log("Submitted Data:", { ...data, files });
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
        <DynamicForm fields={FORM_FIELDS} />
        
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
            <Button variant="contained" color="primary" type="submit">Save</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={() => reset()}>Reset</Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default RequestCreate;


const columns: GridColDef[] = [
  { field: "requestTitle", headerName: "Request Title", width: 200 },
  { field: "requestType", headerName: "Request Type", width: 200 },
  { field: "subType", headerName: "Sub Type", width: 200 },
  { field: "priority", headerName: "Priority", width: 150 },
  { field: "dueDate", headerName: "Due Date", width: 150 },
  { field: "isUrgent", headerName: "Urgent", width: 100 },
  { field: "notifyAgent", headerName: "Notify Agent", width: 100 },
  {
    field: "files",
    headerName: "Files",
    width: 250,
    renderCell: (params) =>
      params.value?.length
        ? params.value.map((file: File, index: number) => <div key={index}>{file.name}</div>)
        : "No files",
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <Button variant="contained" onClick={() => handleEdit(params.row)}>Edit</Button>
    ),
  },
];












//////-------------1


import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, RadioGroup, Radio, Button } from "@mui/material";

const requestOptions = [
  { requestType: "General Inquiry", subTypes: ["Billing", "Claims", "Coverage"] },
  { requestType: "IFP Commission", subTypes: ["Renewal", "Payment", "Adjustment"] },
  { requestType: "Policy Issue", subTypes: ["Endorsement", "Cancellation", "Reinstatement"] },
];

interface DynamicFormProps {
  fields: any[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields }) => {
  const { control, register, watch, setValue, getValues } = useFormContext();
  const selectedType = watch("requestType");

  useEffect(() => {
    if (selectedType) {
      const subTypes = requestOptions.find(opt => opt.requestType === selectedType)?.subTypes || [];
      setValue("subType", subTypes.length ? subTypes[0] : ""); // Auto-select first subType
    }
  }, [selectedType, setValue]);

  return (
    <Grid container spacing={2}>
      {fields.map((field, index) => (
        <Grid item xs={field.fullRow ? 12 : 4} key={index}>
          {field.type === "text" && (
            <TextField fullWidth label={field.label} {...register(field.name)} />
          )}

          {field.type === "textarea" && (
            <TextField fullWidth multiline rows={4} label={field.label} {...register(field.name)} />
          )}

          {field.type === "selectTypeSubType" && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Request Type</InputLabel>
                  <Controller
                    name="requestType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select {...field}>
                        {requestOptions.map((option) => (
                          <MenuItem key={option.requestType} value={option.requestType}>
                            {option.requestType}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Sub Type</InputLabel>
                  <Controller
                    name="subType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select {...field}>
                        {(requestOptions.find(opt => opt.requestType === selectedType)?.subTypes || []).map((sub) => (
                          <MenuItem key={sub} value={sub}>
                            {sub}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          )}

          {field.type === "checkbox" && (
            <FormControlLabel control={<Checkbox {...register(field.name)} />} label={field.label} />
          )}

          {field.type === "radio" && (
            <RadioGroup row {...register(field.name)}>
              {field.options.map((opt: string) => (
                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          )}

          {field.type === "file" && (
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden {...register(field.name)} />
            </Button>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default DynamicForm;



import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Grid, IconButton } from "@mui/material";
import DynamicForm from "./DynamicForm";
import DeleteIcon from "@mui/icons-material/Delete";

const FORM_FIELDS = [
  { name: "requestTitle", label: "Request Title", type: "text" },
  { name: "description", label: "Description", type: "textarea", fullRow: true },
  { name: "requestType", label: "Request Type", type: "selectTypeSubType" },
  { name: "priority", label: "Priority", type: "radio", options: ["Low", "Medium", "High"] },
  { name: "attachment", label: "Attachments", type: "file" },
  { name: "agree", label: "I agree to the terms", type: "checkbox" },
];

const RequestCreate: React.FC = () => {
  const location = useLocation();
  const prepopulatedData = location.state || {};
  const methods = useForm({ defaultValues: prepopulatedData });

  const { handleSubmit, reset, setValue, watch } = methods;
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (prepopulatedData) {
      Object.entries(prepopulatedData).forEach(([key, value]) => {
        setValue(key, value);
      });
      setFiles(prepopulatedData.files || []);
    }
  }, [prepopulatedData, setValue]);

  const onSubmit = (data: any) => {
    console.log("Submitted Data:", { ...data, files });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DynamicForm fields={FORM_FIELDS} />
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
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
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={() => reset()}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default RequestCreate;


import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Select, MenuItem, FormControl, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const requestOptions = [
  { requestType: "General Inquiry", subTypes: ["Billing", "Claims", "Coverage"] },
  { requestType: "IFP Commission", subTypes: ["Renewal", "Payment", "Adjustment"] },
  { requestType: "Policy Issue", subTypes: ["Endorsement", "Cancellation", "Reinstatement"] },
];

const initialRows = [
  { id: 1, requestTitle: "Issue A", requestType: "General Inquiry", subType: "Billing", priority: "High" },
  { id: 2, requestTitle: "Issue B", requestType: "IFP Commission", subType: "Payment", priority: "Low" },
];

const RequestListing: React.FC = () => {
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleTypeChange = (id: number, value: string) => {
    setRows(prevRows =>
      prevRows.map(row => 
        row.id === id 
          ? { ...row, requestType: value, subType: requestOptions.find(opt => opt.requestType === value)?.subTypes[0] || "" } 
          : row
      )
    );
  };

  const handleSubTypeChange = (id: number, value: string) => {
    setRows(prevRows =>
      prevRows.map(row => (row.id === id ? { ...row, subType: value } : row))
    );
  };

  const handleSelectionChange = (selection: any) => {
    setSelectedRows(rows.filter(row => selection.includes(row.id)));
  };

  const handleBulkUpdate = () => {
    console.log("Bulk Updated Rows:", selectedRows);
  };

  const handleEdit = (row: any) => {
    navigate(`/request-create`, { state: row }); // Pass data for editing
  };

  const columns: GridColDef[] = [
    { field: "requestTitle", headerName: "Request Title", width: 200 },
    {
      field: "requestType",
      headerName: "Request Type",
      width: 200,
      renderCell: (params) => (
        <FormControl fullWidth>
          <Select value={params.value} onChange={(e) => handleTypeChange(params.row.id, e.target.value)}>
            {requestOptions.map((opt) => (
              <MenuItem key={opt.requestType} value={opt.requestType}>
                {opt.requestType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      field: "subType",
      headerName: "Sub Type",
      width: 200,
      renderCell: (params) => (
        <FormControl fullWidth>
          <Select
            value={params.value}
            onChange={(e) => handleSubTypeChange(params.row.id, e.target.value)}
          >
            {(requestOptions.find(opt => opt.requestType === params.row.requestType)?.subTypes || []).map((sub) => (
              <MenuItem key={sub} value={sub}>
                {sub}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
    { field: "priority", headerName: "Priority", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" onClick={() => handleEdit(params.row)}>Edit</Button>
      ),
    },
  ];

  return (
    <>
      <Button variant="contained" onClick={handleBulkUpdate} sx={{ marginBottom: 2 }}>
        Bulk Update Selected
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
      />
    </>
  );
};

export default RequestListing;








