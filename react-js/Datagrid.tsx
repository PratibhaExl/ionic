import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, TextField, Select, MenuItem, IconButton, Button, Checkbox } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

interface RowData {
  [key: string]: any;
}

const initialRows: RowData[] = [
  { _id: "65f4a3b2c1d4e5f6789a1234", requestId: 1080, assignTo: "", status: "Open", requestType: "General Inquiry" },
  { _id: "65f4a3b2c1d4e5f6789a1235", requestId: 1079, assignTo: "", status: "Open", requestType: "IFP Commission" },
  { _id: "65f4a3b2c1d4e5f6789a1236", requestId: 1068, assignTo: "", status: "Open", requestType: "General Inquiry" },
];

const DataTable: React.FC = () => {
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [search, setSearch] = useState<{ [key: string]: string }>({});

  const handleDropdownChange = (_id: string, value: string) => {
    setRows(rows.map(row => row._id === _id ? { ...row, assignTo: value, modified: true } : row));
  };

  const handleCheckboxChange = (_id: string) => {
    setSelectedRows(prev => prev.includes(_id) ? prev.filter(i => i !== _id) : [...prev, _id]);
  };

  const handleSave = () => {
    const updatedRows = rows.filter(row => row.modified);
    console.log("Saving data:", updatedRows);
  };

  const handleSearchChange = (field: string, value: string) => {
    setSearch(prev => ({ ...prev, [field]: value }));
  };

  const filteredRows = rows.filter(row => 
    Object.keys(search).every(field => 
      row[field]?.toString().toLowerCase().includes(search[field].toLowerCase())
    )
  );

  const columns: GridColDef[] = [
    {
      field: "select",
      headerName: "Select",
      renderCell: (params) => (
        <Checkbox checked={selectedRows.includes(params.row._id)} onChange={() => handleCheckboxChange(params.row._id)} />
      ),
      width: 80,
    },
    { field: "requestId", headerName: "Request Id", width: 120 },
    {
      field: "assignTo",
      headerName: "Assign To",
      width: 150,
      renderCell: (params) => (
        <Select
          value={params.row.assignTo}
          onChange={(e) => handleDropdownChange(params.row._id, e.target.value)}
          displayEmpty
          fullWidth
          sx={{ backgroundColor: "#fff", borderRadius: 1 }}
        >
          <MenuItem value="">-- Select --</MenuItem>
          <MenuItem value="User A">User A</MenuItem>
          <MenuItem value="User B">User B</MenuItem>
        </Select>
      ),
    },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "requestType",
      headerName: "Request Type",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: () => (
        <>
          <IconButton sx={{ color: "#007bff" }}><EmailIcon /></IconButton>
          <IconButton sx={{ color: "#007bff" }}><PersonIcon /></IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2, margin: "20px 0" }}>
      <DataGrid
        rows={filteredRows.map(({ _id, requestId, assignTo, status, requestType }) => ({ _id, requestId, assignTo, status, requestType }))}
        columns={columns}
        pageSizeOptions={[5, 10]}
        autoHeight
        getRowId={(row) => row._id}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f0f0f0",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            padding: "8px",
          },
          "& .MuiDataGrid-toolbarContainer": {
            display: "flex",
            gap: 2,
            padding: 1,
            backgroundColor: "#f8f9fa",
          },
        }}
        components={{
          Toolbar: () => (
            <Box sx={{ display: "flex", justifyContent: "space-between", padding: 1, backgroundColor: "#f8f9fa" }}>
              <TextField size="small" variant="outlined" placeholder="Search Request Id" onChange={(e) => handleSearchChange("requestId", e.target.value)} />
              <TextField size="small" variant="outlined" placeholder="Search Assign To" onChange={(e) => handleSearchChange("assignTo", e.target.value)} />
              <TextField size="small" variant="outlined" placeholder="Search Status" onChange={(e) => handleSearchChange("status", e.target.value)} />
              <TextField size="small" variant="outlined" placeholder="Search Request Type" onChange={(e) => handleSearchChange("requestType", e.target.value)} />
            </Box>
          ),
        }}
      />
      <Button variant="contained" onClick={handleSave} sx={{ marginTop: 2, backgroundColor: "#28a745" }}>Save</Button>
    </Box>
  );
};

