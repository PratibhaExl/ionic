
search and export


import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, TextField, Grid } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 110 },
  { field: 'email', headerName: 'Email', width: 200 },
  // Add other columns as needed
];

const initialRows = [
  { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 30, email: 'jane@example.com' },
  { id: 3, name: 'Jack Johnson', age: 35, email: 'jack@example.com' },
  // Add other rows as needed
];

const MyDataGridComponent = () => {
  const [rows, setRows] = useState(initialRows);
  const [searchText, setSearchText] = useState('');

  const handleExport = () => {
    // Use a CSV export function to export the data
    // This is a simple implementation for demonstration
    const csvContent = [
      ['ID', 'Name', 'Age', 'Email'],
      ...rows.map(row => [row.id, row.name, row.age, row.email])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'export.csv';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  
const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value.toLowerCase();
  setSearchText(value);

  if (value === '') {
    setRows(initialRows);
  } else {
    const filteredRows = initialRows.filter(row => {
      return (
        row.id.toString().toLowerCase().includes(value) ||
        row.age.toString().toLowerCase().includes(value) ||
        row.name.toLowerCase().includes(value) ||
        row.email.toLowerCase().includes(value)
      );
    });
    setRows(filteredRows);
  }
};
  return (
    <Grid container sx={{ margin: '10px' }} spacing={2}>
      <Grid item xs={12} container justifyContent={'center'} spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleExport}>
            Export
          </Button>
        </Grid>
        <Grid item>
          <TextField
            label="Search"
            value={searchText}
            onChange={handleSearch}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          rows={rows}
          rowHeight={40}
          getRowId={(row) => row.id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
             



              // overlay no data found


import React from 'react';
import { GridOverlay } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const CustomNoRowsOverlay = () => {
  return (
    <GridOverlay>
      <Typography variant="h6" color="textSecondary">
        No data found
      </Typography>
    </GridOverlay>
  );
};

export default CustomNoRowsOverlay;


//// uses data grid

import React, { useState, ChangeEvent } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, TextField, Grid } from '@mui/material';
import CustomNoRowsOverlay from './CustomNoRowsOverlay'; // Import the custom overlay

// Define the type for your row data
interface Row {
  id: number;
  name: string;
  age: number;
  email: string;
}

// Define the columns
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 110 },
  { field: 'email', headerName: 'Email', width: 200 },
  // Add other columns as needed
];

// Define the initial rows
const initialRows: Row[] = [
  { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 30, email: 'jane@example.com' },
  { id: 3, name: 'Jack Johnson', age: 35, email: 'jack@example.com' },
  // Add other rows as needed
];

const MyDataGridComponent: React.FC = () => {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [searchText, setSearchText] = useState('');

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Age', 'Email'],
      ...rows.map(row => [row.id, row.name, row.age, row.email])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'export.csv';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    if (value === '') {
      setRows(initialRows);
    } else {
      const filteredRows = initialRows.filter(row => {
        return (
          (row.id && row.id.toString().toLowerCase().includes(value)) ||
          (row.age && row.age.toString().toLowerCase().includes(value)) ||
          (row.name && row.name.toLowerCase().includes(value)) ||
          (row.email && row.email.toLowerCase().includes(value))
        );
      });
      setRows(filteredRows);
    }
  };

  return (
    <Grid container sx={{ margin: '10px' }} spacing={2}>
      <Grid item xs={12} container justifyContent={'center'} spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleExport}>
            Export
          </Button>
        </Grid>
        <Grid item>
          <TextField
            label="Search"
            value={searchText}
            onChange={handleSearch}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          rows={rows}
          rowHeight={40}
          getRowId={(row) => row.id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay, // Add the custom overlay here
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Grid>
    </Grid>
  );
};

export default MyDataGridComponent;
        


        

        

              


