import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ProfilePage = () => {
  // State to manage search, selected item, and grid data
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [gridData, setGridData] = useState([]);

  // Sample items for selection
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  // Sample grid data
  const sampleData = {
    'Item 1': [
      { id: 1, name: 'Data 1A', value: 'Value 1A' },
      { id: 2, name: 'Data 1B', value: 'Value 1B' },
    ],
    'Item 2': [
      { id: 1, name: 'Data 2A', value: 'Value 2A' },
      { id: 2, name: 'Data 2B', value: 'Value 2B' },
    ],
    'Item 3': [
      { id: 1, name: 'Data 3A', value: 'Value 3A' },
      { id: 2, name: 'Data 3B', value: 'Value 3B' },
    ],
  };

  // Handle item selection
  const handleItemSelect = (event) => {
    const selected = event.target.value;
    setSelectedItem(selected);
    setGridData(sampleData[selected] || []); // Update grid data based on selection
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'value', headerName: 'Value', width: 200 },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-evenly',
        alignItems: 'flex-start', // Align items at the top
        padding: 2,
        height: '100vh', // Full viewport height
        boxSizing: 'border-box', // Ensure padding is included in the height
        marginLeft: '60px', // Adjust this to reduce the space between the Drawer and the layout
      }}
    >
      {/* Left Panel: Search and Select */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: '90%', md: '25%' },
          minWidth: '300px',
          padding: 2,
          marginBottom: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Search and Select
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth>
          <InputLabel>Select Item</InputLabel>
          <Select value={selectedItem} onChange={handleItemSelect} label="Select Item">
            {items.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
  
      {/* Right Panel: DataGrid */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: '90%', md: '70%' },
          minWidth: '500px',
          padding: 2,
          height: '70vh',
          overflow: 'auto',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Grid Data
        </Typography>
        {gridData.length > 0 ? (
          <DataGrid
            rows={gridData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            autoHeight={false}
          />
        ) : (
          <Typography variant="body1">Select an item to view the data.</Typography>
        )}
      </Paper>
    </Box>
  );
  
};

export default ProfilePage;
