// src/components/Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ticket Booking System
        </Typography>
        <Button color="inherit" component={Link} to="/">Shows</Button>
        <Button color="inherit" component={Link} to="/admin">Admin</Button>
        <Button color='inherit' component={Link} to="/admin/create">Create Show</Button>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;