import React, { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import DrawerMenu from './DrawerMenu'; // Import your DrawerMenu component
import { Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const MainLayout = () => {
  const drawerWidth = 240; // Set the width of your DrawerMenu
  const appBarHeight = 64; // Adjust this height as needed (default for MUI AppBar)
  const isAuthenticated = localStorage.getItem("authenticated"); // Check if user is authenticated

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar Component */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar stays above the Drawer
          height: `${appBarHeight}px`,
        }}
      >
        <Toolbar>
          {/* Menu Icon Button to toggle DrawerMenu */}
          {isAuthenticated && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <h1>App Header</h1>
        </Toolbar>
      </AppBar>

      {/* DrawerMenu Component */}
      {isAuthenticated && (<DrawerMenu appBarHeight={appBarHeight} isDrawerOpen={isDrawerOpen} />)} {/* Pass the appBarHeight as a prop */}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          //p: 3,
          //marginLeft: `${drawerWidth}px`, // Adjust the main content margin to accommodate the DrawerMenu
          marginTop: `${appBarHeight}px`, // Add space equal to the AppBar height
          transition: 'margin-left 0.3s',
        }}
      >
        <Toolbar /> {/* Adds space equal to the AppBar height */}
        <Outlet /> {/* Renders the content of the current route */}
      </Box>
    </Box>
  );
};

export default MainLayout;
