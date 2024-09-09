
import { createSlice } from '@reduxjs/toolkit';
import { saveSettings, resetColors as resetColorsUtil, clearLocalStorage as clearLocalStorageUtil } from './utils';
const initialState = {
  darkMode: false,
  backgroundColor: '#ffffff',
  showColumn3: false,
  showSettings: false,
  isColumnTwoVisible: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    loadSettings: (state) => {
      const savedSettings = JSON.parse(localStorage.getItem('settings'));
      if (savedSettings) {
        state.darkMode = savedSettings.darkMode;
        state.backgroundColor = savedSettings.backgroundColor;
        document.documentElement.setAttribute('data-theme', savedSettings.darkMode ? 'dark' : 'light');
        document.documentElement.style.setProperty('--background-color', savedSettings.backgroundColor);
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
      saveSettings(state.darkMode, state.backgroundColor);
    },
    changeBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
      document.documentElement.style.setProperty('--background-color', state.backgroundColor);
      saveSettings(state.darkMode, state.backgroundColor);
    },
    resetColors: (state) => {
      resetColorsUtil((darkMode) => state.darkMode = darkMode, (backgroundColor) => state.backgroundColor = backgroundColor);
    },
    clearLocalStorage: (state) => {
      clearLocalStorageUtil((darkMode) => state.darkMode = darkMode, (backgroundColor) => state.backgroundColor = backgroundColor);
    },
    hideColumn3: (state) => {
      state.showColumn3 = false;
      state.showSettings = false;
    },
    toggleSettings: (state) => {
      state.showSettings = !state.showSettings;
      state.showColumn3 = true;
    },
    toggleColumnTwo: (state) => {
      state.isColumnTwoVisible = !state.isColumnTwoVisible;
    },
  },
});

export const { loadSettings, toggleDarkMode, changeBackgroundColor, resetColors, clearLocalStorage, hideColumn3, toggleSettings, toggleColumnTwo } = settingsSlice.actions;
export default settingsSlice.reducer;