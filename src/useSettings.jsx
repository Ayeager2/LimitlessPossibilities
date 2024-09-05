import { useState, useEffect } from 'react';
import { saveSettings, resetColors, clearLocalStorage } from './utils';

export const useSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    if (savedSettings) {
      setDarkMode(savedSettings.darkMode);
      setBackgroundColor(savedSettings.backgroundColor);
      document.documentElement.setAttribute('data-theme', savedSettings.darkMode ? 'dark' : 'light');
      document.documentElement.style.setProperty('--background-color', savedSettings.backgroundColor);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    saveSettings(newDarkMode, backgroundColor);
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setBackgroundColor(newColor);
    document.documentElement.style.setProperty('--background-color', newColor);
    saveSettings(darkMode, newColor);
  };

  return {
    darkMode,
    backgroundColor,
    toggleDarkMode,
    handleColorChange,
    resetColors: () => resetColors(setDarkMode, setBackgroundColor),
    clearLocalStorage: () => clearLocalStorage(setDarkMode, setBackgroundColor),
  };
};