export default DataTable;

datagrid 

import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Grid, TextField, Select, MenuItem, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import { Add, Email, Person } from "@mui/icons-material";

interface RowData {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  isModified?: boolean;
}

const initialRows: RowData[] = [
  { _id: "1", name: "Alice", email: "alice@example.com", role: "Admin", department: "HR" },
  { _id: "2", name: "Bob", email: "bob@example.com", role: "User", department: "IT" },
  { _id: "3", name: "Charlie", email: "charlie@example.com", role: "Manager", department: "Finance" },
];

const roleOptions = ["Admin", "User", "Manager"];
const departmentOptions: Record<string, string> = {
  Admin: "HR",
  User: "IT",
  Manager: "Finance",
};

const DataGridComponent: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>(initialRows);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Handle search input change
  const handleSearchChange = (col: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [col]: value.toLowerCase() }));
  };

  // Handle dropdown selection and mark row as modified
  const handleRoleChange = (id: string, value: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row._id === id
          ? {
              ...row,
              role: value,
              department: departmentOptions[value],
              isModified: true,
            }
          : row
      )
    );

    // Auto-check modified row
    setSelectedRows((prev) => [...new Set([...prev, id])]);
  };

  // Detect modified rows and update only those on Save
  const handleSave = () => {
    setLoading(true);
    const updatedRows = rows.filter((row) => selectedRows.includes(row._id));
    console.log("Updated Rows:", updatedRows);
    setTimeout(() => setLoading(false), 1000);
  };

  // Define columns
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, sortable: true },
    { field: "email", headerName: "Email", flex: 1, sortable: true },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => handleRoleChange(params.row._id, e.target.value)}
          fullWidth
          sx={{
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            "& .MuiSelect-select": { padding: "8px" },
          }}
        >
          {roleOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    { field: "department", headerName: "Department", flex: 1, sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={() => console.log("User clicked")}>
            <Person color="secondary" />
          </IconButton>
          <IconButton onClick={() => console.log("Email clicked")}>
            <Email color="primary" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
        Enhanced Data Grid
      </Typography>

      {/* Search Row */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search Name"
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearchChange("name", e.target.value)}
        />
        <TextField
          size="small"
          placeholder="Search Email"
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearchChange("email", e.target.value)}
        />
        <TextField
          size="small"
          placeholder="Search Role"
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearchChange("role", e.target.value)}
        />
        <TextField
          size="small"
          placeholder="Search Department"
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearchChange("department", e.target.value)}
        />
      </Box>

      <Grid container sx={{ margin: "20px 0" }}>
        <Grid item xs={12} justifyContent="center">
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
              <CircularProgress />
            </Box>
          )}
          <DataGrid
            rows={rows}
            rowHeight={50}
            getRowId={(row) => row._id}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection as string[])}
            pageSizeOptions={[5, 10]}
            sx={{
              height: rows.length === 0 ? "25vh" : "auto",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3f51b5",
                color: "white",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "white",
              },
              "& .MuiDataGrid-cell": {
                padding: "10px",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f1f1f1",
              },
              "& .MuiDataGrid-checkboxInput": {
                "&.Mui-checked": {
                  color: "green",
                },
              },
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataGridComponent;




//---++++
import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Grid, TextField, Select, MenuItem, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import { Add, Email, Person } from "@mui/icons-material";

interface RowData {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

const initialRows: RowData[] = [
  { _id: "1", name: "Alice", email: "alice@example.com", role: "Admin", department: "HR" },
  { _id: "2", name: "Bob", email: "bob@example.com", role: "User", department: "IT" },
  { _id: "3", name: "Charlie", email: "charlie@example.com", role: "Manager", department: "Finance" },
];

const roleOptions = ["Admin", "User", "Manager"];
const departmentOptions: Record<string, string> = {
  Admin: "HR",
  User: "IT",
  Manager: "Finance",
};

const DataGridComponent: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>(initialRows);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Handle row selection
  const handleSelectionChange = (selection: string[]) => {
    setSelectedRows(selection);
  };

  // Handle search input change
  const handleSearchChange = (col: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [col]: value.toLowerCase() }));
  };

  // Handle dropdown selection
  const handleRoleChange = (id: string, value: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row._id === id ? { ...row, role: value, department: departmentOptions[value] } : row
      )
    );
  };

  // Handle text field update
  const handleFieldChange = (id: string, field: keyof RowData, value: string) => {
    setRows((prev) => prev.map((row) => (row._id === id ? { ...row, [field]: value } : row)));
  };

  // Filter rows based on search inputs
  const filteredRows = rows.filter((row) =>
    Object.keys(searchFilters).every(
      (col) => row[col as keyof RowData].toString().toLowerCase().includes(searchFilters[col])
    )
  );

  // Handle save button click
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Updated Rows:", rows.filter((row) => selectedRows.includes(row._id)));
      setLoading(false);
    }, 1000);
  };

  // Define columns
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, sortable: true },
    { field: "email", headerName: "Email", flex: 1, sortable: true },
    { field: "role", headerName: "Role", flex: 1, sortable: true },
    { field: "department", headerName: "Department", flex: 1, sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={() => console.log("User icon clicked")}>
            <Person color="secondary" />
          </IconButton>
          <IconButton onClick={() => console.log("Plus icon clicked")}>
            <Add color="success" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
        Data Grid with Search & Actions
      </Typography>

      {/* Search Row */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search Name"
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearchChange("name", e.target.value)}
        />
        <TextField
          size="small"
          placeholder="Search Email"
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearchChange("email", e.target.value)}
        />
        <TextField
          size="small"
          placeholder="Search Role"
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearchChange("role", e.target.value)}
        />
        <TextField
          size="small"
          placeholder="Search Department"
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearchChange("department", e.target.value)}
        />
      </Box>

      <Grid container sx={{ margin: "20px 0" }}>
        <Grid item xs={12} justifyContent="center">
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
              <CircularProgress />
            </Box>
          )}
          <DataGrid
            rows={filteredRows}
            rowHeight={50}
            getRowId={(row) => row._id}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection as string[])}
            pageSizeOptions={[5, 10]}
            sx={{
              height: rows.length === 0 ? "25vh" : "auto",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3f51b5",
                color: "white",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "white",
              },
              "& .MuiDataGrid-cell": {
                padding: "10px",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f1f1f1",
              },
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataGridComponent;

        


---2---


import React, { useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Grid, TextField, Select, MenuItem, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import { Add, Email, Person } from "@mui/icons-material";

interface RowData {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

const initialRows: RowData[] = [
  { _id: "1", name: "Alice", email: "alice@example.com", role: "Admin", department: "HR" },
  { _id: "2", name: "Bob", email: "bob@example.com", role: "User", department: "IT" },
  { _id: "3", name: "Charlie", email: "charlie@example.com", role: "Manager", department: "Finance" },
];

const roleOptions = ["Admin", "User", "Manager"];
const departmentOptions: Record<string, string> = {
  Admin: "HR",
  User: "IT",
  Manager: "Finance",
};

const DataGridComponent: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>(initialRows);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Handle row selection (Checkbox should be the only clickable area)
  const handleSelectionChange = (selection: string[]) => {
    setSelectedRows(selection);
  };

  // Handle search input change
  const handleSearchChange = (col: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [col]: value.toLowerCase() }));
  };

  // Handle dropdown selection (Updates only one specific row)
  const handleRoleChange = (id: string, value: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row._id === id ? { ...row, role: value, department: departmentOptions[value] } : row
      )
    );
  };

  // Filter rows based on search inputs
  const filteredRows = rows.filter((row) =>
    Object.keys(searchFilters).every(
      (col) => row[col as keyof RowData].toString().toLowerCase().includes(searchFilters[col])
    )
  );

  // Handle save button click
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Updated Rows:", rows.filter((row) => selectedRows.includes(row._id)));
      setLoading(false);
    }, 1000);
  };

  // Define columns with search inputs below headers
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: true,
      renderHeader: () => <Typography fontWeight="bold">Name</Typography>,
      renderCell: (params: GridRenderCellParams) => (
        <TextField
          size="small"
          placeholder="Search Name"
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearchChange("name", e.target.value)}
        />
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      sortable: true,
      renderHeader: () => <Typography fontWeight="bold">Email</Typography>,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search Email"
            variant="outlined"
            fullWidth
            onChange={(e) => handleSearchChange("email", e.target.value)}
          />
          <IconButton onClick={() => console.log("Email clicked", params.value)}>
            <Email color="primary" />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      sortable: true,
      renderHeader: () => <Typography fontWeight="bold">Role</Typography>,
      renderCell: (params: GridRenderCellParams) => (
        <Select
          value={params.value}
          onChange={(e) => handleRoleChange(params.row._id, e.target.value as string)}
          size="small"
          fullWidth
        >
          {roleOptions.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      sortable: true,
      renderHeader: () => <Typography fontWeight="bold">Department</Typography>,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderHeader: () => <Typography fontWeight="bold">Actions</Typography>,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={() => console.log("User icon clicked")}>
            <Person color="secondary" />
          </IconButton>
          <IconButton onClick={() => console.log("Plus icon clicked")}>
            <Add color="success" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Grid container sx={{ margin: "20px 0" }}>
        <Grid item xs={12} justifyContent="center">
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
              <CircularProgress />
            </Box>
          )}
          <DataGrid
            rows={filteredRows}
            rowHeight={50}
            getRowId={(row) => row._id}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection as string[])}
            pageSizeOptions={[5, 10]}
            sx={{
              height: rows.length === 0 ? "25vh" : "auto",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3f51b5",
                color: "white",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "white",
              },
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataGridComponent;




//----
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Grid, TextField, Select, MenuItem, Button, CircularProgress, IconButton } from "@mui/material";
import { Add, Email } from "@mui/icons-material";

