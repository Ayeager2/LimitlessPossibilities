// utils.js
export const saveSettings = (darkMode, backgroundColor) => {
  const settings = {
    darkMode,
    backgroundColor,
  };
  localStorage.setItem('settings', JSON.stringify(settings));
};

export const resetColors = (setDarkMode, setBackgroundColor) => {
  const defaultSettings = {
    darkMode: false,
    backgroundColor: '#ffffff',
  };
  setDarkMode(defaultSettings.darkMode);
  setBackgroundColor(defaultSettings.backgroundColor);
  document.documentElement.setAttribute('data-theme', 'light');
  document.documentElement.style.setProperty('--background-color', defaultSettings.backgroundColor);
  document.documentElement.style.setProperty('--text-color', '#000000');
  document.documentElement.style.setProperty('--border-color', '#000000');
  document.documentElement.style.setProperty('--column-background-color', '#f0f0f0');
  document.documentElement.style.setProperty('--column-border-color', '#ccc');
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
};

export const clearLocalStorage = (setDarkMode, setBackgroundColor) => {
  localStorage.clear();
  resetColors(setDarkMode, setBackgroundColor);
};