import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { Save } from '@mui/icons-material';

const DrawerMenu = ({ appBarHeight, isDrawerOpen }) => {

    const navigate = useNavigate(); // Use useNavigate hook for redirection

    const [isDrawerHovered, setDrawerHovered] = useState(false);

    const handleLogout = () => {
        // Remove the authentication status from localStorage
        localStorage.removeItem("authenticated");
        // Redirect to the login page
        navigate("/login");
    };
    return (
        <Drawer
            variant="permanent"
            onMouseEnter={() => setDrawerHovered(true)}
            onMouseLeave={() => setDrawerHovered(false)}
            sx={{
                width: isDrawerOpen ? isDrawerHovered ? 240 : 60 : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isDrawerOpen ? isDrawerHovered ? 240 : 60 : 0,
                    transition: 'width 0.3s',
                    overflowX: 'hidden',
                    //marginTop: `${appBarHeight}px`, // Start the Drawer just below the AppBar
                    height: `calc(100% - ${appBarHeight}px)`, // Adjust the height to fill the space below the AppBar
                },
            }}
        >
            <Toolbar /> {/* Adds space at the top for alignment */}
            <List>
                <ListItem button component={Link} to="/home">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    {isDrawerHovered && <ListItemText primary="Home" />}
                </ListItem>
                <ListItem button component={Link} to="/profile">
                    <ListItemIcon>
                        <ProfileIcon />
                    </ListItemIcon>
                    {isDrawerHovered && <ListItemText primary="Profile" />}
                </ListItem>
                <ListItem button component={Link} to="/manage-loans">
                    <ListItemIcon>
                        <Save />
                    </ListItemIcon>
                    {isDrawerHovered && <ListItemText primary="Manage Loans" />}
                </ListItem>
                {/* Logout Option */}
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    {isDrawerOpen && <ListItemText primary="Logout" />}
                </ListItem>
            </List>
        </Drawer>
    );
};

export default DrawerMenu;