interface RowData {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

const initialRows: RowData[] = [
  { _id: "1", name: "Alice", email: "alice@example.com", role: "Admin", department: "HR" },
  { _id: "2", name: "Bob", email: "bob@example.com", role: "User", department: "IT" },
  { _id: "3", name: "Charlie", email: "charlie@example.com", role: "Manager", department: "Finance" },
];

const roleOptions = ["Admin", "User", "Manager"];
const departmentOptions: Record<string, string> = {
  Admin: "HR",
  User: "IT",
  Manager: "Finance",
};

const DataGridComponent: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>(initialRows);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Handle row selection
  const handleSelectionChange = (selection: string[]) => {
    setSelectedRows(selection);
  };

  // Handle input search for columns
  const handleSearchChange = (col: string, value: string) => {
    setSearchFilters((prev) => ({ ...prev, [col]: value.toLowerCase() }));
  };

  // Handle dropdown selection and update another column
  const handleRoleChange = (id: string, value: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row._id === id ? { ...row, role: value, department: departmentOptions[value] } : row
      )
    );
  };

  // Filter rows based on search input
  const filteredRows = rows.filter((row) =>
    Object.keys(searchFilters).every(
      (col) => row[col as keyof RowData].toString().toLowerCase().includes(searchFilters[col])
    )
  );

  // Handle save action
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Updated Rows:", rows.filter((row) => selectedRows.includes(row._id)));
      setLoading(false);
    }, 1000);
  };

  // Define columns
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderHeader: () => (
        <TextField size="small" label="Search Name" onChange={(e) => handleSearchChange("name", e.target.value)} />
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderHeader: () => (
        <TextField size="small" label="Search Email" onChange={(e) => handleSearchChange("email", e.target.value)} />
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {params.value}
          <IconButton onClick={() => console.log("Email clicked", params.value)}>
            <Email />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Select value={params.value} onChange={(e) => handleRoleChange(params.row._id, e.target.value as string)} size="small">
          {roleOptions.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    { field: "department", headerName: "Department", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: () => (
        <IconButton onClick={() => console.log("Plus icon clicked")}>
          <Add />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container sx={{ margin: "20px 0" }}>
        <Grid item xs={12} justifyContent="center">
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
              <CircularProgress />
            </Box>
          )}
          <DataGrid
            rows={filteredRows}
            rowHeight={40}
            getRowId={(row) => row._id}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection as string[])}
            pageSizeOptions={[5, 10]}
            sx={{
              height: rows.length === 0 ? "25vh" : "auto",
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataGridComponent;
