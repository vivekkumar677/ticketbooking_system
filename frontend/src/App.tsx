// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme/theme';
import { AppProvider, useAppContext } from './context/AppContext';

import Navbar from './components/Navbar';
import ShowList from './pages/ShowList';
import AdminDashboard from './pages/AdminDashboard';
import CreateShow from './pages/CreateShow';
import BookingPage from './pages/BookingPage';

const AppWrapper = () => {
  const { darkMode } = useAppContext();
  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShowList />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create" element={<CreateShow />} />
          <Route path="/bookings/:id" element={<BookingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppWrapper />
  </AppProvider>
);

export default App;