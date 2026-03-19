// src/context/AppContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchShows } from '../api/api';

interface AppContextProps {
  shows: any[];
  setShows: React.Dispatch<React.SetStateAction<any[]>>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shows, setShows] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    fetchShows().then(res => setShows(res.data)).catch(console.error);
  }, []);

  return (
    <AppContext.Provider value={{ shows, setShows, darkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};